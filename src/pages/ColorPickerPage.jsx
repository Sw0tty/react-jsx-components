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
            disabled: false
        }
    }
    render() {
        return(<Playground title="ColorPicker"
                pComponent={<ColorPicker caption={this.state.caption} disabled={this.state.disabled} />}
                componentProps={<>
                    <TextBox caption="Caption :" value={this.state.caption} width={200} disabled={false} required={false} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "caption" } }} />
                    <Switcher caption="Disabled :" disabled={false} onReturnData={{ func: this.setData, params: { propName: "disabled" } }} />
                </>}
                componentDocumentation={[
                    {name: "caption", required: false, dataType: "string", description: "Caption by left side of component."},
                    {name: "value", required: false, dataType: "string", description: "Default component value."},
                    {name: "disabled", required: true, dataType: "bool", description: "Component availability state."},
                    {name: "onReturnData", required: false, dataType: "Object", description: "Object type of: { func: callbackFunc, params: { } }"},
                ]}
                example={`<ColorPicker caption="${this.state.caption}" disabled={${this.state.disabled}} />`}
            />);
    }
}

export default ColorPickerPage;