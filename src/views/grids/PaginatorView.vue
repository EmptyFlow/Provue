<template @core>
    <div class="paginator">
        <div
            v-for="(displayPage, index) in displayPages"
            :key="index"
            class="page-item">
            <slot name="pageitem" :page="displayPage">
                <div v-if="context.currentPage === displayPage" class="selected">
                    <span>{{ displayPage }}</span>
                </div>
                <div v-else @click="$emit('changepage', displayPage)"> 
                    <span
                        class="clickable-text">
                        {{ displayPage }}
                    </span>
                </div>
            </slot>
        </div>
    </div>
</template>

<script>
export default {
    name: `PaginatorView`,
    props: {
        context: {
			type: Object,
			required: true
		}
    },
    data() {
        return {
            displayPages: []
        }
    },
    mounted() {
        this.refresh();
    },
    methods: {
        refresh() {
            this.displayPages = this.context.getPaginationPages();
        }
    }
}
</script>

<style>
.paginator {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.page-item {
    display: flex;
    justify-content: center;
    align-items: center;
    border-width: 1px;
    border-radius: 2px;
    border-style: solid;
    border-color: rgb(186, 191, 199);
    margin-right: 2px;
}
.page-item > div {
    padding: 8px;
}
.selected {
    background-color: rgb(252, 252, 252);
}
.clickable-text {
    color: blue;
    text-decoration: underline;
    cursor: pointer;
}
</style>