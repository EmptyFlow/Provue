<template>
    <div class="container">
        Font awesome icons: 
        <font-icon-state
            group="fas"
            id="fa-address-card"
            size="24px">
            <template #default="{ context }"><font-icon-view :context="context" /></template>
        </font-icon-state>
        <font-icon-state
            group="fab"
            id="fa-amazon"
            size="24px">
            <template #default="{ context }"><font-icon-view :context="context" /></template>
        </font-icon-state>
        <font-icon-state
            group="fab"
            id="fa-google-play"
            size="24px">
            <template #default="{ context }"><font-icon-view :context="context" /></template>
        </font-icon-state>
    </div>
</template>

<script>
export default async function() {
    await globalComponents([`../../states/FontIconState.vue`, `../../views/fontawesome/FontIconView.vue`]);

    return {
        name: `FontAwesomeDemo`,
    }
}
</script>