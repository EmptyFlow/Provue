<template>
    <div class="container red-color">
        Test namespace
    </div>
</template>

<script>
export default {
    name: `TestComponentNamespace`
}
</script>

<style>
.red-color {
    color: red;
}
.container {
    width: 100px;
}
.container > * {
    padding: 10px;
}
</style>

<component-namespace>
    main
</component-namespace>

