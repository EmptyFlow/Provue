<template>
    <div class="container">
        <div class="stack">
            <h3>Bootstrap</h3>
            <list-box-state 
                v-model="selectedItem"
                :options="listItems"
                @selected="listItemSelected($event)">
                <template #default="{ context }">
                    <bootstrap-list-box-view :context="context">
                        <template #content="{ item }">
                            {{ item.title }}
                        </template>
                    </bootstrap-list-box-view>
                </template>
            </list-box-state>
        </div>
        <div class="stack">
            <h3>Material</h3>
            <list-box-state class="full-width "
                v-model="selectedItem"
                :options="listItems"
                @selected="listItemSelected($event)">
                <template #default="{ context }">
                    <material-list-box-view :context="context">
                        <template #content="{ item }">
                            <div>{{ item.title }}</div>
                        </template>
                    </material-list-box-view>
                </template>
            </list-box-state>
        </div>
    </div>
</template>

<script>
export default async function() {
    await globalComponent(`../../states/ListBoxState.vue`);
    await globalComponent(`../../views/bootstrap/BootstrapListBoxView.vue`);
    await globalComponent(`../../views/material/MaterialListBoxView.vue`);

    return {
        name: `ListBoxDemo`,
        data() {
            return {
                listItems: [{id: 1, title: `test 1`}, {id: 2, title: `test 2`}, {id: 3, title: `test 3`}],
                selectedItem: []
            }
        },
        methods: {
            listItemSelected($event) {
                console.log($event);
            }
        }
    }
}
</script>

<style>
.stack {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 400px;
}
</style>