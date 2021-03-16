<template>
    <validate-host @validatechanged="isAllValidated = $event">
        <template #default="{ validatehost }">
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
                <check-box-state v-model="check1" title="Checkbox" :validators="checkBoxValidators" :validate-host="validatehost">
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
            </div>
            <div class="container">
                <text-box-state v-model="textValue" placeholder="Type text" :validators="checkBoxValidators" :validate-host="validatehost">
                    <template #default="{ context }">
                        <text-box-view :context="context" />
                    </template>
                </text-box-state>
                <span> {{ textValue }}</span>
            </div>
            <div class="container">
                <text-area-state v-model="multiTextValue" placeholder="Type multi text" :count-lines="10" :line-width="80" :validators="checkBoxValidators" :validate-host="validatehost">
                    <template #default="{ context }">
                        <text-area-view :context="context" />
                    </template>
                </text-area-state>
                <span> {{ multiTextValue }}</span>
            </div>
            <div class="container">
                <number-box
                    v-model="number"
                    placeholder="Type number"
                    :validators="checkBoxValidators"
                    :validate-host="validatehost"
                    :maximum="100">
                    <template #default="{ context }">
                        <number-box-view :context="context" />
                    </template>
                </number-box>
                <span>Actual number value is {{ number }}</span>
            </div>
            <div>
                <span v-if="isAllValidated">All validated!!!</span>
                <span v-else>Not valid!!!</span>
            </div>
        </template>
    </validate-host>
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
            check1: false,
            textValue: ``,
            multiTextValue: `argyus`,
            checkBoxValidators: this.getCheckBoxValidators(),
            listItems: [{id: 1, title: `test 1`}, {id: 2, title: `test 2`}, {id: 3, title: `test 3`}],
            selectedItem: [],
            isAllValidated: false,
            number: 0
        }
    },
    methods: {
        test() {
            alert(`Yahooo!!!`);
        },
        listItemSelected($event) {
            console.log($event);
        },
        getCheckBoxValidators() {
            return {
                'isNotCheck': {
                    check(value) {
                       if (!value) {
                           this.messages = ['Value is not checked!!'];
                           return false;
                       }

                       this.messages = [];
                       return true;
                    },
                    messages: []
                }
            }
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
        'TextBoxState': `remote:../../states/TextBoxState.vue`,
        'TextBoxView': `remote:../../views/bootstrap/TextBoxView.vue`,
        'TextAreaState': `remote:../../states/TextAreaState.vue`,
        'TextAreaView': `remote:../../views/bootstrap/TextAreaView.vue`,
        'ValidateHost': `remote:../../states/ValidateHost.vue`,
        'NumberBox': `remote:../../states/NumberBox.vue`,
        'NumberBoxView': `remote:../../views/bootstrap/NumberBoxView.vue`,
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