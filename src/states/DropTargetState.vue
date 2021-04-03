<template>
    <div
        @dragover.prevent
        @dragenter="onDropEnter()"
        @dragleave="dropEnter = false"
        @drop.prevent="drop($event)">
        <slot></slot>
    </div>
</template>

<script>
module.exports = {
    props: {
        dataTypes: {
            type: [],
            default: () => null
        },
        disable: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            dropEnter: false
        }
    },
    methods: {
        onDropEnter() {
            if (this.disable) return;

            this.dropEnter = true;
        },
        drop($event) {
            this.dropEnter = false;

            const results = {};
            for (const dataType in dataTypes) {
                const data = $event.dataTransfer.getData(dataType);
                if (!data) continue;
                
                results[dataType] = JSON.parse($event.dataTransfer.getData(dataType));
            }

            this.$emit(`dropped`, results);
        }
    }
}
</script>