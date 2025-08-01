import BaseMethods from "../demoComponents/BaseMethods.jsx";
import DataGrid from "../lib/src/DataGrid/DataGrid.jsx";
import Playground from '../demoComponents/Playground.jsx';
import PropDetails from "../demoComponents/PropDetails.jsx";
import IconItem from "../lib/src/IconItem/IconItem.jsx";


const IN_STOCK = <IconItem iconPath="./icons/CheckCircle" iconColor="#4ce317" shadowColor="#54f71b" addGlow={true} shadowStrong="5px" size="18px" />;
const SOLD_OUT = <IconItem iconPath="./icons/CrossCircle" iconColor="#e33a17" shadowColor="#d12d0b" addGlow={true} shadowStrong="5px" size="18px" />;

class DataGridPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            data: [{ id: 1, caption: "Apple", price: 1.25, quant: 100, lastOrder: '2025-02-06 12:07:31' }, { id: 2, caption: "Banana", price: 0.89, quant: 23, lastOrder: '2025-02-06 05:25:19' }, { id: 3, caption: "Grapes", price: 2.49, quant: 64, lastOrder: '2025-02-06 05:27:56' }, { id: 4, caption: "Kiwi", price: 3.50, quant: 0, lastOrder: '2025-02-03 15:45:40' }, { id: 5, caption: "Lemon", price: 1.75, quant: 87, lastOrder: '2025-02-06 05:25:19' }, { id: 6, caption: "Peach", price: 2.99, quant: 2, lastOrder: '2025-02-06 05:25:19' }, { id: 7, caption: "Orange", price: 1.49, quant: 55, lastOrder: '2025-02-06 05:25:19' }],
            carsData: [
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
            contextMenu: [[{ caption: "Edit" }, { caption: "Edit" }], [{ caption: "Delete", color: "red" }]], // func is priority on redirect
            tools: [{ caption: "Download" }, { caption: "Set default", color: "red" }],
            hoverColor: null,
            reverse: false
        }
    }
    render() {
        return(<>
            <Playground title={<div style={{ display: "flex", justifyContent: "center", position: "relative" }}><div>DataGrid</div><div><span style={{ fontSize: "12px", padding: "0 5px", position: "absolute", borderRadius: "5px", fontWeight: "bolder", color: "white", background: "gray"  }}>BETA</span></div></div>}
                pComponent={<DataGrid toolbar={true} searchTool={true} checkBoxes={false} tools={this.state.tools} contextMenu={this.state.contextMenu} fields={[{ key: "caption", columnName: "Name", width: 120, sorting: true, filter: true }, { key: "price", columnName: "Price", dataType: "number", sorting: true, render: (rowData) => { return `$ ${rowData.price}` }, style: { textAlign: "right"} }, { key: "quant", columnName: "Quantity in stock" }, { key: "inStock", columnName: "In stock", style: { display: "flex", justifyContent: "center" }, render: (rowData) => { return rowData.quant === 0 ? SOLD_OUT : IN_STOCK } }, { key: "lastOrder", columnName: "Last order", width: 150, dataType: "datetime" }]} data={this.state.data} />}
            />
            <Playground
                pComponent={<DataGrid idKey="id" parentIdKey="parentId" toolbar={true} searchTool={true} checkBoxes={false} tools={this.state.tools} fields={[{ key: "mark", columnName: "Mark / model", width: 120, sorting: true }, { key: "price", columnName: "Price", dataType: "number", sorting: true, render: (rowData) => { return `$ ${rowData.price}` }, style: { textAlign: "right"} }, { key: "color", width: 150, columnName: "Color", render: (rowData) => { return rowData?.parentId ? <div style={{ display: "flex", columnGap: "5px", alignItems: "center" }}><div style={{ minWidth: "15px", height: "15px", borderRadius: "3px", background: rowData.colorValue, boxShadow: "0px 0px 0px 1px #d9d9d9" }}></div><span>{rowData.colorName}</span></div> : null  } }]} data={this.state.carsData} />}
                componentDocumentation={[
                    {name: "fields", required: true, dataType: "ArrayOfObjects", description: "This is complex prop with all rules to getting, render and working with passed data. Each object is the column of table and have next params: key, columnName, dataType, width, sorting, filter, render, style. Detailed information on the prop is described below."},
                    {name: "data", required: false, dataType: "ArrayOfObjects", description: "A array of data to process according to the rules described in 'fields' prop. Without data be render empty block."},
                    {name: "rowNum", required: false, dataType: "boolean", description: "Add row number for each row."},
                    {name: "checkBoxes", required: false, dataType: "boolean", description: "Add checkboxes for each row."},
                    {name: "toolbar", required: false, dataType: "boolean", description: "Add toolbar."},
                    {name: "searchTool", required: false, dataType: "boolean", description: "Add search in datagrid (toolbar prop is required for activate)."},
                    {name: "tools", required: false, dataType: "ArrayOfObjects", description: "This is complex prop with display rules and user interaction (toolbar prop is required for activate). Detailed information about the parameters included in each object is described below."},
                    {name: "contextMenu", required: false, dataType: "ArrayOfArraysOfObjects", description: "This is complex prop with display rules and user interaction. Detailed information about the parameters included in each object is described below."},
                ]}
            />
            <div style={{display: "flex", flexDirection: "column", rowGap: "50px" }}>
                <PropDetails propName="Fields" propParams={[
                    { keyName: "key", description: <div>Required. This key will be used to extract information for display from the data prop object.</div> },
                    { keyName: "columnName", description: <div>Optional. Sets the column name. Without this param column header be empty.</div> },
                    { keyName: "dataType", description: <div>Optional. Specifies the data type used in the cell.</div> },
                    { keyName: "width", description: <div>Optional. Sets the default column width.</div> },
                    { keyName: "filter", description: <div>Optional. A boolean value indicating the possibility of filtering by column.</div> },
                    { keyName: "sorting", description: <div>Optional. A boolean value indicating the ability to sort by column.</div> },
                    { keyName: "render", description: <div><div>Optional. Accepts an arrow function that allows you to set any conditions and methods for rendering data. The first parameter can be used to get all the data of row. Example:</div><div style={{ fontFamily: "monospace", color: "black", background: "#e1e1e1", padding: "3px 10px", borderRadius: "3px", whiteSpace: "break-spaces", overflow: "auto" }}><span>{`(rowData) => { return <div style={{ textAlign: "right" }}>{rowData.isTitle ? rowData.title : rowData.caption}</div> }`}</span></div></div> },
                    { keyName: "style", description: <div>Optional. A CSS styles object to apply to each cell of a column.</div> }
                ]}/>
                <PropDetails propName="Tools" propParams={[
                    { keyName: "caption", description: <div>Set a caption in button.</div> },
                    { keyName: "color", description: <div>Set a color on mouse hover.</div> }
                ]} />
                <PropDetails propName="ContextMenu" propParams={[
                    { keyName: "caption", description: <div>Set a caption in button.</div> },
                    { keyName: "color", description: <div>Set a color on mouse hover.</div> }
                ]} />
            </div>
            
        </>);
    }
}

export default DataGridPage;