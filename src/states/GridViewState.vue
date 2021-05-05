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
                getPageItem: this.localGetPageItems,
            }
        }  
    },
    created() {
        this.selectPageSize(this.selectedPageSize);
    },
    methods: {
        selectPageSize(value) {
            if (value && value in this.pageSizes) this.innerSelectedPageSize = value;
        },
        localGetCount() {
            return this.items.length;
        },
        localGetPageItems(startIndex, endIndex) {
            return this.items.slice(startIndex, endIndex);
        },
        loadPage(pageNumber) {
            const count = this.handlers.getCount();
            const pageSize = this.innerSelectedPageSize;
            const startIndex = (pageNumber - 1) * pageSize;
            const pageItemsCount = count - startIndex > pageSize ? pageSize : count - startIndex;
            this.currentPage = pageNumber;
            if (startIndex > count) return [];
            return this.localGetPageItems(startIndex, startIndex + pageItemsCount);
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
              this.paginationPages = [];
              return;
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
            this.paginationPages = paginationPages;
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