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
        }
    },
    data() {
        return {
            checked: false
        }
    },
    created() {
        this.checked = this.value;
    },
    methods: {
        toggle() {
            if (this.disable) return;

            this.value = !this.value;

            this.raiseEvents();
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
        }
    }
};
</script>