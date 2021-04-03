<template>
    <div
        @dragover.prevent
        @dragenter="onDropEnter()"
        @dragleave="dropEnter = false"
        @drop.prevent="drop($event)">
        <slot :context="this"></slot>
    </div>
</template>

<script>
export default {
    name: `DropTargetState`,
    props: {
        dataTypes: {
            type: Array,
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
            for (const dataType of this.dataTypes) {
                const data = $event.dataTransfer.getData(dataType);
                if (!data) continue;
                
                results[dataType] = JSON.parse($event.dataTransfer.getData(dataType));
            }

            this.$emit(`dropped`, results);
        }
    }
}
</script>