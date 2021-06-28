<template>
    <div class="container">
        <card-state
            title="Card title!"
            message="You can show message as text"
            image-alt="Card image"
            image-url="https://icatcare.org/app/uploads/2018/07/Thinking-of-getting-a-cat.png">
            <template #default="{ context }">
                <bootstrap-card-view
                    v-if="theme === `bootstrap`"
                    :context="context"
                    width="300px"
                ></bootstrap-card-view>
                <material-card-view
                    v-if="theme === `material`"
                    :context="context"                    
                />
            </template>
        </card-state>
    </div>
</template>

<script>
export default async function() {
    await globalComponents(`../../states/CardState.vue`, `../../views/bootstrap/BootstrapCardView.vue`, `../../views/material/MaterialCardView.vue`);

    return {
        name: `CardDemo`,
        props: {
            theme: {
                type: String,
                default: () => `bootstrap`
            }
        }
    }
}
</script>
