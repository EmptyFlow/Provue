<template>
    <div>
        <slot :context="this"></slot>
    </div>
</template>

<script>
module.exports = {
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
        },
        isValid: {
            type: Boolean,
            default: () => true
        }
    },
    data() {
        return {
            checked: false
        }
    },
    created() {
        this.checked = this.value;
        this.validate();
    },
    methods: {
        validate() {
            if (!this.validators) return;
            if (this.validateHost) this.validateHost.clear();
            this.isValid = true;

            for (const [key, value] of Object.entries(this.validators)) {
                if (!value.check(this.checked)) {
                    this.isValid = false;
                    if (this.validateHost) this.validateHost.add({ rule: key, messages: value.messages });
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
            this.$emit(`input`, this.checked);
        }        
    },
    watch: {
        value(newValue) {
            this.checked = newValue;
            
            this.raiseEvents();
            this.validate();
        }
    }
};
</script>