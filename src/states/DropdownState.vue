<template>
    <div>
        <slot :context="this"></slot>
    </div>
</template>

<script>
module.exports = {
    name: `DropdownState`,
    props: {
        value:{
            type: [Number, String, Object, Array]
        },
        disable: {
            type: Boolean,
            default: () => false
        },
        options: {
            type: Array,
            default: () => []
        },
        multiply: {
            type: Boolean,
            default: () => false
        },
        autoClose: {
            type: Boolean,
            default: () => true
        },
        validators: {
            type: Object,
            default: () => {}
        },
        validateHost: {
            type: Object
        }
    },
    data () {
        return {
            open: false,
            isValid: false,
            selectedOptions: null
        }  
    },
    created() {
        this.setSelectedOptions(this.value);
        this.validate();
    },
    methods: {
        validate() {
            if (!this.validators) return;
            if (this.validateHost) this.validateHost.clear(this);
            this.isValid = true;

            for (const [key, value] of Object.entries(this.validators)) {
                if (!value.check(Array.from(this.selectedOptions))) {
                    this.isValid = false;
                    if (this.validateHost) this.validateHost.add(this, { rule: key, messages: value.messages });
                }
            }
        },
        toggle() {
            this.open = ! this.open;
        },
        setSelectedOptions(newValue) {
            this.selectedOptions = null;
            const emptyMap = new Set();

            if (this.multiply) this.selectedOptions = newValue ? new Set(newValue) : emptyMap;
            else {
                if (newValue) emptyMap.add(newValue);
                this.selectedOptions = emptyMap;
            }
        },
        select($event) {
            if (this.disable) return;

            const selectedOptions = this.selectedOptions;
            if (selectedOptions.has($event)) {
                selectedOptions.delete($event);
            } else {
                if (!this.multiply) selectedOptions.clear();
                selectedOptions.add($event);
            }
            if (this.autoClose) this.toggle();
            this.selectedOptions = null;
            this.selectedOptions = selectedOptions;

            this.$emit(`selected`, $event);
            this.$emit(`input`, this.multiply ? Array.from(this.selectedOptions) : this.selectedOptions.values().next().value || null);

            this.validate();
        }
    },
    watch: {
        value(newValue) {
            this.setSelectedOptions(newValue);
            this.validate();
        }
    }
};
</script>