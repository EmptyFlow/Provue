<template>
    <div class="dropdown">
        <div :class="{'form-control': context.validators, 'is-invalid': !context.isValid, 'is-valid': context.validators && context.isValid }" 
            @click="context.toggle()">
            <slot>Dropdown</slot>
        </div>
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
export default {
    name: `BootstrapDropdownView`,
    props: {
        context: {
            type: Object,
            required: true
        }
    }
};
</script>