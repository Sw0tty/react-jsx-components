import BaseMethods from "../demoComponents/BaseMethods.jsx";
import TextBox from '../lib/src/TextBox/TextBox.jsx';
import Playground from "../demoComponents/Playground";
import CheckBox from '../lib/src/CheckBox/CheckBox.jsx';
import Switcher from "../lib/src/Switcher/Switcher.jsx";
import ComboBox from "../lib/src/ComboBox/ComboBox.jsx";


class TextBoxPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            caption: 'Test caption',
            required: true,
            width: 200,
            maxLength: 255,
            invalidData: false,
            disabled: false,
            value: "Some value",
            placeholder: "Input something",
            inputIconReverse: false,
            invalid: false,
            inputType: undefined
        }
    }
    render() {
        return (
            <Playground title="TextBox"
                pComponent={
                    <TextBox inputType={this.state.inputType} invalid={this.state.invalid} inputIconPath="./icons/Warning" inputIconReverse={this.state.inputIconReverse} required={this.state.required} caption={this.state.caption} width={this.state.width} maxLength={this.state.maxLength} placeholder={this.state.placeholder} invalidData={false} onReturnData={{ func: this.setData, params: { settledParamName: "address" } }} disabled={this.state.disabled} />
                }
                componentProps={<>
                    <TextBox required={false} caption="Caption :" value={this.state.caption} width={200} maxLength={255} invalidData={false} onReturnData={{ func: this.setData, params: { propName: "caption" } }} disabled={false} />
                    <TextBox required={false} caption="Placeholder :" value={this.state.placeholder} width={200} maxLength={255} invalidData={false} onReturnData={{ func: this.setData, params: { propName: "placeholder" } }} disabled={false} />
                    <TextBox required={false} caption="Width :" inputType="number" value={this.state.width} width={200} maxLength={255} invalidData={false} onReturnData={{ func: this.setData, params: { propName: "width" } }} disabled={false} />
                    <TextBox required={false} caption="MaxLength :" inputType="number" value={this.state.maxLength} width={200} maxLength={255} invalidData={false} onReturnData={{ func: this.setData, params: { propName: "maxLength" } }} disabled={false} />
                    <Switcher caption="Disabled :" disabled={false} onReturnData={{ func: this.setData, params: { propName: "disabled" } }} />
                    <Switcher caption="Required :" disabled={false} value={this.state.required} onReturnData={{ func: this.setData, params: { propName: "required" } }} />
                    <Switcher caption="Invalid :" disabled={false} value={this.state.invalid} onReturnData={{ func: this.setData, params: { propName: "invalid" } }} />
                    <Switcher caption="InputIconReverse :" disabled={false} value={this.state.inputIconReverse} onReturnData={{ func: this.setData, params: { propName: "inputIconReverse" } }} />
                    <ComboBox caption="Input type :" disabled={false} required={false} width={200} valueKey="dataType" captionKey="dataType" items={[{ dataType: "number" }, { dataType: "date" }]} onReturnData={{ func: this.setData, params: { propName: "inputType" } }} />
                </>}
                componentDocumentation={[
                    {name: "disabled", required: true, dataType: "bool", description: "Deactivate actions for user."},
                    {name: "required", required: true, dataType: "bool", description: "Component is required state."},
                    {name: "value", required: false, dataType: "string", description: "Default value of state on first render."},
                    {name: "width", required: true, dataType: "number", description: "Sets the width of input in px."},
                    {name: "caption", required: false, dataType: "string", description: "Sets the caption by left side of input."},
                    {name: "maxLength", required: true, dataType: "number", description: "Sets the max length of value in input."},
                    {name: "placeholder", required: false, dataType: "string", description: "Sets the caption inside of input."},
                    {name: "invalid", required: false, dataType: "bool", description: "Sets the invalid state for input data."},
                    {name: "inputIconReverse", required: false, dataType: "bool", description: "Revers the icon from right on left side."},
                    {name: "inputIconPath", required: false, dataType: "bool", description: "Path to icon with name. Required only svg extension."},
                    {name: "onReturnData", required: false, dataType: "Object", description: "Object type of: { func: callbackFunc, params: { } } The callback function in the first argument returns the state values of the component. And seconds Object of passed params."}
                ]}
                example={`<TextBox ${this.state?.inputType ? `inputType={${this.state.inputType}}` : ''} invalid={${this.state.invalid}} inputIconPath="./icons/Warning" inputIconReverse={${this.state.inputIconReverse}} required={${this.state.required}} ${this.state?.caption ? `caption="${this.state.caption}"` : ''} width={${this.state.width}} maxLength={${this.state.maxLength}} ${this.state?.placeholder ? `placeholder="${this.state.placeholder}"` : ''} invalid={${this.state.invalid}} onReturnData={{ func: this.setAddress, params: { settledParamName: "address" } }} disabled={${this.state.disabled}} />`}
            />
        );
    }
}

export default TextBoxPage;