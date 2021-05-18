<template>
    <div class="progress">
        <div
            class="progress-bar"
            role="progressbar"
            :style="{ width: context.percent + `%` }"
            :aria-valuenow="context.percent"
            :aria-valuemin="context.minimum"
            :aria-valuemax="context.maximum">
        </div>
    </div>
</template>

<script>
export default {
    name: `BootstrapProgressView`,
    props: {
        context: {
            type: Object,
            required: true
        }
    }
};
</script>