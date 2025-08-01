import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import CheckBox from "../lib/src/CheckBox/CheckBox.jsx";
import Switcher from "../lib/src/Switcher/Switcher.jsx";
import TextBox from "../lib/src/TextBox/TextBox.jsx";


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
                pComponent={<CheckBox value={false} disabled={this.state.disabled} caption={this.state.caption} />}
                componentProps={<>
                    <TextBox caption="Caption :" value={this.state.caption} width={200} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "caption" } }} />
                    <Switcher caption="Disabled :" onReturnData={{ func: this.setData, params: { propName: "disabled" } }} />
                </>}
                componentDocumentation={[
                    {name: "caption", required: false, dataType: "string", description: "Caption by left side of component."},
                    {name: "value", required: false, dataType: "boolean", description: "Default component value."},
                    {name: "disabled", required: false, dataType: "boolean", description: "Component availability state. Default is 'false'."},
                    {name: "onReturnData", required: false, dataType: "Object", description: "Object type of: { func: callbackFunc, params: { } } The callback function in the first argument returns the state values of the component. And seconds Object of passed params."},
                ]}
                example={`<CheckBox disabled={${this.state.disabled}} value={false} caption="${this.state.caption}" onReturnData={{ func: this.setData, params: { type: "ttype" } }} />`}
            />);
    }
}

export default CheckBoxPage;