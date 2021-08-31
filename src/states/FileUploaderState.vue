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
            type: String,
            default: () => ``
        },
        modelValue: {
            type: String,
            default: () => ``
        },
        type: {
            type: String,
            default: () => `text`
        },
        placeholder: {
            type: String,
            default: () => ``
        },
        readOnly: {
            type: Boolean,
            default: () => false
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
                if (!value.check(this.text)) {
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
        setValue(newValue) { 
            this.files = newValue;
            this.text = newValue.map(a => a.name).join(`, `);
            
            this.raiseEvents();
            this.validate();
        }
    },
    watch: {
        value(newValue) {
            this.setValue(newValue);
        },
        modelValue(newValue) {
            this.setValue(newValue);
        }
    }
};
</script>