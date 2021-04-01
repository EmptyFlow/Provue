<template>
    <validate-host @validatechanged="isAllValidated = $event">
        <template #default="{ validatehost }">
            <buttons-demo></buttons-demo>
            <check-box-demo
                :validate-host="validatehost"
                :validators="checkBoxValidators">
            </check-box-demo>
            <div class="container">
                <check-box-tri-state
                    v-model="check2"
                    title="CheckboxTriState"
                    :validators="checkBoxValidators"
                    :validate-host="validatehost">
                    <template #default="{ context }">
                        <check-box-tri-view :context="context" />
                    </template>
                </check-box-tri-state>
                <span v-if="check2"> checked!!!!</span>
                <span v-if="check2 === false"> not checked!!!!</span>
                <span v-if="check2 === null"> not defined!!!!</span>
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
                {{selectedSingleItem}}
                <dropdown-state class="full-width dropup"
                    v-model="selectedSingleItem"
                    :options="listItems"
                    @selected="listItemSelected($event)"
                    :validators="dropdownValidators" 
                    :validate-host="validatehost">
                    <template #default="{ context }">
                        <dropdown-view :context="context">
                            <template #content="{ item }">
                                <div>{{item.title}}</div>
                            </template>
                        </dropdown-view>
                    </template>
                </dropdown-state>
                {{selectedItems}}
                <dropdown-state class="full-width"
                    v-model="selectedItems"
                    :options="listItems"
                    multiple
                    @selected="listItemSelected($event)">
                    <template #default="{ context }">
                        <dropdown-view :context="context">
                            <template #content="{ item }">
                                <div>{{item.title}}</div>
                            </template>
                        </dropdown-view>
                    </template>
                </dropdown-state>
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
                <text-area-state
                    v-model="multiTextValue"
                    placeholder="Type multi text"
                    :count-lines="10"
                    :line-width="80"
                    :validators="checkBoxValidators"
                    :validate-host="validatehost">
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
            <font-awesome-demo></font-awesome-demo>
            <div class="container">
                <radio-button-demo
                    :validate-host="validatehost"
                    :validators="checkBoxValidators">
                </radio-button-demo>
            </div>
            <div class="container">
                <slider-demo>
                </slider-demo>
            </div>
            <progress-demo>
            </progress-demo>
            <div class="container">
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
require.resolveStyles(`https://use.fontawesome.com/releases/v5.0.13/css/all.css`);

export default async function () {    
    const SliderDemo = await remoteComponent(`SliderDemo.vue`);
    const RadioButtonDemo = await remoteComponent(`RadioButtonDemo.vue`);
    const FontAwesomeDemo = await remoteComponent(`FontAwesomeDemo.vue`);
    const ButtonsDemo = await remoteComponent(`ButtonsDemo.vue`);
    const CheckBoxDemo = await remoteComponent(`CheckBoxDemo.vue`);
    const ProgressDemo = await remoteComponent(`ProgressDemo.vue`);

    return {
        name: `Boot`,
        data() {
            return {
                text: `Muherka`,                
                check2: null,
                textValue: ``,
                multiTextValue: `argyus`,
                checkBoxValidators: this.getCheckBoxValidators(),
                dropdownValidators: this.getDropdownValidators(),
                listItems: [{id: 1, title: `test 1`}, {id: 2, title: `test 2`}, {id: 3, title: `test 3`}],
                selectedItem: [],
                selectedSingleItem: null,
                selectedItems: [],
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
            },
            getDropdownValidators() {
                return {
                    'isNotSelected': {
                        check(value) {
                        if (!value || !value.length) {
                            this.messages = ['Value is not selected!!'];
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
            ButtonsDemo,
            CheckBoxDemo,
            'ListBoxState': `remote:../../states/ListBoxState.vue`,
            'ListBoxView': `remote:../../views/bootstrap/ListBoxView.vue`,
            'ListBoxItemState': `remote:../../states/ListBoxItemState.vue`,
            'ListBoxView': `remote:../../views/bootstrap/ListBoxView.vue`,
            'ListBoxMaterial': `remote:../../views/material/ListBoxView.vue`,
            'TextBoxState': `remote:../../states/TextBoxState.vue`,
            'TextBoxView': `remote:../../views/bootstrap/TextBoxView.vue`,
            'TextAreaState': `remote:../../states/TextAreaState.vue`,
            'TextAreaView': `remote:../../views/bootstrap/TextAreaView.vue`,
            'DropdownState': `remote:../../states/DropdownState.vue`,
            'DropdownView': `remote:../../views/bootstrap/DropdownView.vue`,
            'ValidateHost': `remote:../../states/ValidateHost.vue`,
            'NumberBox': `remote:../../states/NumberBoxState.vue`,
            'NumberBoxView': `remote:../../views/bootstrap/NumberBoxView.vue`,
            'CheckBoxTriView': `remote:../../views/bootstrap/CheckBoxTriView.vue`,
            'CheckBoxTriState': `remote:../../states/CheckBoxTriState.vue`,
            FontAwesomeDemo,
            RadioButtonDemo,
            SliderDemo,
            ProgressDemo
        }
    }
}
</script>

<style>
.container {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 40px;
    min-width: 100px;
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