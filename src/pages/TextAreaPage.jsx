import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import TextArea from "../lib/src/TextArea/TextArea.jsx";
import TextBox from "../lib/src/TextBox/TextBox.jsx";
import Switcher from "../lib/src/Switcher/Switcher.jsx";


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
            width: "250px"
        }
    }
    render() {
        return(<Playground title="TextArea"
                pComponentStyle={{ alignItems: "baseline" }}
                pComponent={<TextArea caption={this.state.caption} required={this.state.required} disabled={this.state.disabled} width={this.state.width} maxHeight={this.state.maxHeight} defaultHeight={this.state.defaultHeight} readOnly={this.state.readOnly} invalid={this.state.invalid} />}
                componentProps={<>
                    <TextBox caption="Caption :" value={this.state.caption} width={200} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "caption" } }} />
                    <TextBox caption="DefaultHeight :" inputType="number" value={this.state.defaultHeight} width={200} maxLength={3} onReturnData={{ func: this.setData, params: { propName: "defaultHeight" } }} />
                    <TextBox caption="MaxHeight :" inputType="number" value={this.state.maxHeight} width={200} maxLength={3} onReturnData={{ func: this.setData, params: { propName: "maxHeight" } }} />
                    <TextBox caption="Width :" value={this.state.width} width={200} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "width" } }} />
                    <Switcher caption="Required :" value={this.state.required} onReturnData={{ func: this.setData, params: { propName: "required" } }} />
                    <Switcher caption="Disabled :" value={this.state.disabled} onReturnData={{ func: this.setData, params: { propName: "disabled" } }} />
                    <Switcher caption="Read only :" value={this.state.readOnly} onReturnData={{ func: this.setData, params: { propName: "readOnly" } }} />
                    <Switcher caption="Invalid :" value={this.state.invalid} onReturnData={{ func: this.setData, params: { propName: "invalid" } }} />
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
                    {name: "onReturnData", required: false, dataType: "CallbackObject", description: "Object type of: { func: callbackFunc, params: { } } The callback function in the first argument returns the state values of the component. And seconds Object of passed params."},
                ]}
            />);
    }
}

export default TextAreaPage;