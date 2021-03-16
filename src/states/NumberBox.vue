<template>
    <div>
        <slot :context="this"></slot>
    </div>
</template>

<script>
module.exports = {
    name: `NumberBox`,
    props: {
        title: {
            type: String,
            default: () => ``
        },
        value: {
            type: Number,
            default: () => 0
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
            backValueChanges: null
        }
    },
    created() {
        this.number = this.value;
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

            this.number = value;

            this.raiseEvents();
            this.validate();
        },
        raiseEvents() {
            this.$emit(`typed`, this.number); // added for separate v-model events and external events
            this.$emit(`input`, this.number);
        }        
    },
    watch: {
        value(newValue) {
            this.number = newValue;

            if (this.backValueChanges) this.backValueChanges(newValue);
           
            this.raiseEvents();
            this.validate();
        }
    }
};
</script>