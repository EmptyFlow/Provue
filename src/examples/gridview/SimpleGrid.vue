<template>
    <grid-view-state
        :columns="columns"
        :items="items">
        <template #default="{ context }">
            <simple-grid-view
                :context="context">                
            </simple-grid-view>
        </template>
    </grid-view-state>
</template>

<script>
export default async function () {
     await globalComponents(
        `../../states/GridViewState.vue`,
        `../../views/grids/TableView.vue`,
        `../../views/grids/PaginatorView.vue`,
        `../../views/grids/SimpleGridView.vue`
    );

    return {
        name: `SimpleGrid`,
        data() {
            return {
                columns: [
                    {
                        title: `Name`,   
                        field: `name` 
                    },
                    { 
                        title: `Age`,
                        field: `age`
                    },
                    {
                        title: `Fun fact`,
                        field: `funFact`
                    }
                ],
                items: [
                    {
                        name: `Alphonse`,
                        age: 14,
                        funFact: `Walking armour`
                    },
                    {
                        name: `Edward`,
                        age: 15,
                        funFact: `Don't like milk`
                    }
                ]
            }
        }
    }
}
</script>
