<template>
  <div class="simple-table-container">
    <div class="grid-view-toolbar">
      <div></div>
      <div>
        <input
          type="text"
          class="text-control"
          v-model="searchValue"
          @input="searchValueChanged($event)"
        />
      </div>
    </div>
    <table-view
      ref="tableView"
      :context="context"
      :theme-cell="tableViewThemeCell">
      <div
        class="column-head" 
        slot="columnhead"
        slot-scope="{ column }"
        @click="toggleSorting(column.field)">
        <span>{{ column.title }}</span>
        <div v-if="context.sortingFields[column.field]">
          <span v-if="context.sortingFields[column.field].descending">&#8593;</span>
          <span v-else>&#8595;</span>
        </div>
      </div>      
      <!-- Reassign slots for external components -->
      <template
        v-for="column in context.columnsWithSlots"
        :slot="column.slot"
        slot-scope="{ item }">
        <slot
          :name="column.slot"
          :item="item">
        </slot>
      </template>
      <!-- Special slot for group header -->
      <template
        slot="groupslot"
        slot-scope="{ item }">
        <slot
          name="groupslot"
          :item="item">
        </slot>
      </template>
    </table-view>
    <div class="bottomtable">
      <span>Page size </span>
      <div class="pagesize">
        <select v-model="context.innerSelectedPageSize" @change="pageLoaded()">
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
        :context="context"
        @changepage="context.loadPage(context.pageFormatter($event))"
      />
    </div>
  </div>
</template>

<script>
export default {
    name: `ClassicGridView`,
    props: {
        context: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            searchValue: ``,
            tableViewThemeCell: {
                fillCellStyle: this.fillCellStyle
            }
        }
    },
    mounted() {
        this.context.setHandler(`pageLoaded`, this.pageLoaded);
    },
    methods: {
        pageLoaded() {
			this.$refs.paginator.refresh();
        },
        fillCellStyle(cell, theme, styles) {
            if (!this.$refs.tableView) return {};

            const cellStyles = this.$refs.tableView.fillCellStyle(cell, theme, styles);
            if (cell.isGroup) {
                styles['grid-column'] = `1/-1`;
                styles['border-right-color'] = `rgb(186, 191, 199)`;
                styles['border-width'] = `0px 1px 1px 1px`;
                styles['padding'] = `4px`;
            }

            return cellStyles;
        },
        searchValueChanged() {
            this.$emit(`searchvaluechanged`, this.searchValue);
        },
        toggleSorting(columnField) {
            this.context.toggleSorting(columnField);
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
  widows: 100%;
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
  user-select: none;
}
.column-head > *:first-child {
  flex: 1;
}
.column-cell {
  display: flex;
  align-items: center;
  padding: 18px;
}
.grid-view-toolbar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.text-control {
  margin: 2px 0px;
  font-size: 15px;
  padding: 6px 4px;
  border-color: lightgray;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
}
.text-control:focus {
  outline: none;
  border-color: lightblue;
  border-width: 2px;
}
</style>