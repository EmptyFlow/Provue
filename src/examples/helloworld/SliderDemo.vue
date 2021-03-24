<template>
    <div>
        <slider-state
            v-model="sliderPosition">
            <template #default="{ context }">
                <slider-view :context="context" />
            </template>
        </slider-state>
        <span>Slider value: {{ sliderPosition }}</span>
    </div>
</template>

<script>
module.exports = async function() {
    await loadComponentGlobally(`../../states/SliderState.vue`);
    await loadComponentGlobally(`../../views/bootstrap/SliderView.vue`);

    return {
        name: `SliderDemo`,
        data() {
            return {
                sliderPosition: 100
            }
        }
    }
}
</script>