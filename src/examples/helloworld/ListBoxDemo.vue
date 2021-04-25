<template>
    <div class="container">
        <div v-if="theme === `bootstrap`" class="stack">
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
        <div v-if="theme === `material`" class="stack">
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
    await globalComponents(`../../states/ListBoxState.vue`, `../../views/bootstrap/BootstrapListBoxView.vue`, `../../views/material/MaterialListBoxView.vue`);

    return {
        name: `ListBoxDemo`,
        props: {
            theme: {
                type: String,
                default: () => `bootstrap`
            }
        },
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