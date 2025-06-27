import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import CustomButton from "../lib/src/CustomButton/CustomButton.jsx";
import ColorPicker from "../lib/src/ColorPicker/ColorPicker.jsx";
import Switcher from "../lib/src/Switcher/Switcher.jsx";
import InputText from "../lib/src/InputText/InputText.jsx";


class CustomButtonPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            caption: "Test caption",
            hoverColor: null,
            reverse: false
        }
    }
    render() {
        return(<Playground title="CustomButton"
                pComponent={<CustomButton disabled={true} caption={this.state.caption} type="hollow" hoverColor={this.state.hoverColor} isImage={true} iconPath="./icons/Excel.svg" reverse={this.state.reverse} />}
                componentProps={<>
                    <InputText caption="Caption :" value={this.state.caption} width={200} disabled={false} required={true} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "caption" } }} />
                    <ColorPicker caption="HoverColor :" disabled={false} onReturnData={{ func: this.setData, params: { propName: "hoverColor" } }} />
                    <Switcher caption="Reverse :" disabled={false} inOnState={this.state.reverse} onReturnData={{ func: this.setData, params: { propName: "reverse" } }} />
                </>}
                componentDocumentation={[
                    {name: "caption", required: true, dataType: "string", description: "Color in CSS format."},
                    {name: "hoverColor", required: true, dataType: "string", description: "Color in CSS format."},
                    {name: "isImage", required: false, dataType: "bool", description: "Passed icon not need to mask and not have hover effect."},
                    {name: "iconPath", required: false, dataType: "string", description: "If isImage prop pass - path to icon with icon name and extension. Else path and name of icon with SVG extension."},
                    {name: "reverse", required: false, dataType: "bool", description: "Reverse the icon and caption."},
                ]}
            />);
    }
}

export default CustomButtonPage;