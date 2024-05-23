<script setup>
import {onMounted, ref} from 'vue';
	import Tag from './Tag.vue'

	const props = defineProps({
		recipe: {
    		type: Object,
    		required: true
  		}
	});

	const emit = defineEmits([
		'trigger-edit',
  		'delete-recipe'
	])

	let collapsed = ref('collapsed')

	function toggleCollapsed() {
		if(collapsed.value.length === 0) {
			collapsed.value = 'collapsed'
		} else {
			collapsed.value = ''
		}
	}

	const submenuRef = ref(null);
	const isLeft = ref(false);

	const checkSubmenuPosition = () => {
		if (submenuRef.value) {
			const submenu = submenuRef.value.getBoundingClientRect()

			if(!submenuRef.value.classList.contains('dropdown-submenu-left')) {
				// Check if the right edge of the submenu goes beyond the window's width
				if (submenu.right > window.innerWidth) {
					submenuRef.value.classList.add('dropdown-submenu-left')
					submenuRef.value.classList.remove('dropdown-submenu-right')
				} else {
					submenuRef.value.classList.remove('dropdown-submenu-left')
					submenuRef.value.classList.add('dropdown-submenu-right')
				}
			}
		}
	}

	function triggerEdit() {
 	 	emit('trigger-edit', props.recipe._id);
	}

	function deleteRecipe() {
  		emit('delete-recipe', props.recipe._id);
	}

	onMounted(() => {
		// Check position on mount in case the default position needs adjustment
		checkSubmenuPosition()
	})
</script>

<template>
	<div class="card bg-light mt-3">
    	<div class="card-header d-flex justify-content-between align-items-center">
      	 <h5 class="mb-0">{{ recipe.title }}</h5>
      		<div class="dropdown">
				<button class="btn btn-link p-0 m-0" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
					<img src="../assets/hamburger.svg" alt="Edit task" height="24" width="24">
				</button>
				<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
					<li><a class="dropdown-item" href="#" @click="triggerEdit">Edit</a></li>
					<li><a class="dropdown-item" href="#" @click="deleteRecipe">Delete</a></li>
				</ul>
      		</div>
    	</div>
    <div class="card-body">
	  	<p><strong>Ingredients:</strong> {{ recipe.ingredients }}</p>
      	<p><strong>Description:</strong> {{ recipe.description }}</p>
    </div>
    <div class="card-footer">
      <Tag v-for="tag in recipe.tags" :key="tag" :tag-value="tag" />
    </div>
  </div>
</template>

<style scoped>
	.collapsed {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		cursor: pointer;
	}

	.dropdown-submenu {
		position: relative;
	}

	.dropdown-submenu-right {
		left: 100%;
		right: auto;
		top: 0;
	}

	.dropdown-submenu-left {
		left: auto;
		right: 100%;
		top: 0;
	}

	.dropdown-menu > li:hover > * {
		display: block;
	}
</style>
