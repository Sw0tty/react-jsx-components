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
            invalid: false,
            speed: "1.2s",
            type: "gallery",
            size: 45,
            blurStrong: 3,
            iconsSize: 70,
            itemsSize: 70,
            itemDataKey: 'data',
            galleyItems: [{ iconName: "Excel.svg", data: { s: "Excel" }, caption: "Excel icon" }, { iconName: "Progress.svg", data: "Progress" }, { iconName: "Rocket.svg", data: "Rocket" }, { iconName: "Graph.svg", data: "Graph" }, { iconName: "Compas.svg", data: "Compas" }, { iconName: "Eyedropper.svg", data: "Eyedropper" }, { iconName: "Box.svg", data: "Box" }],
            datagridData: [
                { id: 1, parentId: null, mark: "Nissan", colorName: null, colorValue: null, price: null, prodDate: null },
                { id: 2, parentId: 1, mark: "Skyline", colorName: "Silver Moon", colorValue: "#C0C0C0", price: 35000, prodDate: 2019 },
                { id: 3, parentId: 1, mark: "GT-R", colorName: "Midnight Black", colorValue: "#000000", price: 95000, prodDate: 2020 },
                { id: 4, parentId: 1, mark: "X-Trail", colorName: "Safety Orange", colorValue: "#FF6700", price: 28000, prodDate: 2021 },
                { id: 5, parentId: 1, mark: "Qashqai", colorName: "Cherry Red", colorValue: "#CC0000", price: 25000, prodDate: 2022 },
                { id: 6, parentId: null, mark: "Ford", colorName: null, colorValue: null, price: null, prodDate: null },
                { id: 7, parentId: 6, mark: "Mustang", colorName: "Royal Blue", colorValue: "#4169E1", price: 32000, prodDate: 2020 },
                { id: 8, parentId: 6, mark: "Focus", colorName: "Storm Grey", colorValue: "#808080", price: 20000, prodDate: 2021 },
                { id: 9, parentId: 6, mark: "Explorer", colorName: "Desert Beige", colorValue: "#F5F5DC", price: 38000, prodDate: 2022 },
                { id: 10, parentId: 6, mark: "Transit", colorName: "Snow White", colorValue: "#FFFFFF", price: 30000, prodDate: 2023 },
                { id: 11, parentId: null, mark: "Audi", colorName: null, colorValue: null, price: null, prodDate: null },
                { id: 12, parentId: 11, mark: "A4", colorName: "Jet Black", colorValue: "#000000", price: 42000, prodDate: 2021 },
                { id: 13, parentId: 11, mark: "Q7", colorName: "Platinum Silver", colorValue: "#C0C0C0", price: 65000, prodDate: 2022 },
                { id: 14, parentId: 11, mark: "R8", colorName: "Ruby Red", colorValue: "#DC143C", price: 150000, prodDate: 2023 }
            ],
            datagridFields: [
                { key: "mark", columnName: "Mark / model", width: 120 },
                { key: "price", columnName: "Price", dataType: "number", render: (rowData) => { return `$ ${rowData.price}` }, style: { textAlign: "right"} },
                { key: "color", width: 150, columnName: "Color", render: (rowData) => { return rowData?.parentId ? <div style={{ display: "flex", columnGap: "5px", alignItems: "center" }}><div style={{ minWidth: "15px", height: "15px", borderRadius: "3px", background: rowData.colorValue, boxShadow: "0px 0px 0px 1px #d9d9d9" }}></div><span>{rowData.colorName}</span></div> : null  } }
            ]
        }
    }
    render() {
        return(<Playground title={<div style={{ display: "flex", justifyContent: "center", position: "relative" }}><div>ItemSelector</div><div><span style={{ fontSize: "12px", padding: "0 5px", position: "absolute", borderRadius: "5px", fontWeight: "bolder", color: "white", background: "gray"  }}>BETA</span></div></div>}
                pComponent={<ItemSelector itemDataKey={this.state.itemDataKey} data={this.state.type === 'gallery' ? this.state.galleyItems : this.state.type === 'datagrid' ? this.state.datagridData : undefined} fields={this.state.datagridFields} galleryIconsSize={this.state.iconsSize} galleryItemsSize={this.state.itemsSize} gridSelectorParams={{ hierarchyKeys: { idKey: "id", parentIdKey: "parentId" }, data: this.state.datagridCarsData, fields: this.state.datagridFields }} type={this.state.type} required={this.state.required} invalid={this.state.invalid} caption={this.state.caption} disabled={this.state.disabled} />}
                componentProps={<>
                    <TextBox caption="Caption :" value={this.state.caption} width={200} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "caption" } }} />
                    <Switcher caption="Disabled :" value={this.state.disabled} onReturnData={{ func: this.setData, params: { propName: "disabled" } }} />
                    <Switcher caption="Invalid :" value={this.state.invalid} onReturnData={{ func: this.setData, params: { propName: "invalid" } }} />
                    <Switcher caption="Required :" value={this.state.required} onReturnData={{ func: this.setData, params: { propName: "required" } }} />
                    <TextBox caption="Icons size :" width={200} maxLength={3} inputType="number" value={this.state.iconsSize} onReturnData={{ func: this.setData, params: { propName: "iconsSize" } }} />
                    <TextBox caption="Items size :" width={200} maxLength={10} inputType="number" value={this.state.itemsSize} onReturnData={{ func: this.setData, params: { propName: "itemsSize" } }} />
                    <ComboBox required={true} caption="Selector type :" valueKey="valKey" captionKey="valKey" selectedItem={this.state.type} items={[{ valKey: "gallery" }, { valKey: "datagrid" }]} onReturnData={{ func: this.setData, params: { propName: "type" } }} />
                </>}
                componentDocumentation={[
                    {name: "type", required: true, dataType: "string", description: "Must be only 'gallery' or 'datagrid'. The main components do not relate to these versions in any way. Changes in the main components will not affect the functionality of this one in any way. Examples to working with gallery or datagrid you can see in his demo pages."},
                    {name: "caption", required: false, dataType: "string", description: "Caption by left side of component."},
                    {name: "disabled", required: false, dataType: "boolean", description: "Component availability state. Default state is 'false'."},
                    {name: "required", required: false, dataType: "boolean", description: "Component is required state. Default state is 'false'."},
                    {name: "invalid", required: false, dataType: "boolean", description: "Component invalid data state. Default state is 'false'."},
                ]}
            />);
    }
}

export default ItemSelectorPage;