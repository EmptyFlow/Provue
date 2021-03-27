<template>
    <button
        type="button"
        :class="[`btn`, `btn-` + appearance]"
        @click="context.click($event)">
        <slot>
            <span>
                {{ context.title }}
            </span>
        </slot>
    </button>
</template>

<script>
export default {
    name: `ButtonView`,
    props: {
        appearance: {
            type: String,
            default: `primary`
        },
        context: {
            type: Object,
            required: true
        }
    }
};
</script>