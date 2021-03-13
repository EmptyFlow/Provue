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
            <check-box-state v-model="check1" title="Checkbox" :validators="checkBoxValidators">
                <template #default="{ context }">
                    <check-box-view :context="context" />
                </template>
            </check-box-state>
            <span v-if="check1"> checked!!!!</span>
            <span v-if="!check1"> not checked!!!!</span>
        </div>
        <div class="container">
            <text-box-state v-model="textValue" placeholder="Type text">
                <template #default="{ context }">
                    <text-box-view :context="context" />
                </template>
            </text-box-state>
            <span> {{ textValue }}</span>
        </div>
        <div class="container">
            <text-area-state v-model="multiTextValue" placeholder="Type multi text" :count-lines="10" :line-width="80">
                <template #default="{ context }">
                    <text-area-view :context="context" />
                </template>
            </text-area-state>
            <span> {{ multiTextValue }}</span>
        </div>
    </div>
</template>

<script>
//load bootstrap styles
require.resolveStyles(`https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css`);

module.exports = {  
    name: `Boot`,
    data() {
        return {
            text: `Muherka`,
            check1: false,
            textValue: ``,
            multiTextValue: `argyus`,
            checkBoxValidators: this.getCheckBoxValidators()
        }
    },
    methods: {
        test() {
            alert(`Yahooo!!!`);
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
        'TextBoxState': `remote:../../states/TextBoxState.vue`,
        'TextBoxView': `remote:../../views/bootstrap/TextBoxView.vue`,
        'TextAreaState': `remote:../../states/TextAreaState.vue`,
        'TextAreaView': `remote:../../views/bootstrap/TextAreaView.vue`,
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
</style>