<template>
    <div 
        :draggable="disable ? `false` : `true`"
        @dragstart="dragStart($event)"
        @dragend="dragEnd()"
        @drag="dragging($event)">
        <slot></slot>
    </div>
</template>

<script >
export default {
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
        drag($event) {
            if (this.callback) this.callback($event);
        },
        dragStart($event) {
            $event.dataTransfer.setData(this.dataType, JSON.stringify(this.payloadData));
            
            this.$emit(`started`);
        }
    }
}
</script>