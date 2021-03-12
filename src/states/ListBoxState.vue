<template>
    <div>
        <slot :context="this"></slot>
    </div>
</template>

<script>
module.exports = {
    name: `ListBoxState`,
    props: {
        value: {
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
            selectedOptions: null
        }  
    },
    created() {
        this.selectedOptions = this.value ? new Set(this.value) : new Set();
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
            this.$emit(`input`, Array.from(this.selectedOptions));
        }
    },
    watch: {
        value(newValue) {
            this.selectedOptions = null;
            this.selectedOptions = newValue ? new Set(newValue) : new Set();
        }
    }
};
</script>