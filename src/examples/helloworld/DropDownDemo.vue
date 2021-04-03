<template>
    <div class="container">
        <span>{{ selectedSingleItem }}</span>
        <dropdown-state class="full-width dropup"
            v-model="selectedSingleItem"
            :options="listItems"
            @selected="listItemSelected($event)"
            :validators="validators" 
            :validate-host="validateHost">
            <template #default="{ context }">
                <bootstrap-dropdown-view :context="context">
                    <template #content="{ item }">
                        <div>{{ item.title }}</div>
                    </template>
                </bootstrap-dropdown-view>
            </template>
        </dropdown-state>
        <span>{{ selectedItems }}</span>
        <dropdown-state class="full-width"
            v-model="selectedItems"
            :options="listItems"
            multiple
            @selected="listItemSelected($event)">
            <template #default="{ context }">
                <bootstrap-dropdown-view :context="context">
                    <template #content="{ item }">
                        <div>{{ item.title }}</div>
                    </template>
                </bootstrap-dropdown-view>
            </template>
        </dropdown-state>
    </div>
</template>

<script>
export default async function() {
    await globalComponent(`../../states/DropdownState.vue`);
    await globalComponent(`../../views/bootstrap/BootstrapDropdownView.vue`);

    return {
        name: `DropDownDemo`,
        props: {
            validateHost: {
                type: Object,
                required: true
            },
            validators: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                selectedSingleItem: null,
                selectedItems: [],
                listItems: [{id: 1, title: `test 1`}, {id: 2, title: `test 2`}, {id: 3, title: `test 3`}]
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