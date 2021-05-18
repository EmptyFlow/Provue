<template>
    <div>
        <slot :context="this"></slot>
    </div>
</template>

<script>
export default {
    name: `ListBoxState`,
    props: {
        value: {
            type: Array,
            default: () => []
        },
        modelValue: {
            type: Array,
            default: () => []
        },
        disable: {
            type: Boolean,
            default: () => false
        },
        options: {
            type: Array,
            default: () => []
        }
    },
    data () {
        return {
            selectedOptions: null,
            isVue3: vueVersion === `3`
        }  
    },
    created() {
        const value = this.isVue3 ? this.modelValue : this.value;
        this.selectedOptions = value ? new Set(value) : new Set();
    },
    methods: {
        select($event) {
            if (this.disable) return;
            const selectedOptions = this.selectedOptions;
            if (selectedOptions.has($event)) {
                selectedOptions.delete($event);
            } else {
                selectedOptions.add($event);
            }

            this.selectedOptions = null;
            this.selectedOptions = selectedOptions;

            this.$emit(`selected`, $event);
            this.$emit(this.isVue3 ? `update:modelValue` : `input`, Array.from(this.selectedOptions));
        },
        setSelectedOptions(newValue) {
            this.selectedOptions = null;
            this.selectedOptions = newValue ? new Set(newValue) : new Set();
        }
    },
    watch: {
        value(newValue) {
            this.setSelectedOptions(newValue);
        },
        modelValue(newValue) {
            this.setSelectedOptions(newValue);
        }
    }
};
</script>