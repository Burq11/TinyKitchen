<script setup>
import { ref, onMounted } from 'vue'
import Board from './components/Board.vue'
import Header from '@/components/Header.vue'
import Modal from '@/components/Modal.vue'

const tags = ref([])
const recipes = ref([])
const modalRef = ref(null)

const title = 'Tiny Kitchen Recipes'
const server = ''

/**
 * Calls the showModal() function in Modal.vue, assuming the component is registered and referenced.
 */
function showModal(recipe = null) {
    if (modalRef.value) {
        modalRef.value.showModal(recipe)
    }
}

/**
 * Triggers the Modal in editing mode.
 * @param recipeId
 */
function triggerEdit(recipeId) {
    const recipe = recipes.value.find(r => r._id === recipeId)
    showModal(recipe)
    
}

///////////////////////
// API calls below
///////////////////////

async function loadTags() {
    try {
        const response = await fetch(`${server}/api/tags`)
        if (!response.ok) throw new Error('Network response was not ok')
        const data = await response.json()
        tags.value = data
    } catch (error) {
        console.error('Error fetching tags:', error)
    }
}

async function loadRecipes() {
    try {
        const response = await fetch(`${server}/api/recipes`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        recipes.value = data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
    }
}

async function createRecipe(recipeData) {
    try {
        const response = await fetch(`${server}/api/recipes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recipeData)
        });
        if (!response.ok) throw new Error('Network response was not ok');
        await loadRecipes();
    } catch (error) {
        console.error('Error creating recipe:', error);
    }
}

async function editRecipe(recipeId, recipeData) {
    try {
        const response = await fetch(`${server}/api/recipes/${recipeId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(recipeData)
        });
        if (!response.ok) throw new Error('Network response was not ok');
        await loadRecipes();
    } catch (error) {
        console.error('Error editing recipe:', error);
    }
}

async function deleteRecipe(recipeId) {
    try {
        console.log('Attempting to delete recipe with ID: ${recipeId}');
        const response = await fetch(`${server}/api/recipes/${recipeId}`, 
        { method: 'DELETE' });
        if (!response.ok) throw new Error('Network response was not ok');
        await loadRecipes();
    } catch (error) {
        console.error('Error deleting recipe:', error);
    }
}

onMounted(() => {
    loadTags()
    loadRecipes();
});
</script>

<template>
    <Header :title="title" @show-modal="showModal" />
    <Board :recipes="recipes" @trigger-edit="triggerEdit" @delete-recipe="deleteRecipe"/>
    <Modal :tags="tags" ref="modalRef" @create-recipe="createRecipe" @edit-recipe="editRecipe"/>
</template>