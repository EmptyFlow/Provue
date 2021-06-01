<template>
    <div
        class="card"
        :style="{ 'width': width }">
        <img
            :src="context.imageUrl"
            class="card-img-top"
            :alt="context.imageAlt">
        <div
            class="card-body">
            <h5
                class="card-title">
                {{ context.title }}
            </h5>
            <p
                class="card-text">
                {{ context.message }}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: `BootstrapCardView`,
    props: {
        context: {
            type: Object,
            required: true
        },
        width: {
            type: String,
            default: () => `100px`
        }
    }
};
</script>