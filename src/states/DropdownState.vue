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
        }
    },
    data () {
        return {
            open: false,
            selectedOptions: null
        }  
    },
    created() {
        this.setSelectedOptions(this.value);
    },
    methods: {
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
        }
    },
    watch: {
        value(newValue) {
            this.setSelectedOptions(newValue);
        }
    }
};
</script>