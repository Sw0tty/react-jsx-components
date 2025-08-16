import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import IconItem from "../lib/src/IconItem/IconItem.jsx";
import TextBox from "../lib/src/TextBox/TextBox.jsx";
import ColorPicker from "../lib/src/ColorPicker/ColorPicker.jsx";
import Switcher from "../lib/src/Switcher/Switcher.jsx";


class IconItemPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            iconPath: "./icons/Tip",
            iconColor: "#06ad00",
            size: "40px",
            addGlow: true,
            glowColor: "#8ddb33",
            glowStrong: 1
        }
    }
    render() {
        return(<Playground title="IconItem"
                pComponent={<IconItem iconPath={this.state.iconPath} iconColor={this.state.iconColor} size={this.state.size} addGlow={this.state.addGlow} glowColor={this.state.glowColor} glowStrong={this.state.glowStrong} />}
                componentProps={<>
                <TextBox caption="Size :" value={this.state.size} width={200} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "size" } }} />
                <TextBox caption="Glow strong :" inputType="number" value={this.state.glowStrong} width={200} maxLength={2} onReturnData={{ func: this.setData, params: { propName: "glowStrong" } }} />
                <div style={{ display: "flex", flexDirection: "column", width: "max-content", alignItems: "end", rowGap: "5px" }}>
                    <ColorPicker caption="Icon color :" value={this.state.iconColor} onReturnData={{ func: this.setData, params: { propName: "iconColor" } }} />
                    <ColorPicker caption="Glow color :" value={this.state.glowColor} onReturnData={{ func: this.setData, params: { propName: "glowColor" } }} />
                    <Switcher caption="Add glow :" value={this.state.addGlow} onReturnData={{ func: this.setData, params: { propName: "addGlow" } }} />
                </div>
                </>}
                componentDocumentation={[
                    {name: "iconPath", required: true, dataType: "string", description: "Path to icon with icon name. Accepted only SVG format imgs."},
                    {name: "iconColor", required: true, dataType: "string", description: "Color in CSS format."},
                    {name: "size", required: false, dataType: "string", description: "Size in CSS format."},
                    {name: "addGlow", required: false, dataType: "boolean", description: "Icon have glow style."},
                    {name: "bodyStyles", required: false, dataType: "Object", description: "CSS styles for container body."},
                    {name: "glowStrong", required: false, dataType: "string", description: "Size in CSS format."},
                    {name: "glowColor", required: false, dataType: "Object", description: "If not passed, but passed 'addGlow' prop - used the iconColor."},
                ]}
            />);
    }
}

export default IconItemPage;