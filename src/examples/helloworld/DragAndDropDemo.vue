<template>
    <div class="container">
        <drag-source-state data-type="demo" :data="dragData">
            <template #default>
                <div class="dragzone">
                    <span>Drag me</span>
                </div>
            </template>
        </drag-source-state>
        <drop-target-state
            :data-types="[`demo`]"
            @dropped="dropped($event)">
            <template #default>
                <div class="dropzone">
                    <span>{{ alreadyDropped ? `Dropped!!` : `Drop here` }}</span>
                </div>
            </template>
        </drop-target-state>
    </div>
</template>

<script>
export default async function() {
    await globalComponents([`../../states/DragSourceState.vue`, `../../states/DropTargetState.vue`]);

    return {
        name: `DragAndDropDemo`,
        data() {
            return {
                dragData: {
                    message: `Yaha`                    
                },
                alreadyDropped: false
            }
        },
        methods: {
            dropped($event) {
                this.alreadyDropped = true;
            }
        }
    }
}
</script>

<style>
.dragzone {
    width: 200px;
    height: 200px;
    background: lightgreen;
    border: 2px dotted lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
}
.dropzone {
    width: 200px;
    height: 200px;
    margin-left: 100px;
    background: lightsalmon;
    border: 2px dotted lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
}

</style>