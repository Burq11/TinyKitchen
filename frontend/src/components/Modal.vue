<script setup>
import { computed, onMounted, ref } from 'vue'
import { Modal } from 'bootstrap'
import Tag from '@/components/Tag.vue';

///////////////////////////////////////////////
// IDs to be used for the respective DOM elements in the template
///////////////////////////////////////////////

const MODAL_ID = 'modalRoot' // for the modal's root element
const MODAL_BUTTON_X_ID = 'modalButtonX'
const MODAL_INPUT_TITLE_ID = 'modalInputTitle' // for the input where users enter the recipes's title
const MODAL_HELPER_TITLE_ID = 'modalHelperTitle' // for the helper showing the length of entered title
const MODAL_INPUT_INGREDIENTS_ID = 'modalInputIngredients' // for the input where users enter the ingredients of a recipe
const MODAL_INPUT_DESCRIPTION_ID = 'modalInputDescription' // for the description of a recipe
const MODAL_DROPDOWN_TRIGGER_ID = 'modalDropdownTrigger' // for the button that toggles the tag selection dropdown
const MODAL_DROPDOWN_MENU_ID = 'modalDropdownMenu' // for the root element of the tag selection dropdown's menu
const MODAL_CHECKBOX_BASE_ID = 'modalCheckbox' // base string for the checkboxes in the dropdown, concatenate with the respective tag's name
const MODAL_BUTTON_CANCEL = 'modalButtonCancel' // for the modal's cancel button
const MODAL_BUTTON_SUBMIT = 'modalButtonSubmit' // for the modal's submit button

///////////////////////////////////////////////
// Your implementation below
///////////////////////////////////////////////

// declare props
const props = defineProps({
    tags: {
        type: Array,
        required: true
    }
})

// declare emits
const emit = defineEmits([
    'createRecipe',
    'editRecipe'
])

// declare exposed methods
defineExpose({ showModal })

const formRef = ref(null);

// reactive variables that are modified by the UI
const recipeId = ref('')
const recipeTitle = ref('')
const recipeIngredients = ref('')
const recipeDescription = ref('')
const recipeTags = computed(
    () => props.tags.map(r =>
        ref({
            name: r,
            selected: false
        })
    )
)

const mode = ref('create')

// the modal doesn't need to be reactive because we only access it in the script block
let modal = null

/**
 * Instantiates a Bootstrap Modal object and binds it to the corresponding DOM element via modalId.
 */
function createModal() {
    modal = new Modal('#' + MODAL_ID)
}

/**
 * Wrapper for Bootstrap's Modal.show() that is exposed so that external components can toggle the modal.
 * Resets the recipe value before opening the modal so that user can start fresh every time.
 */
function showModal(recipe) {

    if(recipe == null) {
        // reset the recipe values
        recipeId.value = ''
        recipeTitle.value = ''
        recipeIngredients.value = ''
        recipeDescription.value = ''
        recipeTags.value.forEach(r => r.value.selected = false)
        mode.value = 'Create'
    } else {
        // set the recipe values to the values of the recipe to be edited
        recipeId.value = recipe._id
        recipeTitle.value = recipe.title
        recipeIngredients.value = recipe.ingredients
        recipeDescription.value = recipe.description
        recipeTags.value.forEach(r => r.value.selected = recipe.tags.includes(r.value.name))
        mode.value = 'Edit'
    }
    console.log("Modal is in this value", mode.value)
    modal.show()
}

/**
 * Emits a createrecipe event with the current recipe properties and closes the modal.
 */
 function submitModal() {
    ///Access the form element using the ref
    const form = formRef.value;
    if (!form.checkValidity()) {
        form.classList.add('was-validated');
        return;
    }

    const selectedTags = recipeTags.value.filter(r => r.value.selected).map(r => r.value.name)
    const recipeData = {
        title: recipeTitle.value,
        ingredients: recipeIngredients.value,
        description: recipeDescription.value,
        tags: selectedTags
    };
    
    if(mode.value === 'Edit') {
        console.log("Modal is submitted in this value", mode.value)
        emit('editRecipe', recipeId.value, recipeData);
    } else{
        console.log("Modal is submitted in this value", mode.value)
        emit('createRecipe', recipeData, );
    }

    closeModal();
}


/**
 * Wrapper for Bootstrap's Modal.hide().
 */
function closeModal() {
    modal.hide()
}

// /**
//  * Returns the modal's title depending on the current mode.
//  */
//  function getModalTitle() {
//     return mode.value === 'create' ? 'Add Recipe' : 'Edit Recipe';
// }


// call createModal() as soon as the component is mounted
onMounted(createModal)
</script>

<template>
    <div class="modal" :id="MODAL_ID" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">

                <!-- Header of the modal containing the modal's headline -->
                <div class="modal-header">
                    <!-- czy ja chce mieć tytuł? modalu -->
                    <!-- <h5 class="modal-title me-3">{{getModalTitle()}}</h5> -->
                    <button :id="MODAL_BUTTON_X_ID" type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
                </div>

                <!-- Body of the modal containing inputs for the recipe's title, text and tags -->
                <div class="modal-body">
                    <form ref="formRef" @submit.prevent="submitModal" novalidate>
                        <!-- Title -->
                        <div class="mb-3">
                            <label :for="MODAL_INPUT_TITLE_ID" class="form-label">Recipe Title</label>
                            <input :id="MODAL_INPUT_TITLE_ID" v-model="recipeTitle" type="text" class="form-control" placeholder="Grandma's Pie" :aria-describedby="MODAL_HELPER_TITLE_ID" maxlength="50" required>
                            <div :id="MODAL_HELPER_TITLE_ID" class="form-text">{{ recipeTitle.length }}/50 characters</div>
                        </div>
                        <!-- Ingredients -->
                        <div class="mb-3">
                            <label :for="MODAL_INPUT_INGREDIENTS_ID" class="form-label" >Ingredients</label>
                            <textarea :id="MODAL_INPUT_INGREDIENTS_ID" v-model="recipeIngredients" class="form-control" placeholder="Apples, 500g flour..." rows="3" required></textarea>
                        </div>
                        <!-- Description -->
                        <div class="mb-3">
                            <label :for="MODAL_INPUT_DESCRIPTION_ID" class="form-label">Description</label>
                            <textarea :id="MODAL_INPUT_DESCRIPTION_ID" v-model="recipeDescription" class="form-control" placeholder="Measure with your heart" rows="4" required></textarea>
                        </div>
                        <!-- Tags -->
                        <div class="mb-0">
                            <div class="dropdown">
                                <a :id="MODAL_DROPDOWN_TRIGGER_ID" class="btn btn-outline-primary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
                                    Select tags
                                </a>
                                <ul :id="MODAL_DROPDOWN_MENU_ID" class="dropdown-menu">
                                    <li v-for="(tag, index) in recipeTags">
                                        <div class="dropdown-item-text">
                                            <div class="form-check">
                                                <input :id="MODAL_CHECKBOX_BASE_ID + tag.value.name" type="checkbox" class="form-check-input" v-model="recipeTags[index].value.selected">
                                                <label class="form-check-label" :for="tag"><Tag :tag-value="tag.value.name" /></label>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>

                <!-- Footer of the modal containing the submit and close buttons -->
                <div class="modal-footer">
                    <button :id="MODAL_BUTTON_CANCEL" type="button" class="btn btn-secondary" @click="closeModal">Cancel</button>
                    <button :id="MODAL_BUTTON_SUBMIT" type="submit" class="btn btn-primary" @click="submitModal">{{mode}}</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    /* no custom stylesheet necessary thanks to Bootstrap */
</style>