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
        modelValue: {
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
            percent: 0,
            isVue3: vueVersion === `3`
        }
    },
    created() {
        this.percent = this.isVue3 ? this.modelValue : this.value;
    },
    methods: {
        setProgress(newValue) {
            if (!newValue || isNaN(newValue)) return;

            this.percent = newValue;
        }
    },
    watch: {
        value(newValue) {
            this.setProgress(newValue);
        },
        modelValue(newValue) {
            this.setProgress(newValue);
        }
    }
};
</script>