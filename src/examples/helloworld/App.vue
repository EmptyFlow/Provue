<template>
    <validate-host @validatechanged="isAllValidated = $event">
        <template #default="{ validatehost }">
            <buttons-demo></buttons-demo>
            <check-box-demo
                :validate-host="validatehost"
                :validators="checkBoxValidators">
            </check-box-demo>
            <check-box-tri-state-demo
                :validate-host="validatehost"
                :validators="checkBoxValidators">
            </check-box-tri-state-demo>
            <list-box-demo>
            </list-box-demo>
            <drop-down-demo
                :validate-host="validatehost"
                :validators="dropdownValidators">
            </drop-down-demo>
            <div class="container">
                <text-box-state v-model="textValue" placeholder="Type text" :validators="checkBoxValidators" :validate-host="validatehost">
                    <template #default="{ context }">
                        <text-box-view :context="context" />
                    </template>
                </text-box-state>
                <span> {{ textValue }}</span>
            </div>
            <text-area-demo
                :validate-host="validatehost"
                :validators="checkBoxValidators">
            </text-area-demo>
            <number-box-demo
                :validate-host="validatehost"
                :validators="checkBoxValidators">
            </number-box-demo>
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
    const CheckBoxTriStateDemo = await remoteComponent(`CheckBoxTriStateDemo.vue`);
    const NumberBoxDemo = await remoteComponent(`NumberBoxDemo.vue`);
    const TextAreaDemo = await remoteComponent(`TextAreaDemo.vue`);
    const DropDownDemo = await remoteComponent(`DropDownDemo.vue`);
    const ListBoxDemo = await remoteComponent(`ListBoxDemo.vue`);
    const ValidateHost = await remoteComponent(`../../states/ValidateHost.vue`);

    return {
        name: `Boot`,
        data() {
            return {
                text: `Muherka`,                
                textValue: ``,
                checkBoxValidators: this.getCheckBoxValidators(),
                dropdownValidators: this.getDropdownValidators(),
                isAllValidated: false
            }
        },
        methods: {
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
            CheckBoxTriStateDemo,
            ListBoxDemo,
            'TextBoxState': `remote:../../states/TextBoxState.vue`,
            'TextBoxView': `remote:../../views/bootstrap/TextBoxView.vue`,
            TextAreaDemo,
            DropDownDemo,
            ValidateHost,
            NumberBoxDemo,
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
.full-width {
    width: 100%;
}
</style>