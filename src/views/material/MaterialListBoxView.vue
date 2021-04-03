<template>
    <ul class="mdc-list">
        <li :class="{'mdc-list-item': true, 'mdc-list-item--disabled': context.disable, 'mdc-list-item--selected': context.selectedOptions.has(item) }"
            v-for="(item, index) of context.options" :key="index" 
            @click="context.select(item)">
            <div class="mdc-list-item__ripple">
                <slot name="content" :item="item"></slot>
            </div>
        </li>
    </ul>
</template>

<script>
module.exports = {
    name: `MaterialListBoxView`,
    props: {
        context: {
            type: Object,
            required: true
        }
    }
};
</script>