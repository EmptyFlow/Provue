
<template>
    <div>
        <slot :context="this"></slot>
    </div>
</template>

<script>
module.exports = {
    name: `ListGroupState`,
    props: {
        value: {
            type: Array,
            default: () => []
        },
        disable: {
            type: Boolean,
            default: () => false
        },
        activeHandler: {
            type: Function,
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