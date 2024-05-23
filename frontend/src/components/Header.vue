<script setup>

///////////////////////////////////////////////
// IDs to be used for the respective DOM elements in the template
///////////////////////////////////////////////

const BUTTON_TOGGLE_MODAL_ID = 'buttonToggleModal' // for the button that opens the modal

///////////////////////////////////////////////
// Your implementation below
///////////////////////////////////////////////

defineProps({
    title: {
        type: String,
        required: true
    }
});
</script>

<!-- bg-light  bylo wczesniej -->
<template>
    <nav class="navbar">
        <div class="container-fluid justify-content-between">
            <!-- Logo and title of the Kanban board -->
            <span class="navbar-brand mb-0 h1">
                <img src="../assets/logo.svg" alt="Logo" width="280" height="" class="d-inline-block align-text-top">
               <!-- <h4>{{ title }}</h4>  -->
            </span>

            <!-- Button to toggle the modal for task creation -->
            <button :id="BUTTON_TOGGLE_MODAL_ID" class="d-flex btn btn-outline-secondary btn-lg" @click="$emit('showModal')">ADD RECIPE</button>
        </div>
    </nav>
</template>

<style scoped>
    button {
        margin-right: 100px;
    }
    /* Add your custom styles here */
</style>