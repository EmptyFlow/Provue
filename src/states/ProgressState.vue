<template>
    <div>
        <slot :context="this"></slot>
    </div>
</template>

<script>
export default {
    name: `ProgressState`,
    props: {
        value: {
            type: Number,
            default: () => 0
        },
        minimum: {
            type: Number,
            default: () => 0
        },
        maximum: {
            type: Number,
            default: () => 100
        }
    },
    data() {
        return {
            percent: 0
        }
    },
    created() {
        this.percent = this.value;
    },
    watch: {
        value(newValue) {
            if (!newValue || isNaN(newValue)) return;

            this.percent = newValue;
        }
    }
};
</script>