import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import CustomButton from "../lib/src/CustomButton/CustomButton.jsx";
import ColorPicker from "../lib/src/ColorPicker/ColorPicker.jsx";
import Switcher from "../lib/src/Switcher/Switcher.jsx";
import TextBox from "../lib/src/TextBox/TextBox.jsx";
import ComboBox from "../lib/src/ComboBox/ComboBox.jsx";


class CustomButtonPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            caption: "Type in console",
            hoverColor: null,
            reverse: false,
            type: "fill"
        }
    }
    consoleType = () => {
        console.log("Some text...");
    }
    render() {
        return(<Playground title="CustomButton"
                pComponent={<CustomButton disabled={true} caption={this.state.caption} type={this.state.type} hoverColor={this.state.hoverColor} isImage={true} iconPath="./icons/Excel.svg" reverse={this.state.reverse} onClickAction={{ func: this.consoleType }} />}
                componentProps={<>
                    <ComboBox caption="Button type :" valueKey="keyVal" captionKey="keyVal" width={150} selectedItem={this.state.type} items={[{ keyVal: "hollow" }, { keyVal: "fill" }]} onReturnData={{ func: this.setData, params: { propName: "type" } }} />
                    <TextBox caption="Caption :" value={this.state.caption} width={200} required={true} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "caption" } }} />
                    <ColorPicker caption="HoverColor :" onReturnData={{ func: this.setData, params: { propName: "hoverColor" } }} />
                    <Switcher caption="Reverse :" value={this.state.reverse} onReturnData={{ func: this.setData, params: { propName: "reverse" } }} />
                </>}
                componentDocumentation={[
                    {name: "caption", required: true, dataType: "string", description: "Color in CSS format."},
                    {name: "hoverColor", required: true, dataType: "string", description: "Color in CSS format."},
                    {name: "isImage", required: false, dataType: "boolean", description: "Passed icon not need to mask and not have hover effect."},
                    {name: "iconPath", required: false, dataType: "string", description: "If isImage prop pass - path to icon with icon name and extension. Else path and name of icon with SVG extension."},
                    {name: "reverse", required: false, dataType: "boolean", description: "Reverse the icon and caption."},
                    {name: "onClickAction", required: false, dataType: "Object", description: "Reverse the icon and caption."},
                ]}
            />);
    }
}

export default CustomButtonPage;