<template>
    <div
        ref="maincontainer"
        class="mdc-slider"
        @mouseleave="isMoving = false">
        <input
            class="mdc-slider__input"
            :value="context.position"
            :min="context.minimum"
            :max="context.maximum"
            :step="context.step"
            @input="context.changePosition($event.target.value)"
            :disabled="context.disable"
            type="range">
        <div
            ref="track"
            class="mdc-slider__track"
            @click="clickOnTrack($event)">
            <div class="mdc-slider__track--inactive"></div>
            <div class="mdc-slider__track--active">
            <div class="mdc-slider__track--active_fill"></div>
            </div>
        </div>
        <div
            v-if="initial"
            class="mdc-slider__thumb"
            :style="{transform: 'translateX(' + getPosition(context.position) + '%)'}"
            @mousedown="isMoving = true"
            @mouseup="isMoving = false"
            @mousemove="moveMouse($event)">
            <div
                class="mdc-slider__thumb-knob">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: `MaterialSliderView`,
    props: {
        context: {
            type: Object,
            required: true
        } 
    },
    data() {
        return {
            isMoving: false,
            initial: false
        }
    },
    mounted() {
        this.initial = true;
    },
    methods: {
        getPosition(position) {
            if (!this.$refs.maincontainer) return `0`;

            const rect = this.$refs.maincontainer.getBoundingClientRect();
            return (rect.width / 48) * position;
        },
        moveMouse($event) {
            if (!this.isMoving) return;

            this.trackPosition(this.$refs.track, $event);
        },  
        clickOnTrack($event) {
            this.trackPosition($event.target, $event);
        },
        trackPosition(element, $event) {
            const rect = element.getBoundingClientRect();
            const offset = $event.clientX - rect.left;
            const percent = offset / rect.width * 100;
            this.context.changePosition(parseInt(percent));
        }
    }
};
</script>