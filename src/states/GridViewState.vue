<template>
    <div>
        <slot :context="this"></slot>
    </div>
</template>

<script>
export default {
    name: `GridViewState`,
    props: {
        items: {
            type: Array,
            default: () => []
        },
        columns: {
            type: Array,
            default: () => []
        },
        pageSizes: {
            type: Array,
            default: () => [5, 10, 15, 20]
        },
        selectedPageSize: {
            type: Number,
            default: () => 5
        },
        options: {
            type: Object,
            default: () => {}
        }
    },
    data () {
        return {
            paginationPages: [],
            currentPage: 1,
            innerSelectedPageSize: 10,
            handlers: {
                getCount: this.localGetCount,
                getPageItems: this.localGetPageItems,
                fillItems: this.localFillItems,
                preloadPage: this.localPreloadPage,
                pageLoaded: this.localPageLoaded
            },
            sortingFields: {},
            filterFields: []
        }  
    },
    created() {
        this.selectPageSize(this.selectedPageSize);
        if (this.options && this.options.handlers) Object.assign(this.handlers, this.options.handlers);
    },
    mounted() {
        if (this.options && this.options.autoLoadPage) this.loadPage(1);
    },
    methods: {
        setFilterFields(filters) {
            this.filterFields = filters;
        },
        filteringObjectsByMultipleField(items, filterFields) {
            if (!filterFields || !filterFields.length) return items;

            return items.filter(
                item => {
                    return filterFields.filter(filter => filter.command(item, filter.fields, filter.value)).length;
                }
            );
        },
        setHandler(name, handler) {
            if (!handler) {
                console.warn(`GridViewState.setHandler: handler ${name} is null!`);
                return;
            }

            this.handlers[name] = handler;
        },
        toggleSorting(columnField) {
            let sortingFields = this.sortingFields[columnField];
            
            if (sortingFields) {
                if (!sortingFields.active) {
                    sortingFields.active = true;
                    sortingFields.descending = false;
                } else {
                    if (sortingFields.descending) {
                        sortingFields.active = false;
                    } else {
                        sortingFields.descending = true;
                    }
                }                    
            } else {
                sortingFields = { descending: false, active: true };
            }

            this.$set(this.sortingFields, columnField, sortingFields);

            this.reload();
        },
        sortingObjectByMultipleField(items, sortingFields) {
            if (!sortingFields || !Object.keys(sortingFields).length) return items;
            
            const array = items.map(a => a);
            const rightFieldsArray = Object.keys(sortingFields)
                .filter(a => sortingFields[a].active)
                .map(
                    a => {
                        return {
                            name: a,
                            descending: sortingFields[a].descending
                        }
                    }
                );
            if (!rightFieldsArray.length) return items;

            function innerSort(left, right, rightFields) {
                const sotingItem = rightFields[0];
                const sortingField = sotingItem.name;
                const sortingDescending = sotingItem.descending;

                const leftValue = left[sortingField] || ``;
                const rightValue = right[sortingField] || ``; 
                if (leftValue === rightValue) {
                    return rightFields && rightFields.length > 1 ? innerSort(left, right, rightFields.slice(1)) : 0;
                }

                return (sortingDescending ? leftValue < rightValue : leftValue > rightValue ) ? 1 : -1;
            }

            array.sort((left, right) => {
                return innerSort(left, right, rightFieldsArray);
            });
            
            return array;
        },
        selectPageSize(value) {
            if (value && this.pageSizes.find(a => a === value)) this.innerSelectedPageSize = value;
        },
        localPageLoaded() {
        },
        localGetCount() {
            return this.items.length;
        },
        localGetPageItems() {
            const startIndex = this.innerSelectedPageSize * (this.currentPage - 1);
            return this.items.slice(startIndex, startIndex + this.innerSelectedPageSize);
        },
        localPreloadPage() {
            return Promise.resolve();
        },
        localFillItems(columns) {
            const result = [];
            let rowIndex = 0;
            const pageItems = this.handlers.getPageItems(this);
            
            for (const item of pageItems) {
                let columnIndex = 0;
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
        async reload() {
            await this.loadPage(1);
        },
        async loadPage(pageNumber) {
            if (this.handlers.preloadPage) await this.handlers.preloadPage(pageNumber, this);

            this.currentPage = pageNumber;

            if (this.handlers.pageLoaded) this.handlers.pageLoaded();
        },
        pageFormatter(pageNumber) {
            const totalCount = this.handlers.getCount(this);
            const pageSize = this.innerSelectedPageSize;

            switch(pageNumber)  {
              case `<<`:
              case `first`:
                return 1;
              case `<`:
              case `previous`:
                return this.currentPage - 1;
              case `>`:
              case `next`:
                return this.currentPage + 1;
              case `>>`:
              case `last`:
                return Math.ceil(totalCount / pageSize);
              default:
                return pageNumber;
           }
        },
        getPaginationPages() {
            const count = this.handlers.getCount(this);
            const pageSize = this.innerSelectedPageSize;

            if (count === 0) {
              return [];
            }

            const countPages = Math.ceil(count / pageSize);

            const paginationPages = [];
            const pagesBufferSize = 2;

            if (countPages <= pagesBufferSize * 2 + 1) {
                for (let i = 1; i <= countPages; i++) paginationPages.push(i);
            } else {
                let startPage = this.currentPage - pagesBufferSize;
                if (startPage < 1) startPage = 1;

                if (startPage > 1) {
                    paginationPages.push(`<<`);
                    paginationPages.push(`<`);
                }

                for (let i = 0; i < pagesBufferSize * 2 + 1; i++) {
                if (startPage + i > countPages) break;
                    paginationPages.push(startPage + i);
                }
                
                if (startPage + pagesBufferSize + 1 < countPages - 1) { 
                    paginationPages.push(`>`);
                    paginationPages.push(`>>`);
                }
            }
            return paginationPages;
        }
    },
    watch: {
        items(newValue) {
            if (!newValue) return;

            this.items = newValue;
            this.loadPage(this.currentPage);
        },
        pageSizes(newValue) {
            if (!newValue) return;
            if (!newValue[0]) return;
            
            this.pageSizes = newValue;
            if (!(this.innerSelectedPageSize in this.pageSizes)) this.innerSelectedPageSize = this.pageSizes[0];
            this.loadPage(this.currentPage);
        }
    },
    computed: {
        visibleColumns() {
            return this.columns.filter(a => !a.notVisible);
        },
        columnsWithSlots() {
            return this.columns.filter(a => a.slot);
        }
    }
};
</script>