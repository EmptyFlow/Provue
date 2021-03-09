<template>
   <div>
       <div class="container">
            <button-state @clicked="test()" title="Primary">
                <template #default="{ context }">
                    <button-view :context="context" />
                </template>
            </button-state>
            <button-state @clicked="test()" title="Secondary">
                <template #default="{ context }">
                    <button-view :context="context" appearance="secondary" />
                </template>
            </button-state>
            <button-state @clicked="test()" title="Success">
                <template #default="{ context }">
                    <button-view :context="context" appearance="success" />
                </template>
            </button-state>
            <button-state @clicked="test()" title="Danger">
                <template #default="{ context }">
                    <button-view :context="context" appearance="danger" />
                </template>
            </button-state>
            <button-state @clicked="test()" title="Warning">
                <template #default="{ context }">
                    <button-view :context="context" appearance="warning" />
                </template>
            </button-state>
            <button-state @clicked="test()" title="Light">
                <template #default="{ context }">
                    <button-view :context="context" appearance="light" />
                </template>
            </button-state>
            <button-state @clicked="test()" title="Dark">
                <template #default="{ context }">
                    <button-view :context="context" appearance="dark" />
                </template>
            </button-state>
            <button-state @clicked="test()" title="Link">
                <template #default="{ context }">
                    <button-view :context="context" appearance="link" />
                </template>
            </button-state>
        </div>
        <div class="container">
            <check-box-state v-model="check1" title="Checkbox">
                <template #default="{ context }">
                    <check-box-view :context="context" />
                </template>
            </check-box-state>
            <span v-if="check1"> checked!!!!</span>
            <span v-if="!check1"> not checked!!!!</span>
        </div>
        <div class="container">
            <div class="stack">
                <h3>Bootstrap</h3>
                <list-group-state v-model="listItems"
                    :active-handler="listActiveItem"
                    @clicked="listItemClicked($event)">
                    <template #default="{ context }">
                        <list-group-view :context="context">
                            <template #content="{ item }">
                                {{item}}
                            </template>
                        </list-group-view>
                    </template>
                </list-group-state>
            </div>
            <div class="stack">
                <h3>Material</h3>
                <list-group-state class="full-width "
                    v-model="listItems"
                    :active-handler="listActiveItem"
                    @clicked="listItemClicked($event)">
                    <template #default="{ context }">
                        <list-group-material :context="context">
                            <template #content="{ item }">
                                <div>{{item}}</div>
                            </template>
                        </list-group-material>
                    </template>
                </list-group-state>
            </div>
        </div>
    </div>
</template>

<script>
//load bootstrap styles
require.resolveStyles(`https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css`);
require.resolveStyles(`https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css`);

module.exports = {  
    name: `Boot`,
    data() {
        return {
            text: `Muherka`,
            check1: true,
            listItems: [{id: 1, title: `test 1`}, {id: 2, title: `test 2`}, {id: 3, title: `test 3`}],
            selectedItemId: null
        }
    },
    methods: {
        test() {
            alert(`Yahooo!!!`);
        },
        listActiveItem(item) {
            return item && item.id === this.selectedItemId;
        },
        listItemClicked($event) {
            if($event && $event.id) this.selectedItemId = $event.id
        }
    },
    components: {
        'ButtonState': `remote:../../states/ButtonState.vue`,
        'ButtonView': `remote:../../views/bootstrap/ButtonView.vue`,
        'CheckBoxState': `remote:../../states/CheckBoxState.vue`,
        'CheckBoxView': `remote:../../views/bootstrap/CheckBoxView.vue`,
        'ListGroupState': `remote:../../states/ListGroupState.vue`,
        'ListGroupView': `remote:../../views/bootstrap/ListGroupView.vue`,
        'ListGroupItemState': `remote:../../states/ListGroupItemState.vue`,
        'ListGroupView': `remote:../../views/bootstrap/ListGroupView.vue`,
        'ListGroupMaterial': `remote:../../views/material/ListGroupView.vue`,
    }
}
</script>

<style>
.container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 40px;
}
.container > * {
    margin-left: 5px;;
}
.stack {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 400px;
}
.full-width {
    width: 100%;
}
</style>