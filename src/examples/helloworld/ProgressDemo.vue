<template>
    <div class="progress-container">
        <progress-state v-model="percent">
            <template #default="{ context }">
                <progress-view :context="context" />
            </template>
        </progress-state>
        <progress-state v-model="percent2">
            <template #default="{ context }">
                <progress-view :context="context" />
            </template>
        </progress-state>
    </div>
</template>

<script>
export default async function() {
    await globalComponent(`../../states/ProgressState.vue`);
    await globalComponent(`../../views/bootstrap/ProgressView.vue`);

    return {
        name: `ProgressDemo`,
        data() {
            return {
                percent: 10,
                percent2: 80
            }
        }
    }
}
</script>

<style>
.progress-container {
    display: flex;
    flex-direction: column;
    margin: 10px;
}
.progress-container > * {
    width: 500px;
    margin: 10px;
}
</style>