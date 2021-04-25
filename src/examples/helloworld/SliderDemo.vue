<template>
    <div class="slider-container">
        <slider-state
            v-if="theme === `bootstrap`"
            v-model="sliderPosition">
            <template #default="{ context }">
                <bootstrap-slider-view :context="context" />
            </template>
        </slider-state>
        <span
            v-if="theme === `bootstrap`">
            Slider value: {{ sliderPosition }}
        </span>
        <slider-state
            v-if="theme === `material`"
            v-model="materialSliderPosition">
            <template #default="{ context }">
                <material-slider-view :context="context" />
            </template>
        </slider-state>
        <span
            v-if="theme === `material`">
            Slider value: {{ materialSliderPosition }}
        </span>
    </div>
</template>

<script>
export default async function() {
    await globalComponents(
        `../../states/SliderState.vue`,
        `../../views/bootstrap/BootstrapSliderView.vue`,
        `../../views/material/MaterialSliderView.vue`
    );

    return {
        name: `SliderDemo`,
        props: {
            theme: {
                type: String,
                default: () => `bootstrap`
            }
        },  
        data() {
            return {
                sliderPosition: 100,
                materialSliderPosition: 0
            }
        }

    }
}
</script>

<style>
.slider-container {
    width: 300px;
}
</style>