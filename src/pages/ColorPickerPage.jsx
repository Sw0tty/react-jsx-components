import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import ColorPicker from "../lib/src/ColorPicker/ColorPicker.jsx";
import Switcher from "../lib/src/Switcher/Switcher.jsx";
import TextBox from "../lib/src/TextBox/TextBox.jsx";


class ColorPickerPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            caption: "Test caption :",
            disabled: false,
            invalid: false
        }
    }
    render() {
        return(<Playground title="ColorPicker"
                pComponent={<ColorPicker caption={this.state.caption} disabled={this.state.disabled} invalid={this.state.invalid} />}
                componentProps={<>
                    <TextBox caption="Caption :" value={this.state.caption} width={200} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "caption" } }} />
                    <Switcher caption="Disabled :" value={this.state.disabled} onReturnData={{ func: this.setData, params: { propName: "disabled" } }} />
                    <Switcher caption="Invalid :" value={this.state.invalid} onReturnData={{ func: this.setData, params: { propName: "invalid" } }} />
                </>}
                componentDocumentation={[
                    {name: "caption", required: false, dataType: "string", description: "Caption by left side of component."},
                    {name: "value", required: false, dataType: "string", description: "Default component value."},
                    {name: "disabled", required: false, dataType: "boolean", description: "Component availability state. Default is 'false'."},
                    {name: "invalid", required: false, dataType: "boolean", description: "Sets the invalid state data. Default is 'false'."},
                    {name: "onReturnData", required: false, dataType: "Object", description: "Object type of: { func: callbackFunc, params: { } }"},
                ]}
                example={`<ColorPicker caption="${this.state.caption}" disabled={${this.state.disabled}} invalid={${this.state.invalid}} />`}
            />);
    }
}

export default ColorPickerPage;