import BaseMethods from "../demoComponents/BaseMethods.jsx";
import ItemSelector from "../lib/src/ItemSelector/ItemSelector.jsx";
import Playground from '../demoComponents/Playground.jsx';
import TextBox from "../lib/src/TextBox/TextBox.jsx";
import Switcher from "../lib/src/Switcher/Switcher.jsx";
import ComboBox from "../lib/src/ComboBox/ComboBox.jsx";


class ItemSelectorPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            caption: "Test caption :",
            disabled: false,
            required: true,
            speed: "1.2s",
            type: "gallery",
            size: 45,
            blurStrong: 3,
            iconsSize: 70,
            itemsSize: 70,
            galleyItems: [{ iconName: "Excel.svg", data: "data", caption: "Excel icon" }, { iconName: "Progress.svg", data: "dropper" }, { iconName: "Rocket.svg", data: "dropper" }, { iconName: "Graph.svg", data: "dropper" }, { iconName: "Compas.svg", data: "dropper" }, { iconName: "Eyedropper.svg", data: "dropper" }, { iconName: "Box.svg", data: "dropper" }]
        }
    }
    render() {
        return(<Playground title={<div style={{ display: "flex", justifyContent: "center", position: "relative" }}><div>ItemSelector</div><div><span style={{ fontSize: "12px", padding: "0 5px", position: "absolute", borderRadius: "5px", fontWeight: "bolder", color: "white", background: "gray"  }}>BETA</span></div></div>}
                pComponent={<ItemSelector galleryParams={{ items: this.state.galleyItems, iconsSize: this.state.iconsSize, itemsSize: this.state.itemsSize }} type={this.state.type} required={this.state.required} invalid={true} caption={this.state.caption} disabled={this.state.disabled} />}
                componentProps={<>
                    <TextBox caption="Caption :" value={this.state.caption} width={200} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "caption" } }} />
                    <Switcher caption="Disabled :" value={this.state.disabled} onReturnData={{ func: this.setData, params: { propName: "disabled" } }} />
                    <Switcher caption="Required :" value={this.state.required} onReturnData={{ func: this.setData, params: { propName: "required" } }} />
                    <TextBox caption="Icons size :" width={200} maxLength={3} inputType="number" value={this.state.iconsSize} onReturnData={{ func: this.setData, params: { propName: "iconsSize" } }} />
                    <TextBox caption="Items size :" width={200} maxLength={10} inputType="number" value={this.state.itemsSize} onReturnData={{ func: this.setData, params: { propName: "itemsSize" } }} />
                    <ComboBox caption="Selector type :" valueKey="valKey" captionKey="valKey" selectedItem={this.state.type} items={[{ valKey: "gallery" }, { valKey: "datagrid" }]} onReturnData={{ func: this.setData, params: { propName: "type" } }} />
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