<template>
    <div>
        <simple-grid>
        </simple-grid>
    </div>
</template>

<script>
export default async function () {
    await globalComponents(
        `SimpleGrid.vue`
    );

    return {
        name: `App`
    };
}
</script>
