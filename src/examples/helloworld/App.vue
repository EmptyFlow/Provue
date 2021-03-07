<template>
    <div class="container">
        <button-state @clicked="test()" title="Primary">
            <template #default="{ context }">
                <button-view :context="context" />
            </template>
        </button-state>
        <button-state @clicked="test()" title="Secondary">
            <template #default="{ context }">
                <button-view :context="context" appearance="secondary" />
            </template>
        </button-state>
        <button-state @clicked="test()" title="Success">
            <template #default="{ context }">
                <button-view :context="context" appearance="success" />
            </template>
        </button-state>
        <button-state @clicked="test()" title="Danger">
            <template #default="{ context }">
                <button-view :context="context" appearance="danger" />
            </template>
        </button-state>
        <button-state @clicked="test()" title="Warning">
            <template #default="{ context }">
                <button-view :context="context" appearance="warning" />
            </template>
        </button-state>
        <button-state @clicked="test()" title="Light">
            <template #default="{ context }">
                <button-view :context="context" appearance="light" />
            </template>
        </button-state>
        <button-state @clicked="test()" title="Dark">
            <template #default="{ context }">
                <button-view :context="context" appearance="dark" />
            </template>
        </button-state>
        <button-state @clicked="test()" title="Link">
            <template #default="{ context }">
                <button-view :context="context" appearance="link" />
            </template>
        </button-state>
    </div>
</template>

<script>
//load bootstrap styles
require.resolveStyles(`https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css`);

module.exports = {  
    name: `Boot`,
    data() {
        return {
            text: `Muherka`
        }
    },
    methods: {
        test() {
            alert(`Yahooo!!!`);
        }
    },
    components: {
        'ButtonState': `remote:../../states/ButtonState.vue`,
        'ButtonView': `remote:../../views/bootstrap/ButtonView.vue`
    }
}
</script>

<style>
.container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 40px;
}
.container > * {
    margin-left: 5px;;
}
</style>