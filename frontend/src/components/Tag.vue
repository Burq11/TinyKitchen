<script setup>
    defineProps({
        tagValue: {
            type: String,
            required: true
        }
    });
    /** Jeżeli chce miec kolorowe tagi to odkomentuj poniższy kod */
    function getBadgeColor(tag) {
        switch (tag) {
            case 'Vegan':
            case 'Vegetarian':
                return 'text-bg-info';
            case 'Desert':
                return 'text-bg-primary';
            case 'Dinner':
            case 'Breakfast':
                return 'text-bg-secondary';
            case 'Low carb':
                return 'text-bg-success';
            case 'Fish':
                return 'text-bg-warning';
            case 'Meat':
                return 'text-bg-danger';
            default:
                return 'text-bg-light';
        }
    }

</script>

<template>
    <div :class="['badge me-2', getBadgeColor(tagValue)]">
        {{ tagValue }}
    </div>
</template>