<template>
    <div>
        <slot :context="this"></slot>
    </div>
</template>

<script>
export default {
    name: `NumberBoxState`,
    props: {
        title: {
            type: String,
            default: () => ``
        },
        value: {
            type: Number,
            default: () => 0
        },
        modelValue: {
            type: Number,
            default: () => false
        },
        disable: {
            type: Boolean,
            default: () => false
        },
        placeholder: {
            type: String,
            default: () => ``
        },
        readOnly: {
            type: Boolean,
            default: () => false
        },
        onlyIntegers: {
            type: Boolean,
            default: () => false
        },
        onlyPositive: {
            type: Boolean,
            default: () => false
        },
        step: {
            type: Number,
            default: () => null
        },
        minimum: {
            type: Number,
            default: () => null
        },
        maximum: {
            type: Number,
            default: () => null
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
            number: false,
            isValid: false,
            backValueChanges: null,
            isVue3: vueVersion === `3`
        }
    },
    created() {
        this.number = this.isVue3 ? this.modelValue : this.value;
        this.validate();
    },
    methods: {
        validate() {
            if (!this.validators) return;
            if (this.validateHost) this.validateHost.clear(this);
            this.isValid = true;

            for (const [key, value] of Object.entries(this.validators)) {
                if (!value.check(this.number)) {
                    this.isValid = false;
                    if (this.validateHost) this.validateHost.add(this, { rule: key, messages: value.messages });
                }
            }
        },
        type(text) {
            if (this.disable) return;

            let value = 0;
            if (text) {
                if (this.onlyPositive) text = text.replace(`-`, ``);
    
                value = this.onlyIntegers ? parseInt(text) : parseFloat(text);
                if (isNaN(value)) value = 0;
            } else {
                value = null;
            }

            if (value > this.maximum) value = this.maximum;
            if (value < this.minimum) value = this.minimum;

            this.number = value;

            this.raiseEvents();
            this.validate();
        },
        raiseEvents() {
            this.$emit(`typed`, this.number); // added for separate v-model events and external events
            this.$emit(this.isVue3 ? `update:modelValue` : `input`, this.number);
        },
        setNumber(newValue) {
            this.number = newValue;

            if (this.backValueChanges) this.backValueChanges(newValue);
           
            this.raiseEvents();
            this.validate();
        }        
    },
    watch: {
        value(newValue) {
            this.setNumber(newValue);
        },
        modelValue(newValue) {
            this.setNumber(newValue);
        }
    }
};
</script>