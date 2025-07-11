import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import ComboBox from "../lib/src/ComboBox/ComboBox.jsx";
import TextBox from "../lib/src/TextBox/TextBox.jsx";
import Switcher from "../lib/src/Switcher/Switcher.jsx";


class ComboBoxPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            caption: "Test caption :",
            required: false,
            disabled: false,
            width: 200,
            items: [{ id: 1, caption: "Apple" }, { id: 2, caption: "Banana" }, { id: 3, caption: "Grapes" }, { id: 4, caption: "Kiwi" }, { id: 5, caption: "Lemon" }, { id: 6, caption: "Peach" }, { id: 7, caption: "Orange" }]
        }
    }
    render() {
        return(<Playground title="ComboBox"
                pComponent={<ComboBox caption={this.state.caption} valueKey="id" captionKey="caption" width={this.state.width} required={this.state.required} disabled={this.state.disabled} items={this.state.items} />}
                componentProps={<>
                    <TextBox caption="Caption :" value={this.state.caption} disabled={false} required={false} width={200} maxLength={200} onReturnData={{ func: this.setData, params: { propName: "caption" } }} />
                    <Switcher caption="Disabled :" value={this.state.disabled} disabled={false} onReturnData={{ func: this.setData, params: { propName: "disabled" } }} />
                    <Switcher caption="Required :" value={this.state.required} disabled={false} onReturnData={{ func: this.setData, params: { propName: "required" } }} />
                </>}
                componentDocumentation={[
                    {name: "caption", required: false, dataType: "string", description: "Caption by left side of component."},
                    {name: "disabled", required: true, dataType: "bool", description: "Component availability state."},
                    {name: "required", required: true, dataType: "bool", description: "Component is required state."},
                ]}
            />);
    }
}

export default ComboBoxPage;