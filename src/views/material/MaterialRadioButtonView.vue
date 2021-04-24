<template>
    <div
        class="mdc-touch-target-wrapper">
        <div
            class="mdc-radio mdc-radio--touch">
            <input
                class="mdc-radio__native-control"
                type="radio"
                :value="value"
                @input="context.select(value)"
                :name="context.group"
            >
            <div class="mdc-radio__background">
                <div class="mdc-radio__outer-circle"></div>
                <div class="mdc-radio__inner-circle"></div>
            </div>
            <div class="mdc-radio__ripple"></div>
        </div>
        <span>
            {{ title }}
        </span>
    </div>
</template>

<script>
export default {
    name: `MaterialRadioButtonView`,
    props: {
        context: {
            type: Object,
            required: true
        },
        title: {
            type: String,
            default: () => ``
        },
        value: {
            type: [String, Number, Object],
            required: true
        }
    }
};
</script>