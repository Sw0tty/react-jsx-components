import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import Switcher from "../lib/src/Switcher/Switcher.jsx";
import TextBox from "../lib/src/TextBox/TextBox.jsx";


class SwitcherPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            caption: "Test caption :",
            disabled: false
        }
    }
    render() {
        return(<Playground title="Switcher"
                pComponent={<Switcher disabled={this.state.disabled} caption={this.state.caption} />}
                componentProps={<>
                    <TextBox caption="Caption :" value={this.state.caption} width={200} disabled={false} required={false} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "caption" } }} />
                    <Switcher disabled={false} caption="Disabled :" onReturnData={{ func: this.setData, params: { propName: "disabled" } }} />
                </>}
                componentDocumentation={[
                    {name: "caption", required: false, dataType: "string", description: "Caption by left side of component."},
                    {name: "disabled", required: true, dataType: "bool", description: "Deactivate actions for user."},
                    {name: "onReturnData", required: false, dataType: "Object", description: "Object type of: { func: callbackFunc, params: { } }"},
                ]}
                example='<Switcher disabled={false} caption="Add style :" onReturnData={{ func: this.setCustomStyle, params: { sType: "custom", another: 2 } }} />'
            />);
    }
}

export default SwitcherPage;