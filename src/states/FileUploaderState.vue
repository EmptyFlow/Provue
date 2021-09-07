<template>
    <div>
        <slot :context="this"></slot>
    </div>
</template>

<script>
export default {
    name: `FileUploaderState`,
    props: {
        value: {
            type: Array,
            default: () => []
        },
        modelValue: {
            type: Array,
            default: () => []
        },
        placeholder: {
            type: String,
            default: () => ``
        },
        disable: {
            type: Boolean,
            default: () => false
        },
        multiselect: {
            type: Boolean,
            default: () => false
        },
        fileAccept: {
            type: String,
            default: () => `*.*`
        },
        validators: {
            type: Object,
            default: () => {}
        },
        validateHost: {
            type: Object
        }
    },
    data() {
        return {
            text: ``,
            files: [],
            isValid: false,
            isVue3: vueVersion === `3`
        }
    },
    created() {
        this.files = this.isVue3 ? this.modelValue : this.value;
        this.validate();
    },
    methods: {
        validate() {
            this.isValid = true;
            if (!this.validators) return;
            if (this.validateHost) this.validateHost.clear(this);

            for (const [key, value] of Object.entries(this.validators)) {
                if (!value.check(this.files)) {
                    this.isValid = false;
                    if (this.validateHost) this.validateHost.add(this, { rule: key, messages: value.messages });
                }
            }
        },
        selectFile(fileList) {
            if (this.disable) return;
            if (!fileList) return;

            this.setValue(fileList);
        },
        clearFiles() {
            if (!this.files.length) return;

            this.setValue([]);
        },
        raiseEvents() {
            this.$emit(`selected`, this.files); // added for separate v-model events and external events
            this.$emit(this.isVue3 ? `update:modelValue` : `input`, this.files);
        },
        setValue(newValue, needRaiseEvents = true) {
            const fileArray = [...newValue];
            this.files = fileArray;
            this.text = fileArray.map(a => a.name).join(`, `);
            
            if (needRaiseEvents) this.raiseEvents();
            this.validate();
        }
    },
    watch: {
        value(newValue) {
            this.setValue(newValue, false);
        },
        modelValue(newValue) {
            this.setValue(newValue, false);
        }
    }
};
</script>