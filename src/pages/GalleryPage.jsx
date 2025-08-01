import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Gallery from "../lib/src/Gallery/Gallery.jsx";
import Playground from '../demoComponents/Playground.jsx';


class GalleryPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            caption: "Test caption",
            hoverColor: null,
            reverse: false
        }
    }
    render() {
        return(<Playground title="Gallery"
                pComponent={<Gallery cHeight="150px" cWidth="200px" itemDataKey="data" iconsSize={90} iconsPath="./icons/" itemSize="50px" items={[{ iconName: "Excel.svg", data: "data", caption: "Excel icon" }, { iconName: "Eyedropper.svg", data: "dropper" }, { iconName: "Eyedropper.svg", data: "dropper" }, { iconName: "Eyedropper.svg", data: "dropper" }, { iconName: "Eyedropper.svg", data: "dropper" }]} />}
                componentDocumentation={[
                    {name: "caption", required: true, dataType: "string", description: "Color in CSS format."},
                    {name: "hoverColor", required: true, dataType: "string", description: "Color in CSS format."},
                    {name: "isImage", required: false, dataType: "boolean", description: "Passed icon not need to mask and not have hover effect."},
                    {name: "iconPath", required: false, dataType: "string", description: "If isImage prop pass - path to icon with icon name and extension. Else path and name of icon with SVG extension."},
                    {name: "reverse", required: false, dataType: "boolean", description: "Reverse the icon and caption."},
                ]}
            />);
    }
}

export default GalleryPage;