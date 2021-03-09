<template>
    <ul class="list-group">
        <li :class="{'list-group-item': true, 'disabled': context.disable, 'active': context.activeHandler(item)}"
            v-for="(item, index) of context.value" :key="index" 
            @click="context.click(item)">
            <slot name="content" :item="item"></slot>
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