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
            type: Object,
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
            checked: null,
            isValid: false
        }
    },
    created() {
        this.checked = this.value;
        this.validate();
    },
    methods: {
        validate() {
            if (!this.validators) return;
            if (this.validateHost) this.validateHost.clear(this);
            this.isValid = true;

            for (const [key, value] of Object.entries(this.validators)) {
                if (!value.check(this.checked)) {
                    this.isValid = false;
                    if (this.validateHost) this.validateHost.add(this, { rule: key, messages: value.messages });
                }
            }
        },
        click($event) {
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