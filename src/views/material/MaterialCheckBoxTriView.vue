<template>
    <div class="mdc-touch-target-wrapper">
        <div
            :class="[`mdc-checkbox`, context.disable ? `mdc-checkbox--disabled` : ``]">
            <input
                ref="inputElement"
                type="checkbox"
                class="mdc-checkbox__native-control"
                :checked="context.checked"
                @input="toggleValue()"
                :disabled="context.disable"
            /> 
            <div class="mdc-checkbox__background">
                <svg
                    class="mdc-checkbox__checkmark"
                    viewBox="0 0 24 24">
                    <path
                        class="mdc-checkbox__checkmark-path"
                        fill="none"
                        d="M1.73,12.91 8.1,19.28 22.79,4.59"
                    />
                </svg>
                <div class="mdc-checkbox__mixedmark">            
                </div>  
            </div>
            <div class="mdc-checkbox__ripple">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: `MaterialCheckBoxTriView`,
    props: {
        context: {
            type: Object,
            required: true
        }
    },
    mounted() {
        this.$refs.inputElement.indeterminate = this.context.checked === null;
        this.updateIndetermineState();
    },
    methods: {
        toggleValue() {
            this.context.toggle();
            this.updateIndetermineState();    
        },
        updateIndetermineState() {
            this.$refs.inputElement.indeterminate = this.context.checked === null;
        }
    }
};
</script>