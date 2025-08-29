import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import TextBox from "../lib/src/TextBox/TextBox.jsx";
import Switcher from "../lib/src/Switcher/Switcher.jsx";
import ItemsPaginator from "../lib/src/ItemsPaginator/ItemsPaginator.jsx";


class ItemsPaginatorPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            iconPath: null,
            speed: "1.2s",
            height: "700px",
            itemsOnPage: 10,
            blurStrong: 3
        }
    }
    createItems = (itemsCount) => {
        let items = [];

        for (let i = 1; i <= itemsCount; i++) {
            items.push(
                <div key={i} style={{ border: "1px solid black", width: "130px", height: "180px", alignContent: "center", textAlign: "center", fontSize: "25px" }}>
                    {i}
                </div>
            );
        }

        return items;
    }
    render() {
        return(<Playground title={<div style={{ display: "flex", justifyContent: "center", position: "relative" }}><div>ItemsPaginator</div><div><span style={{ fontSize: "12px", padding: "0 5px", position: "absolute", borderRadius: "5px", fontWeight: "bolder", color: "white", background: "gray"  }}>BETA</span></div></div>}
                pComponent={<ItemsPaginator height={this.state.height} items={this.createItems(50)} itemsOnPage={this.state.itemsOnPage} />}
                componentProps={<>
                    <div style={{ display: "flex", flexDirection: "column", width: "max-content", alignItems: "end", rowGap: "5px" }}>
                        <TextBox caption="IconPath :" value={this.state.iconPath} width={200} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "iconPath" } }} />
                        <TextBox caption="Speed :" value={this.state.speed} width={200} maxLength={6} onReturnData={{ func: this.setData, params: { propName: "speed" } }} />
                        <TextBox caption="Height :" value={this.state.height} width={200} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "height" } }} />
                        <TextBox caption="Items on page :" inputType="number" value={this.state.itemsOnPage} width={200} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "itemsOnPage" } }} />
                    </div>
                    <Switcher caption="IsLoading :" value={this.state.isLoading} onReturnData={{ func: this.setData, params: { propName: "isLoading" } }} />
                </>}
                componentDocumentation={[
                    {name: "iconPath", required: false, dataType: "string", description: "Path to icon with icon name. Accepted only SVG format imgs."},
                    {name: "speed", required: false, dataType: "string", description: "Speed in seconds."},
                    {name: "blurStrong", required: false, dataType: "number", description: "Strong of blur in number format."},
                    {name: "size", required: false, dataType: "number", description: "Size in number format."},
                    {name: "children", required: true, dataType: "HTMLContent", description: "Whatever you need to loading before show."},
                    {name: "isLoading", required: true, dataType: "bool", description: "Is loading or no state."},
                ]}
                example={`<Loading isLoading={${this.state.isLoading}} blurStrong={${this.state.blurStrong}} speed="${this.state.speed}" size={${this.state.size}}><div style={{ width: "400px", height: "200px" }}>Some loading content...</div></Loading>`}
            />);
    }
}

export default ItemsPaginatorPage;