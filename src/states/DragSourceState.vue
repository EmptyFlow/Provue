<template>
    <div 
        :draggable="disable ? `false` : `true`"
        @dragstart="dragStart($event)"
        @dragend="dragEnd()"
        @drag="dragging($event)">
        <slot :context="this"></slot>
    </div>
</template>

<script >
export default {
    name: `DragSourceState`,
    props: {
        dataType: {
            type: String,
            required: true
        },
        disable: {
            type: Boolean,
            default: false
        },
        callback: {
            type: Function,
            required: false
        },
        data: {
            type: Object,
            required: true
        }
    },
    methods: {
        dragEnd() {
            this.$emit(`ended`);
        },
        dragging($event) {
            this.$emit(`moved`, $event);
        },
        drag($event) {
            if (this.callback) this.callback($event);
        },
        dragStart($event) {
            $event.dataTransfer.setData(this.dataType, JSON.stringify(this.data));
            
            this.$emit(`started`);
        }
    }
}
</script>