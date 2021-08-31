<template>
    <div>
        <slot :context="this"></slot>
    </div>
</template>

<script>
export default {
    name: `TextBoxState`,
    props: {
        value: {
            type: String,
            default: () => ``
        },
        modelValue: {
            type: String,
            default: () => ``
        },
        type: {
            type: String,
            default: () => `text`
        },
        placeholder: {
            type: String,
            default: () => ``
        },
        readOnly: {
            type: Boolean,
            default: () => false
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
            text: ``,
            isValid: false,
            isVue3: vueVersion === `3`
        }
    },
    created() {
        this.text = this.isVue3 ? this.modelValue : this.value;
        this.validate();
    },
    methods: {
        validate() {
            this.isValid = true;
            if (!this.validators) return;
            if (this.validateHost) this.validateHost.clear(this);

            for (const [key, value] of Object.entries(this.validators)) {
                if (!value.check(this.text)) {
                    this.isValid = false;
                    if (this.validateHost) this.validateHost.add(this, { rule: key, messages: value.messages });
                }
            }
        },
        typeText(text) {
            if (this.disable) return;

            this.setValue(text);
        },
        raiseEvents() {
            this.$emit(`typed`, this.text); // added for separate v-model events and external events
            this.$emit(this.isVue3 ? `update:modelValue` : `input`, this.text);
        },
        setValue(newValue) { 
            this.text = newValue;
            
            this.raiseEvents();
            this.validate();
        }
    },
    watch: {
        value(newValue) {
            this.setValue(newValue);
        },
        modelValue(newValue) {
            this.setValue(newValue);
        }
    }
};
</script>