<template>
    <div>
        <slider-state
            v-model="sliderPosition">
            <template #default="{ context }">
                <bootstrap-slider-view :context="context" />
            </template>
        </slider-state>
        <span>Slider value: {{ sliderPosition }}</span>
    </div>
</template>

<script>
export default async function() {
    await globalComponent(`../../states/SliderState.vue`);
    await globalComponent(`../../views/bootstrap/BootstrapSliderView.vue`);

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