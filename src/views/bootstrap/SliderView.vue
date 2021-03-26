<template>
    <input
        class="form-range"
        :value="context.position"
        :min="context.minimum"
        :max="context.maximum"
        :step="context.step"
        @input="context.changePosition($event.target.value)"
        :disabled="context.disable"
        type="range"
    >    
</template>

<script>
export default {
    name: `SliderView`,
    props: {
        context: {
            type: Object,
            required: true
        }
    }
};
</script>