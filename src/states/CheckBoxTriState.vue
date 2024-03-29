<template>
    <div>
        <slot :context="this"></slot>
    </div>
</template>

<script>
export default {
    name: `CheckBoxTriState`,
    props: {
        title: {
            type: String,
            default: () => ``
        },
        value: {
            type: [Object, Boolean],
            default: () => null
        },
        modelValue: {
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
            checked: null,
            isValid: false,
            isVue3: vueVersion === `3`
        }
    },
    created() {
        this.checked = this.isVue3 ? this.modelValue : this.value;
        this.validate();
    },
    methods: {
        validate() {
            this.isValid = true;
            if (!this.validators) return;
            if (this.validateHost) this.validateHost.clear(this);

            for (const [key, value] of Object.entries(this.validators)) {
                if (!value.check(this.checked)) {
                    this.isValid = false;
                    if (this.validateHost) this.validateHost.add(this, { rule: key, messages: value.messages });
                }
            }
        },
        toggle() {
            if (this.disable) return;

            switch (this.checked) {
                case true:
                    this.checked = null;
                    break;
                case false:
                    this.checked = true;
                    break;
                default:
                    this.checked = false;
                    break;
            }

            this.raiseEvents();
            this.validate();
        },
        raiseEvents() {
            this.$emit(`checked`, this.checked); // added for separate v-model events and external events
            this.$emit(this.isVue3 ? `update:modelValue` : `input`, this.checked);
        },
        setChecked(value) {
            this.checked = value;
            
            this.raiseEvents();
            this.validate();
        }
    },
    watch: {
        value(newValue) {
            this.setChecked(newValue);
        },
        modelValue(newValue) {
            this.setChecked(newValue);
        }
    }
};
</script>