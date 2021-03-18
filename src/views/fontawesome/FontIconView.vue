<template>
    <i :class="[context.group, context.id]" :style="{ 'font-size': context.size }"></i>
</template>

<script>
module.exports = {
    name: `FontIconView`,
    props: {
        context: {
            type: Object,
            required: true
        }
    }
};
</script>