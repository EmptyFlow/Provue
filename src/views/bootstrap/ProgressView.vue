<template>
    <div class="progress">
        <div
            class="progress-bar"
            role="progressbar"
            :style="{ width: context.value + `%` }"
            :aria-valuenow="context.value"
            :aria-valuemin="context.minimum"
            :aria-valuemax="context.maximum">
        </div>
    </div>
</template>

<script>
export default {
    name: `ProgressView`,
    props: {
        context: {
            type: Object,
            required: true
        }
    }
};
</script>