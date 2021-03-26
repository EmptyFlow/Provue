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
            isValid: false
        }
    },
    created() {
        this.radioValue = this.value;
        this.validate();
    },
    methods: {
        validate() {
            if (!this.validators) return;
            if (this.validateHost) this.validateHost.clear(this);
            this.isValid = true;

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
            this.$emit(`input`, this.radioValue);
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