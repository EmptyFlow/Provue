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
export default async function() {
    await globalComponent(`../../states/ButtonState.vue`);
    await globalComponent(`../../views/bootstrap/ButtonView.vue`);

    return {
        name: `ButtonsDemo`,
        methods: {
            test() {
                alert(`Yahooo!!!`);
            }
        }
    }
}
</script>
