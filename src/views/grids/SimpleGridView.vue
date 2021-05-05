<template @core>
    <div class="simple-table-container">
        <table-view
            ref="tableView"
            :context="context"
            @pageloaded="$refs.paginator.refresh()">
            <div
                class="column-head"
                slot="columnhead"
                slot-scope="{ column }">
                {{ column.title }}
            </div>
            <div
                class="column-cell"
                slot="commonpaddings"
                slot-scope="{ item }">
                {{ item.value }}
            </div>
        </table-view>
        <!-- <div class="bottomtable">
            <span>Page size </span>
            <div class="pagesize">
                <select v-model="context.innerSelectedPageSize">
                    <option
                        v-for="(item, index) in context.pageSizes"
                        :key="index"
                        :value="item">
                        {{ item }}
                    </option>
                </select>
            </div>
            <div class="separator"></div>
            <paginator-view
				ref="paginator"
                :displayPages="paginationPages"
                :context="context"
                @changepage="$refs.tableView.loadPage(context.pageFormatter($event))"
            />
        </div> -->
    </div>
</template>

<script>
export default {
	name: `SimpleGridView`,
  	props: {
		context: {
			type: Object,
			required: true
		}
	}
}
</script>

<style>
.simple-table-container {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	text-align: center;
	width: 500px;  
}
.separator {
	flex: 1;
}
.bottomtable {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 4px;
	border-style: solid;
	border-right-width: 1px;
	border-left-width: 1px;
	border-bottom-width: 1px;
	border-top-width: 0px;
	border-color: rgb(186, 191, 199);
	width: 100%;
}
.pagesize > * {
	width: 100%;
	margin-left: 8px;
}
.column-head {
	display: flex;
	align-items: center;
	padding: 18px;
	font-weight: bold;
}
.column-cell {
	display: flex;
	align-items: center;
	padding: 18px;
}
</style>