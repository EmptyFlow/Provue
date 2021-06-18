<template>
    <div class="mdc-card mdc-card--outlined">
        <div class="mdc-card__primary-action">
            <div class="mdc-card__media mdc-card__media--square">
                <div class="mdc-card__media-content">
                    {{ context.title }}
                </div>
            </div>
            <span>
                {{ context.message }}
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: `MaterialCardView`,
    props: {
        context: {
            type: Object,
            required: true
        }
    }
};
</script>
