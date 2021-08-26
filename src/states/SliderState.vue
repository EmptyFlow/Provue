<template>
    <div>
        <slot :context="this"></slot>
    </div>
</template>

<script>
export default {
    name: `SliderState`,
    props: {
        value: {
            type: [Number, Array],
            default: () => 0
        },
        modelValue: {
            type: [Number, Array],
            default: () => 0
        },
        isRange: {
            type: Boolean,
            default: () => false
        },
        minimum: {
            type: Number,
            default: () => 0
        },
        maximum: {
            type: Number,
            default: () => 100
        },
        step: {
            type: Number,
            default: () => 1
        },
        disable: {
            type: Boolean,
            default: () => false
        },
        validators: {
            type: Object,
            default: () => {}
        },
        validateHost: {
            type: Object
        }
    },
    data() {
        return {
            position: 0,
            isValid: false,
            isVue3: vueVersion === `3`
        }
    },
    created() {
        this.position = this.isVue3 ? this.modelValue : this.value;
        this.validate();
    },
    methods: {
        validate() {
            this.isValid = true;
            if (!this.validators) return;
            if (this.validateHost) this.validateHost.clear(this);

            for (const [key, value] of Object.entries(this.validators)) {
                if (!value.check(this.position)) {
                    this.isValid = false;
                    if (this.validateHost) this.validateHost.add(this, { rule: key, messages: value.messages });
                }
            }
        },
        changePosition(position) {
            if (this.disable) return;
            
            let preparedPosition = position ? parseFloat(position) : 0;
            if (preparedPosition < this.minimum) preparedPosition = this.minimum;
            if (preparedPosition > this.maximum) preparedPosition = this.maximum;
            this.position = preparedPosition;

            this.raiseEvents();
            this.validate();
        },
        raiseEvents() {
            this.$emit(`changed`, this.position); // added for separate v-model events and external events
            this.$emit(this.isVue3 ? `update:modelValue` : `input`, this.position);
        },
        setSliderValue(newValue) {
            if (this.isRange && Array.isArray(newValue) && newValue.length !== 2) {
                console.warn(`SliderState: v-model value is array but don't have two values`);
                return;
            }
            this.position = newValue;
            
            this.raiseEvents();
            this.validate();
        }
    },
    watch: {
        value(newValue) {
            this.setSliderValue(newValue);
        },
        modelValue(newValue) {
            this.setSliderValue(newValue);
        }
    }
};
</script>