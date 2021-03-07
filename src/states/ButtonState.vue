<template>
    <div>
        <slot :context="this"></slot>
    </div>
</template>

<script>
module.exports = {
    name: `ButtonState`,
    props: {
        title: {
            type: String,
            default: () => ``
        },
        disable: {
            type: Boolean,
            default: () => false
        }
    },
    methods: {
        click($event) {
            if (this.disable) return;

            this.$emit(`clicked`, $event);
        }
    }
};
</script>