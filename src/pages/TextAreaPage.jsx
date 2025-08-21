import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import TextArea from "../lib/src/TextArea/TextArea.jsx";
import TextBox from "../lib/src/TextBox/TextBox.jsx";
import Switcher from "../lib/src/Switcher/Switcher.jsx";
import ColorPicker from "../lib/src/ColorPicker/ColorPicker.jsx";


class TextAreaPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            caption: "Test caption :",
            required: true,
            disabled: false,
            readOnly: false,
            invalid: false,
            defaultHeight: 30,
            maxHeight: 200,
            width: "250px",
            borderColorAction: undefined,
            shadowColorAction: undefined
        }
    }
    render() {
        return(<Playground title="TextArea"
                pComponentStyle={{ alignItems: "baseline" }}
                pComponent={<TextArea actionShadowColor={this.state.shadowColorAction} actionBorderColor={this.state.borderColorAction} caption={this.state.caption} required={this.state.required} disabled={this.state.disabled} width={this.state.width} maxHeight={this.state.maxHeight} defaultHeight={this.state.defaultHeight} readOnly={this.state.readOnly} invalid={this.state.invalid} />}
                componentProps={<>
                    <TextBox caption="Caption :" value={this.state.caption} width={200} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "caption" } }} />
                    <TextBox caption="DefaultHeight :" inputType="number" value={this.state.defaultHeight} width={200} maxLength={3} onReturnData={{ func: this.setData, params: { propName: "defaultHeight" } }} />
                    <TextBox caption="MaxHeight :" inputType="number" value={this.state.maxHeight} width={200} maxLength={3} onReturnData={{ func: this.setData, params: { propName: "maxHeight" } }} />
                    <TextBox caption="Width :" value={this.state.width} width={200} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "width" } }} />
                    <Switcher caption="Required :" value={this.state.required} onReturnData={{ func: this.setData, params: { propName: "required" } }} />
                    <Switcher caption="Disabled :" value={this.state.disabled} onReturnData={{ func: this.setData, params: { propName: "disabled" } }} />
                    <Switcher caption="Read only :" value={this.state.readOnly} onReturnData={{ func: this.setData, params: { propName: "readOnly" } }} />
                    <Switcher caption="Invalid :" value={this.state.invalid} onReturnData={{ func: this.setData, params: { propName: "invalid" } }} />
                    <ColorPicker caption="Border color action :" value={this.state.borderColorAction} onReturnData={{ func: this.setData, params: { propName: "borderColorAction" } }} />
                    <ColorPicker caption="Shadow color action :" value={this.state.shadowColorAction} onReturnData={{ func: this.setData, params: { propName: "shadowColorAction" } }} />
                </>}
                componentDocumentation={[
                    {name: "caption", required: false, dataType: "string", description: "Sets the caption by left side of input."},
                    {name: "disabled", required: false, dataType: "boolean", description: "Deactivate actions for user. Default is 'false'."},
                    {name: "required", required: false, dataType: "boolean", description: "Component is required state. Default is 'false'."},
                    {name: "defaultHeight", required: true, dataType: "number", description: "Default height of component."},
                    {name: "maxHeight", required: true, dataType: "number", description: "Max height on resize."},
                    {name: "width", required: true, dataType: "string", description: "Width in CSS style."},
                    {name: "value", required: false, dataType: "string", description: "Default value of component."},
                    {name: "invalid", required: false, dataType: "boolean", description: "Sets the invalid state for input data."},
                    {name: "readOnly", required: false, dataType: "boolean", description: "Sets the read only state on textarea."},
                    {name: "actionShadowColor", required: false, dataType: "string", description: "Color for shadow on action."},
                    {name: "actionBorderColor", required: false, dataType: "string", description: "Color for border on action."},
                    {name: "lastUpdate", required: false, dataType: "Date", description: "Used for check prop value and state value of component. And if not equal state value will be change on prop value. For value of this props can be any on data type, but recommended use Date type."},
                    {name: "onReturnData", required: false, dataType: "CallbackObject", description: "Object type of: { func: callbackFunc, params: { } }. The callback arrow function in 'func' key will be return in  the first argument the component state and in the second passed params."},
                ]}
            />);
    }
}

export default TextAreaPage;