import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import CheckBox from "../lib/src/CheckBox/CheckBox.jsx";
import Switcher from "../lib/src/Switcher/Switcher.jsx";
import InputText from "../lib/src/InputText/InputText.jsx";


class CheckBoxPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            caption: "Test caption :",
            disabled: false
        }
    }
    render() {
        return(<Playground title="CheckBox"
                pComponent={<CheckBox disabled={this.state.disabled} caption={this.state.caption} />}
                componentProps={<>
                    <InputText caption="Caption :" value={this.state.caption} width={200} disabled={false} required={false} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "caption" } }} />
                    <Switcher caption="Disabled :" disabled={false} onReturnData={{ func: this.setData, params: { propName: "disabled" } }} />
                </>}
                componentDocumentation={[
                    {name: "caption", required: false, dataType: "string", description: "Caption by left side of component."},
                    {name: "value", required: false, dataType: "bool", description: "Default component value."},
                    {name: "disabled", required: true, dataType: "bool", description: "Component availability state."},
                    {name: "onReturnData", required: false, dataType: "Object", description: "Object type of: { func: callbackFunc, params: { } }"},
                ]}
            />);
    }
}

export default CheckBoxPage;