import BaseMethods from "../demoComponents/BaseMethods.jsx";
import InputText from '../lib/src/InputText/InputText.jsx';
import Tip from '../lib/src/Tip/Tip.jsx';
import ColorPicker from '../lib/src/ColorPicker/ColorPicker.jsx';
import Playground from '../demoComponents/Playground.jsx';
import Switcher from "../lib/src/Switcher/Switcher.jsx";


class TipPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            caption: 'Some tip caption',
            iconPath: './icons/Warning',
            iconName: null,
            iconColor: '#ffab1d',
            addGlow: false,
            glowColor: null,
        }
    }
    render() {
        return (
            <Playground title="Tip"
                pComponent={<Tip caption={this.state.caption} iconPath={this.state?.iconPath} iconName={this.state?.iconName} iconColor={this.state?.iconColor} addGlow={this.state?.addGlow} glowColor={this.state?.glowColor}><div>Some Block</div></Tip>}
                componentProps={<>
                    <Tip caption="Allowed icons: Warning, Error" iconColor="#25cf8f" addGlow={true}>                            
                        <InputText width={200} disabled={false} required={false} maxLength={100} caption="IconPath :" placeholder="Test icons in './icons/'" value={this.state?.iconPath} onReturnData={{ func: this.setData, params: { propName: "iconPath" } }} />
                    </Tip>
                    <ColorPicker caption="IconColor" disabled={false} onReturnData={{ func: this.setData, params: { propName: "iconColor" } }} />
                    <InputText width={200} disabled={false} required={false} maxLength={255} caption="Tip caption :" value={this.state?.caption} onReturnData={{ func: this.setData, params: { propName: "caption" } }} />
                    <Switcher caption="AddGlow to tip" disabled={false} onReturnData={{ func: this.setData, params: { propName: "addGlow" } }} />
                    <ColorPicker caption="GlowColor" disabled={false} onReturnData={{ func: this.setData, params: { propName: "glowColor" } }} />
                </>}
                componentDocumentation={[
                    {name: "iconPath", required: false, dataType: "string", description: "Accepts the path to the image, including the image name. Only SVG format images are available."},
                    {name: "iconColor", required: false, dataType: "string", description: "Color for icon in CSS style."},
                    {name: "caption", required: false, dataType: "string", description: "Caption in block on mouse hover."},
                    {name: "addGlow", required: false, dataType: "bool", description: "Adding the glow effect."},
                    {name: "glowColor", required: false, dataType: "string", description: "If not passed, but passed 'addGlow' prop - used the iconColor."}
                ]}
            />
        );
    }
}

export default TipPage;