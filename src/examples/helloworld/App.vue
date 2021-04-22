<template>
    <validate-host @validatechanged="isAllValidated = $event">
        <template #default="{ validatehost }">
            <div class="container">
                Select&nbsp;
                <button-state
                    @clicked="theme = `bootstrap`"
                    title="Bootstrap Theme">
                    <template #default="{ context }">
                        <bootstrap-button-view
                            appearance="primary"
                            :context="context"
                        />
                    </template>
                </button-state>
                &nbsp;or&nbsp;
                <button-state
                    @clicked="theme = `material`"
                    title="Material Theme">
                    <template #default="{ context }">
                        <bootstrap-button-view
                            appearance="primary"
                            :context="context"
                        />
                    </template>
                </button-state>
            </div>
            <buttons-demo :theme="theme"></buttons-demo>
            <check-box-demo
                :theme="theme"
                :validate-host="validatehost"
                :validators="checkBoxValidators">
            </check-box-demo>
            <check-box-tri-state-demo 
                :theme="theme"
                :validate-host="validatehost"
                :validators="checkBoxValidators">
            </check-box-tri-state-demo>
            <list-box-demo
                :theme="theme">
            </list-box-demo>
            <drop-down-demo
                :validate-host="validatehost"
                :validators="dropdownValidators">
            </drop-down-demo>
            <text-box-demo
                :theme="theme"
                :validate-host="validatehost"
                :validators="checkBoxValidators">
            </text-box-demo>
            <text-area-demo
                :theme="theme"
                :validate-host="validatehost"
                :validators="checkBoxValidators">
            </text-area-demo>
            <number-box-demo
                :theme="theme"
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
            <modal-dialog-demo>
            </modal-dialog-demo>
        </template>
    </validate-host>
</template>

<script>
export default async function () {
    //load bootstrap styles
    require.resolveStyles(`https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css`);
    //load material styles
    require.resolveStyles(`https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css`);
    //load fontawesome fonts
    require.resolveStyles(`https://use.fontawesome.com/releases/v5.0.13/css/all.css`);
    //load script and map to alias `boostrap` after it you can use - const bootstrap = await require.loadScript(`boostrap`);
    await require.loadScript(`https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js`, `boostrap`);

    await globalComponent(`../../states/ButtonState.vue`);
    await globalComponent(`../../views/bootstrap/BootstrapButtonView.vue`);
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
    const ModalDialogDemo = await remoteComponent(`ModalDialogDemo.vue`);    

    return {
        name: `Boot`,
        data() {
            return {
                checkBoxValidators: this.getCheckBoxValidators(),
                dropdownValidators: this.getDropdownValidators(),
                isAllValidated: false,
                theme: `bootstrap`
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
            DragAndDropDemo,
            ModalDialogDemo
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