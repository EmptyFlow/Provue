<template>
    <grid-view-state
        ref="gridstate"
        :columns="columns"
        :items="items"
        :options="options">
        <template #default="{ context }">
            <classic-grid-view
                ref="gridview"
                :context="context"
                @searchvaluechanged="searchValueChanged($event)"
                @toggleSorting="toggleSorting($event)">
            </classic-grid-view>
        </template>
    </grid-view-state>
</template>

<script>
export default async function () {
     await globalComponents(
        `../../states/GridViewState.vue`,
        `../../views/grids/TableView.vue`,
        `../../views/grids/PaginatorView.vue`,
        `../../views/grids/ClassicGridView.vue`
    );

    return {
        name: `ClassicGrid`,
        data() {
            return {
                options: {
                    handlers: {
                        getCount: this.getCount,
                        getPageItems: this.getPageItems,
                        fillItems: this.fillItems,
                        preloadPage: this.preloadPage
                    },
                    isGrouping: true,
                    groupField: `group`,
                    groupDescending: false,
                    groupKeys: new Set(),
                    searchValue: ``,
                    searchTimeoutId: null,
                    autoLoadPage: true
                },
                columns: [
                    {
                        title: `Name`,   
                        field: `name`,
                        slot: `nameslot`
                    },
                    { 
                        title: `Age`,
                        field: `age`,
                        slot: `ageslot`
                    },
                    {
                        title: `Fun fact`,
                        field: `funFact`,
                        slot: `factslot`
                    }
                ],
                items: [
                    {
                        name: `Alphonse`,
                        age: 14,
                        funFact: `Walking armour`,
                        group: `Protoganist`
                    },
                    {
                        name: `Edward`,
                        age: 15,
                        funFact: `Don't like milk`,
                        group: `Protoganist`
                    },
                    {
                        name: `Scar`,
                        age: `unknown`,
                        funFact: `He doesn't want to be called by a name other than Scar.`,
                        group: `Protoganist`
                    },
                    {
                        name: `Mei`, 
                        age: 13, 
                        funFact: `She has a cute pet panda ^_^`,
                        group: `Supporting character`
                    },
                    {
                        name: `Roy`,
                        age: 30, 
                        funFact: `In love with his assistant`,
                        group: `Supporting character`
                    },
                    {
                        name: `Van`,
                        age: 451,
                        funFact: `Has a perfect wife`,
                        group: `Supporting character`
                    },
                    {
                        name: `Character1`,
                        age: 320,
                        funFact: `Number one`,
                        group: `Supporting character`
                    },
                    {
                        name: `Character2`,
                        age: 322,
                        funFact: `Number two`,
                        group: `Supporting character`
                    },
                    {
                        name: `Character3`,
                        age: 323,
                        funFact: `Number three`,
                        group: `Supporting character`
                    },
                ],
                filteringItems: []
            }
        },
        methods: {
            preloadPage(pageNumber, context) {
                this.filteringItems = context.filteringObjectsByMultipleField(this.items, context.filterFields);

                return Promise.resolve();
            }, 
            getCount() {
                return this.filteringItems.length;
            },
            getPageItems(context) {
                const items = context.sortingObjectByMultipleField(this.filteringItems, context.sortingFields);
                
                const startIndex = context.innerSelectedPageSize * (context.currentPage - 1);
                return items.slice(startIndex, startIndex + context.innerSelectedPageSize);
            },
            setGroups(items) {
                if (!this.options.groupField) return;

                this.options.groupKeys.clear();

                const field = this.options.groupField;

                for (const item of items) this.options.groupKeys.add(item[field]);
            },
            fillItems(columns, context) {
                let pageItems = context.handlers.getPageItems(context);

                if (this.options.isGrouping) this.setGroups(pageItems);

                const groupField = this.options.groupField;
                let currentGroup = null;
                const result = [];
                let rowIndex = 0;
                for (const item of pageItems) {
                    let columnIndex = 0;
                    
                    if (this.options.isGrouping && currentGroup !== item[groupField]) {
                        currentGroup = item[groupField];
                    
                        result.push(
                            {
                                value: currentGroup,
                                rowIndex,
                                columnIndex, 
                                isGroup: true, // field need for determine that cell is group
                                column: { slot: `groupslot` }, // for compability, used one slot for all groups
                                item: {} // for compability
                            }
                        );
                    }
                    
                    for (const column of columns) {
                        result.push(
                            {
                                value: item[column.field],
                                rowIndex,
                                columnIndex, 
                                column: column,
                                item
                            }
                        );
                        columnIndex++;
                    }
                    rowIndex++;
                }

                return result;
            },
            performFiltering(searchValue) {
                // in this case we removing or setting filter for fulltext search
                let filterFields;
                if (!searchValue) {
                    filterFields = [];
                } else {
                    filterFields = [
                        {
                            value: searchValue,
                            command: this.fullTextSearch,
                            fields: [] // in this case fields not used because performing fulltext search
                        }
                    ]
                }

                const gridState = this.$refs.gridstate;
                gridState.setFilterFields(filterFields);
                gridState.reload();
            },
            searchValueChanged($event) {
                //After the user type a new character in the search field it will be bad practice to immediately perform a request for filtering because it can cause performance issues for the backend.
                //Instead will be run the timer for one second, if in this interval user types a new character in the search field it reset the timer. If the user doesn't type in any characters will be performing a request for filtering data.
                if (this.searchTimeoutId) clearTimeout(this.searchTimeoutId);
                
                this.searchTimeoutId = setTimeout(
                    () => {
                        this.performFiltering($event);

                        this.searchTimeoutId = null;
                    },
                    1000
                );
            },      
            fullTextSearch(item, fields, value) {
                //Fields in parameters ignored because we need search on any fields.
                const objectFields = Object.keys(item);

                return objectFields.find(field => item[field] && item[field].toString().toLowerCase().indexOf(value.toLowerCase()) > -1);
            }
        }
    }
}
</script>
