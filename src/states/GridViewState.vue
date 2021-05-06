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
                fillItems: this.localFillItems
            }
        }  
    },
    created() {
        this.selectPageSize(this.selectedPageSize);
    },
    methods: {
        selectPageSize(value) {
            if (value && this.pageSizes.find(a => a === value)) this.innerSelectedPageSize = value;
        },
        localGetCount() {
            return this.items.length;
        },
        localGetPageItems() {
            const startIndex = this.innerSelectedPageSize * (this.currentPage - 1);
            return this.items.slice(startIndex, startIndex + this.innerSelectedPageSize);
        },
        localFillItems(items, columns) {
            const result = [];
            let rowIndex = 0;
            const pageItems = this.handlers.getPageItems();
            
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
        loadPage(pageNumber) {
            this.currentPage = pageNumber;
        },
        pageFormatter(pageNumber) {
            const totalCount = this.handlers.getCount();
            const pageSize = this.selectedPageSize;

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
            const count = this.handlers.getCount();
            const pageSize = this.selectedPageSize;

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
        }
    }
};
</script>