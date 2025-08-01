import BaseMethods from "../demoComponents/BaseMethods.jsx";
import ItemSelector from "../lib/src/ItemSelector/ItemSelector.jsx";
import Playground from '../demoComponents/Playground.jsx';
import TextBox from "../lib/src/TextBox/TextBox.jsx";
import Switcher from "../lib/src/Switcher/Switcher.jsx";


class ItemSelectorPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            caption: "Test caption :",
            disabled: false,
            required: true,
            speed: "1.2s",
            size: 45,
            blurStrong: 3
        }
    }
    render() {
        return(<Playground title="ItemSelector"
                pComponent={<ItemSelector required={this.state.required} invalid={true} caption={this.state.caption} disabled={this.state.disabled} />}
                componentProps={<>
                    <TextBox caption="Caption :" value={this.state.caption} width={200} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "caption" } }} />
                    <Switcher caption="Disabled :" value={this.state.disabled} onReturnData={{ func: this.setData, params: { propName: "disabled" } }} />
                    <Switcher caption="Required :" value={this.state.required} onReturnData={{ func: this.setData, params: { propName: "required" } }} />
                </>}
                componentDocumentation={[
                    {name: "caption", required: false, dataType: "string", description: "Caption by left side of component."},
                    {name: "disabled", required: false, dataType: "boolean", description: "Component availability state."},
                    {name: "required", required: false, dataType: "boolean", description: "Component is required state."},
                ]}
            />);
    }
}

export default ItemSelectorPage;