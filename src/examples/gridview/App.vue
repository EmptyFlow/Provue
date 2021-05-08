<template>
    <div>
        <div>
            <simple-grid>
            </simple-grid>
        </div>
        <div>
            <classic-grid>            
            </classic-grid>
        </div>
    </div>
</template>

<script>
export default async function () {
    await globalComponents(
        `SimpleGrid.vue`,
        `ClassicGrid.vue`
    );

    return {
        name: `App`
    };
}
</script>
