<script setup>
	import RecipeCard from "@/components/RecipeCard.vue";

// 	// Static array of recipes for testing
// 	const staticRecipes = ref([
//   {
//     id: "r1",
//     title: "Pierogi",
//     ingredients: "Flour, water, eggs, meat, onion, spices",
//     description: "Knead the dough, prepare the filling, form the pierogi, boil.",
//     tags: ["Dinner"]
//   },
//   add more recipes here...

	const props = defineProps({
		recipes: {
    		type: Array,
    		required: true
  		}
	});

	defineEmits([
		'trigger-edit',
		'delete-recipe'
	])
</script>

<template>
	<div class="container mt-3">
	  <div class="row row-cols-1 row-cols-md-3 g-4">
		<div v-for="recipe in recipes " :key="recipe._id" class="col d-flex align-items-stretch">
		  <RecipeCard 
		  	:recipe="recipe"
		  	@trigger-edit="(...args) => $emit('trigger-edit', ...args)"
		 	@delete-recipe="(...args) => $emit('delete-recipe', ...args)"
		class="w-100" />
		</div>
	  </div>
	</div>
  </template>
  
  <style scoped>
  .card {
	display: flex;
	flex-direction: column;
  }
  
  .card-body {
	flex-grow: 1;
  }
  </style>
