<template @main>
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
.container-namespace {
    width: 100px;
}
.container-namespace > * {
    padding: 10px;
}
</style>