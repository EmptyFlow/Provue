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
                getCount: localGetCount,
                getPageItem: localGetPageItems,
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