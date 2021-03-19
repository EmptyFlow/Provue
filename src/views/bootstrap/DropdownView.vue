<template>
    <div class="dropdown">
        <div @click="context.toggle()"><slot>Dropdown</slot></div>
        <ul :class="{'dropdown-menu': true, 'show': context.open}">
            <li :class="{'dropdown-item': true, 'disabled': context.disable, 'active': context.selectedOptions.has(item) }"
                v-for="(item, index) of context.options" 
                :key="index" 
                @click="context.select(item)">
                <slot name="content" :item="item"></slot>
            </li>
        </ul>
    </div>
</template>

<script>
module.exports = {
    name: `DropdownView`,
    props: {
        context: {
            type: Object,
            required: true
        }
    }
};
</script>