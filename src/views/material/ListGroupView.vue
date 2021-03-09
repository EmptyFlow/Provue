<template>
    <ul class="mdc-list">
        <li :class="{'mdc-list-item': true, 'mdc-list-item--disabled': context.disable, 'mdc-list-item--selected': context.activeHandler(item)}"
            v-for="(item, index) of context.value" :key="index" 
            @click="context.click(item)">
            <div class="mdc-list-item__ripple">
                <slot name="content" :item="item"></slot>
            </div>
        </li>
    </ul>
</template>

<script>
module.exports = {
    name: `ListGroupView`,
    props: {
        context: {
            type: Object,
            required: true
        }
    }
};
</script>