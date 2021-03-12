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
                <list-box-state 
                    v-model="selectedItem"
                    :options="listItems"
                    @selected="listItemSelected($event)">
                    <template #default="{ context }">
                        <list-box-view :context="context">
                            <template #content="{ item }">
                                {{item.title}}
                            </template>
                        </list-box-view>
                    </template>
                </list-box-state>
            </div>
            <div class="stack">
                <h3>Material</h3>
                <list-box-state class="full-width "
                    v-model="selectedItem"
                    :options="listItems"
                    @selected="listItemSelected($event)">
                    <template #default="{ context }">
                        <list-box-material :context="context">
                            <template #content="{ item }">
                                <div>{{item.title}}</div>
                            </template>
                        </list-box-material>
                    </template>
                </list-box-state>
            </div>
            {{selectedItem}}
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
            selectedItem: []
        }
    },
    methods: {
        test() {
            alert(`Yahooo!!!`);
        },

        listItemSelected($event) {
            console.log($event);
        }
    },
    components: {
        'ButtonState': `remote:../../states/ButtonState.vue`,
        'ButtonView': `remote:../../views/bootstrap/ButtonView.vue`,
        'CheckBoxState': `remote:../../states/CheckBoxState.vue`,
        'CheckBoxView': `remote:../../views/bootstrap/CheckBoxView.vue`,
        'ListBoxState': `remote:../../states/ListBoxState.vue`,
        'ListBoxView': `remote:../../views/bootstrap/ListBoxView.vue`,
        'ListBoxItemState': `remote:../../states/ListBoxItemState.vue`,
        'ListBoxView': `remote:../../views/bootstrap/ListBoxView.vue`,
        'ListBoxMaterial': `remote:../../views/material/ListBoxView.vue`,
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