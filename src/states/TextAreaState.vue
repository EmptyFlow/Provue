<template>
    <div>
        <slot :context="this"></slot>
    </div>
</template>

<script>
export default {
    name: `TextAreaState`,
    props: {
        value: {
            type: String,
            default: () => ``
        },
        modelValue: {
            type: String,
            default: () => ``
        },
        placeholder: {
            type: String,
            default: () => ``
        },
        countLines: {
            type: Number,
            default: () => -1
        },
        lineWidth: {
            type: Number,
            default: () => -1
        },
        maximumCharacters: {
            type: Number,
            default: () => -1
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
            text: false,
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
        type(text) {
            if (this.disable) return;

            this.text = text;

            this.raiseEvents();
            this.validate();
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