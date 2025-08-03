import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Gallery from "../lib/src/Gallery/Gallery.jsx";
import Playground from '../demoComponents/Playground.jsx';
import TextBox from "../lib/src/TextBox/TextBox.jsx";
import PropDetails from "../demoComponents/PropDetails.jsx";


class GalleryPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            cHeight: "280px",
            cWidth: "300px",
            iconsSize: 70,
            itemsSize: 70
        }
    }
    render() {
        return(<>
            <Playground title="Gallery"
                pComponent={<Gallery cHeight={this.state.cHeight} cWidth={this.state.cWidth} selectedItem="Rocket.svg" itemDataKey="data" iconsSize={this.state.iconsSize} iconsPath="./icons/" itemsSize={this.state.itemsSize} items={[{ iconName: "Excel.svg", data: "data", caption: "Excel icon" }, { iconName: "Progress.svg", data: "dropper" }, { iconName: "Rocket.svg", data: "dropper" }, { iconName: "Graph.svg", data: "dropper" }, { iconName: "Compas.svg", data: "dropper" }, { iconName: "Eyedropper.svg", data: "dropper" }, { iconName: "Box.svg", data: "dropper" }]} />}
                componentProps={<>
                <div style={{ display: "flex", flexDirection: "column", width: "max-content", alignItems: "end", rowGap: "5px" }}>
                    <TextBox caption="Component width :" width={200} maxLength={10} value={this.state.cWidth} onReturnData={{ func: this.setData, params: { propName: "cWidth" } }} />
                    <TextBox caption="Component height :" width={200} maxLength={10} value={this.state.cHeight} onReturnData={{ func: this.setData, params: { propName: "cHeight" } }} />
                    <TextBox caption="Icons size :" width={200} maxLength={3} inputType="number" value={this.state.iconsSize} onReturnData={{ func: this.setData, params: { propName: "iconsSize" } }} />
                    <TextBox caption="Items size :" width={200} maxLength={10} inputType="number" value={this.state.itemsSize} onReturnData={{ func: this.setData, params: { propName: "itemsSize" } }} />
                </div>
                </>}
                example={`<Gallery cHeight="${this.state.cHeight}" cWidth="${this.state.cWidth}" itemDataKey="data" iconsSize={${this.state.iconsSize}} iconsPath="./icons/" itemsSize={${this.state.itemsSize}} items={[{ iconName: "Excel.svg", data: "data", caption: "Excel icon" }, { iconName: "Progress.svg", data: "dropper" }, { iconName: "Rocket.svg", data: "dropper" }, { iconName: "Graph.svg", data: "dropper" }, { iconName: "Compas.svg", data: "dropper" }, { iconName: "Eyedropper.svg", data: "dropper" }, { iconName: "Box.svg", data: "dropper" }]} />`}
                componentDocumentation={[
                    {name: "cWidth", required: false, dataType: "string", description: "Component width in CSS format."},
                    {name: "cHeight", required: false, dataType: "string", description: "Component height in CSS format."},
                    {name: "iconsSize", required: true, dataType: "number", description: "Size of each icon in interval from 0 to 100."},
                    {name: "itemsSize", required: true, dataType: "number", description: "Size of each item in px."},
                    {name: "iconsPath", required: false, dataType: "string", description: "Path to searching icons. If not passed used '/' path."},
                    {name: "items", required: false, dataType: "boolean", description: "Reverse the icon and caption."},
                ]}
            />
            <PropDetails propName="Items" propParams={[
                { keyName: "iconName", description: <div>Required. Name must be passed with extension.</div> },
                { keyName: "iconPath", description: <div>Optional. May be passed to searching icon in specific place. If not passed used the prop 'iconsPath'. If 'iconsPath' not passed used '/' path.</div> },
                { keyName: "data", description: <div>Optional. Must be type of Object. Used on onClickAction</div> },
                { keyName: "caption", description: <div>Optional. Sets item caption.</div> }
            ]}/>
        </>);
    }
}

export default GalleryPage;