<template>
    <div>
        <slot :context="this"></slot>
    </div>
</template>

<script>
export default {
    name: `CheckBoxState`,
    props: {
        title: {
            type: String,
            default: () => ``
        },
        value: {
            type: Boolean,
            default: () => false
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
            checked: false,
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

            this.checked = !this.checked;

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