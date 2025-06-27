import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import IconItem from "../lib/src/IconItem/IconItem.jsx";
import ColorPicker from "../lib/src/ColorPicker/ColorPicker.jsx";


class IconItemPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            iconPath: "./icons/Tip",
            iconColor: "green",
            size: "40px",
            addGlow: true,
            glowColor: "#8ddb33",
            glowStrong: "4px"
        }
    }
    render() {
        return(<Playground title="IconItem"
                pComponent={<IconItem iconPath={this.state.iconPath} iconColor={this.state.iconColor} size={this.state.size} addGlow={true} glowColor={this.state.glowColor} glowStrong={this.state.glowStrong} />}
                componentDocumentation={[
                    {name: "iconPath", required: true, dataType: "string", description: "Path to icon with icon name. Accepted only SVG format imgs."},
                    {name: "iconColor", required: true, dataType: "string", description: "Color in CSS format."},
                    {name: "size", required: false, dataType: "string", description: "Size in CSS format."},
                    {name: "addGlow", required: false, dataType: "bool", description: "Icon have glow style."},
                    {name: "bodyStyles", required: false, dataType: "Object", description: "CSS styles for container body."},
                    {name: "glowStrong", required: false, dataType: "string", description: "Size in CSS format."},
                    {name: "glowColor", required: false, dataType: "Object", description: "If not passed, but passed 'addGlow' prop - used the iconColor."},
                ]}
            />);
    }
}

export default IconItemPage;