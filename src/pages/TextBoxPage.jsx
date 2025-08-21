import BaseMethods from "../demoComponents/BaseMethods.jsx";
import TextBox from '../lib/src/TextBox/TextBox.jsx';
import Playground from "../demoComponents/Playground";
import Switcher from "../lib/src/Switcher/Switcher.jsx";
import ComboBox from "../lib/src/ComboBox/ComboBox.jsx";
import ColorPicker from "../lib/src/ColorPicker/ColorPicker.jsx";


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
            inputType: undefined,
            borderColorAction: undefined,
            shadowColorAction: undefined
        }
    }
    render() {
        return (
            <Playground title="TextBox"
                pComponent={
                    <TextBox actionShadowColor={this.state.shadowColorAction} actionBorderColor={this.state.borderColorAction} inputType={this.state.inputType} invalid={this.state.invalid} inputIconPath="./icons/Warning" inputIconReverse={this.state.inputIconReverse} required={this.state.required} caption={this.state.caption} width={this.state.width} maxLength={this.state.maxLength} placeholder={this.state.placeholder} invalidData={false} onReturnData={{ func: this.setData, params: { settledParamName: "address" } }} disabled={this.state.disabled} />
                }
                componentProps={<>
                    <div style={{ display: "flex", flexDirection: "column", width: "max-content", alignItems: "end", rowGap: "5px" }}>
                        <TextBox caption="Caption :" value={this.state.caption} width={200} maxLength={255} invalidData={false} onReturnData={{ func: this.setData, params: { propName: "caption" } }} />
                        <TextBox caption="Placeholder :" value={this.state.placeholder} width={200} maxLength={255} invalidData={false} onReturnData={{ func: this.setData, params: { propName: "placeholder" } }} />
                        <TextBox caption="Width :" inputType="number" value={this.state.width} width={200} maxLength={255} invalidData={false} onReturnData={{ func: this.setData, params: { propName: "width" } }} />
                        <TextBox caption="MaxLength :" inputType="number" value={this.state.maxLength} width={200} maxLength={255} invalidData={false} onReturnData={{ func: this.setData, params: { propName: "maxLength" } }} />
                        <ComboBox caption="Input type :" required={false} width={200} valueKey="dataType" captionKey="dataType" items={[{ dataType: "number" }, { dataType: "date" }]} onReturnData={{ func: this.setData, params: { propName: "inputType" } }} />
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", columnGap: "25px", rowGap: "5px" }}>
                        <Switcher caption="Disabled :" onReturnData={{ func: this.setData, params: { propName: "disabled" } }} />
                        <Switcher caption="InputIconReverse :" value={this.state.inputIconReverse} onReturnData={{ func: this.setData, params: { propName: "inputIconReverse" } }} />
                        <Switcher caption="Required :" value={this.state.required} onReturnData={{ func: this.setData, params: { propName: "required" } }} />
                        <Switcher caption="Invalid :" value={this.state.invalid} onReturnData={{ func: this.setData, params: { propName: "invalid" } }} />
                    </div>
                    <ColorPicker caption="Border color action :" value={this.state.borderColorAction} onReturnData={{ func: this.setData, params: { propName: "borderColorAction" } }} />
                    <ColorPicker caption="Shadow color action :" value={this.state.shadowColorAction} onReturnData={{ func: this.setData, params: { propName: "shadowColorAction" } }} />
                </>}
                componentDocumentation={[
                    {name: "disabled", required: false, dataType: "boolean", description: "Deactivate actions for user. Default is 'false'."},
                    {name: "required", required: false, dataType: "boolean", description: "Component is required state. Default is 'false'."},
                    {name: "value", required: false, dataType: "string", description: "Default value of state on first render."},
                    {name: "width", required: true, dataType: "number", description: "Sets the width of input in px."},
                    {name: "caption", required: false, dataType: "string", description: "Sets the caption by left side of input."},
                    {name: "maxLength", required: true, dataType: "number", description: "Sets the max length of value in input."},
                    {name: "placeholder", required: false, dataType: "string", description: "Sets the caption inside of input."},
                    {name: "invalid", required: false, dataType: "boolean", description: "Sets the invalid state for input data."},
                    {name: "actionShadowColor", required: false, dataType: "string", description: "Color for shadow on action."},
                    {name: "actionBorderColor", required: false, dataType: "string", description: "Color for border on action."},
                    {name: "inputIconReverse", required: false, dataType: "boolean", description: "Revers the icon from right on left side."},
                    {name: "inputIconPath", required: false, dataType: "boolean", description: "Path to icon with name. Required only svg extension."},
                    {name: "lastUpdate", required: false, dataType: "Date", description: "Used for check prop value and state value of component. And if not equal state value will be change on prop value. For value of this props can be any on data type, but recommended use Date type."},
                    {name: "onReturnData", required: false, dataType: "CallbackObject", description: "Object type of: { func: callbackFunc, params: { } }. The callback arrow function in 'func' key will be return in  the first argument the component state and in the second passed params."}
                ]}
                example={`<TextBox ${this.state?.inputType ? `inputType={${this.state.inputType}}` : ''} invalid={${this.state.invalid}} inputIconPath="./icons/Warning" inputIconReverse={${this.state.inputIconReverse}} required={${this.state.required}} ${this.state?.caption ? `caption="${this.state.caption}"` : ''} width={${this.state.width}} maxLength={${this.state.maxLength}} ${this.state?.placeholder ? `placeholder="${this.state.placeholder}"` : ''} invalid={${this.state.invalid}} onReturnData={{ func: this.setAddress, params: { settledParamName: "address" } }} disabled={${this.state.disabled}} />`}
            />
        );
    }
}

export default TextBoxPage;