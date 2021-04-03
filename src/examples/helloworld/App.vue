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
            <text-box-demo
                :validate-host="validatehost"
                :validators="checkBoxValidators">

            </text-box-demo>
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
            <drag-and-drop-demo>                
            </drag-and-drop-demo>
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
    const TextBoxDemo = await remoteComponent(`TextBoxDemo.vue`);
    const DragAndDropDemo = await remoteComponent(`DragAndDropDemo.vue`);

    return {
        name: `Boot`,
        data() {
            return {
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
            TextBoxDemo,
            TextAreaDemo,
            DropDownDemo,
            ValidateHost,
            NumberBoxDemo,
            FontAwesomeDemo,
            RadioButtonDemo,
            SliderDemo,
            ProgressDemo,
            DragAndDropDemo
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