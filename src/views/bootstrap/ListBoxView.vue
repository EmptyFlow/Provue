<template>
    <ul class="list-group">
        <li :class="{'list-group-item': true, 'disabled': context.disable, 'active': context.selectedOptions.has(item) }"
            v-for="(item, index) of context.options" :key="index" 
            @click="context.select(item)">
            <slot name="content" :item="item"></slot>
        </li>
    </ul>
</template>

<script>
module.exports = {
    name: `ListBoxView`,
    props: {
        context: {
            type: Object,
            required: true
        }
    }
};
</script>