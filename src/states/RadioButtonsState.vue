<template>
    <div>
        <slot :context="this"></slot>
    </div>
</template>

<script>
export default {
    name: `RadioButtonsState`,
    props: {
        group: {
            type: String,
            required: true
        },
        value: {
            type: [String, Number, Object],
            default: () => null
        },
        modelValue: {
            type: [String, Number, Object],
            default: () => null
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
            radioValue: false,
            isValid: false,
            isVue3: vueVersion === `3`
        }
    },
    created() {
        this.radioValue = this.isVue3 ? this.modelValue : this.value;
        this.validate();
    },
    methods: {
        validate() {
            this.isValid = true;
            if (!this.validators) return;
            if (this.validateHost) this.validateHost.clear(this);

            for (const [key, value] of Object.entries(this.validators)) {
                if (!value.check(this.radioValue)) {
                    this.isValid = false;
                    if (this.validateHost) this.validateHost.add(this, { rule: key, messages: value.messages });
                }
            }
        },
        select(value) {
            if (this.disable) return;

            this.radioValue = value;

            this.raiseEvents();
            this.validate();
        },
        raiseEvents() {
            this.$emit(`changed`, this.radioValue); // added for separate v-model events and external events
            this.$emit(this.isVue3 ? `update:modelValue` : `input`, this.radioValue);
        },
        setRadioState(newValue) {
            this.checked = newValue;
            
            this.raiseEvents();
            this.validate();
        }        
    },
    watch: {
        value(newValue) {
            this.setRadioState(newValue);
        },
        modelValue(newValue) {
            this.setRadioState(newValue);
        }
    }
};
</script>