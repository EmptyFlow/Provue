<template>
    <div class="container">
        <button-state
            @clicked="test()"
            title="Primary">
            <template #default="{ context }">
                <bootstrap-button-view
                    v-if="theme === `bootstrap`"
                    appearance="primary"
                    :context="context"
                ></bootstrap-button-view>
                <material-button-view
                    v-if="theme === `material`"
                    :context="context"
                />
            </template>
        </button-state>
        <button-state @clicked="test()" title="Secondary">
            <template #default="{ context }">
                <bootstrap-button-view
                    v-if="theme === `bootstrap`"
                    :context="context"
                    appearance="secondary"
                ></bootstrap-button-view>
                <material-button-view
                    v-if="theme === `material`"
                    :context="context"
                    appearance="--raised">
                </material-button-view>
            </template>
        </button-state>
        <button-state
            @clicked="test()"
            title="Success">
            <template #default="{ context }">
                <bootstrap-button-view
                    v-if="theme === `bootstrap`"
                    :context="context"
                    appearance="success">
                </bootstrap-button-view>
                <material-button-view
                    v-if="theme === `material`"
                    :context="context"
                    appearance="--outlined">
                </material-button-view>
            </template>
        </button-state>
        <button-state
            @clicked="test()"
            title="Danger"
            v-if="theme === `bootstrap`">
            <template #default="{ context }">
                <bootstrap-button-view
                    :context="context"
                    appearance="danger"
                />
            </template>
        </button-state>
        <button-state
            @clicked="test()"
            title="Warning"
            v-if="theme === `bootstrap`">
            <template #default="{ context }">
                <bootstrap-button-view
                    v-if="theme === `bootstrap`"
                    :context="context" appearance="warning"
                />
            </template>
        </button-state>
        <button-state
            @clicked="test()"
            title="Light"
            v-if="theme === `bootstrap`">
            <template #default="{ context }">
                <bootstrap-button-view
                    v-if="theme === `bootstrap`"
                    :context="context" appearance="light"
                />
            </template>
        </button-state>
        <button-state
            @clicked="test()"
            title="Dark"
            v-if="theme === `bootstrap`">
            <template #default="{ context }">
                <bootstrap-button-view
                    v-if="theme === `bootstrap`"
                    :context="context"
                    appearance="dark"
                />
            </template>
        </button-state>
        <button-state
            @clicked="test()"
            title="Link"
            v-if="theme === `bootstrap`">
            <template #default="{ context }">
                <bootstrap-button-view
                    v-if="theme === `bootstrap`"
                    :context="context" appearance="link"
                />
            </template>
        </button-state>
    </div>
</template>

<script>
export default async function() {
    await globalComponent(`../../views/material/MaterialButtonView.vue`);

    return {
        name: `ButtonsDemo`,
        props: {
            theme: {
                type: String,
                default: () => `bootstrap`
            }
        },
        methods: {
            test() {
                alert(`Yahooo!!!`);
            }
        }
    }
}
</script>
