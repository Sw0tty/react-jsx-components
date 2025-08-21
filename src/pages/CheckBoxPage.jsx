import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import CheckBox from "../lib/src/CheckBox/CheckBox.jsx";
import Switcher from "../lib/src/Switcher/Switcher.jsx";
import TextBox from "../lib/src/TextBox/TextBox.jsx";
import ColorPicker from "../lib/src/ColorPicker/ColorPicker.jsx";


class CheckBoxPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            caption: "Test caption :",
            disabled: false,
            checkColor: undefined,
            borderColorAction: undefined,
            shadowColorAction: undefined
        }
    }
    render() {
        return(<Playground title="CheckBox"
                pComponent={<CheckBox checkColor={this.state.checkColor} actionShadowColor={this.state.shadowColorAction} actionBorderColor={this.state.borderColorAction} value={false} disabled={this.state.disabled} caption={this.state.caption} />}
                componentProps={<>
                    <TextBox caption="Caption :" value={this.state.caption} width={200} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "caption" } }} />
                    <Switcher caption="Disabled :" onReturnData={{ func: this.setData, params: { propName: "disabled" } }} />
                    <ColorPicker caption="Check color :" value={this.state.checkColor} onReturnData={{ func: this.setData, params: { propName: "checkColor" } }} />
                    <ColorPicker caption="Border color action :" value={this.state.borderColorAction} onReturnData={{ func: this.setData, params: { propName: "borderColorAction" } }} />
                    <ColorPicker caption="Shadow color action :" value={this.state.shadowColorAction} onReturnData={{ func: this.setData, params: { propName: "shadowColorAction" } }} />
                </>}
                componentDocumentation={[
                    {name: "caption", required: false, dataType: "string", description: "Caption by left side of component."},
                    {name: "value", required: false, dataType: "boolean", description: "Default component value."},
                    {name: "size", required: false, dataType: "number", description: "Size of check in px."},
                    {name: "disabled", required: false, dataType: "boolean", description: "Component availability state. Default is 'false'."},
                    {name: "checkColor", required: false, dataType: "string", description: "Color for check state."},
                    {name: "actionShadowColor", required: false, dataType: "string", description: "Color for shadow on action."},
                    {name: "actionBorderColor", required: false, dataType: "string", description: "Color for border on action."},
                    {name: "lastUpdate", required: false, dataType: "Date", description: "Used for check prop value and state value of component. And if not equal state value will be change on prop value. For value of this props can be any on data type, but recommended use Date type."},
                    {name: "onReturnData", required: false, dataType: "CallbackObject", description: "Object type of: { func: callbackFunc, params: { } }. The callback arrow function in 'func' key will be return in  the first argument the component state and in the second passed params."}
                ]}
                example={`<CheckBox disabled={${this.state.disabled}} value={false} caption="${this.state.caption}" onReturnData={{ func: this.setData, params: { type: "ttype" } }} />`}
            />);
    }
}

export default CheckBoxPage;