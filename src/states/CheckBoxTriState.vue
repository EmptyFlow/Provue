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
        }
    },
    data() {
        return {
            checked: null
        }
    },
    created() {
        this.checked = this.value;
    },
    methods: {
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