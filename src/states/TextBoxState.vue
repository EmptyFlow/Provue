<template>
    <div>
        <slot :context="this"></slot>
    </div>
</template>

<script>
module.exports = {
    name: `TextBoxState`,
    props: {
        value: {
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
            text: false
        }
    },
    created() {
        this.text = this.value;
        this.validate();
    },
    methods: {
        validate() {
            if (!this.validators) return;
            if (this.validateHost) this.validateHost.clear();
            this.isValid = true;

            for (const [key, value] of Object.entries(this.validators)) {
                if (!value.check(this.text)) {
                    this.isValid = false;
                    if (this.validateHost) this.validateHost.add({ rule: key, messages: value.messages });
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
            this.$emit(`input`, this.text);
        }        
    },
    watch: {
        value(newValue) {
            this.text = newValue;
            
            this.raiseEvents();
            this.validate();
        }
    }
};
</script>