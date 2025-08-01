import BaseMethods from "../demoComponents/BaseMethods.jsx";
import TextBox from '../lib/src/TextBox/TextBox.jsx';
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
                        <TextBox width={200} maxLength={100} caption="IconPath :" placeholder="Test icons in './icons/'" value={this.state?.iconPath} onReturnData={{ func: this.setData, params: { propName: "iconPath" } }} />
                    </Tip>
                    <ColorPicker caption="IconColor" value={this.state.iconColor} disabled={false} onReturnData={{ func: this.setData, params: { propName: "iconColor" } }} />
                    <TextBox width={200} maxLength={255} caption="Tip caption :" value={this.state?.caption} onReturnData={{ func: this.setData, params: { propName: "caption" } }} />
                    <Switcher caption="AddGlow to tip" onReturnData={{ func: this.setData, params: { propName: "addGlow" } }} />
                    <ColorPicker caption="GlowColor" disabled={false} onReturnData={{ func: this.setData, params: { propName: "glowColor" } }} />
                </>}
                componentDocumentation={[
                    {name: "children", required: false, dataType: "HTML Object", description: "Wrapped object."},
                    {name: "iconPath", required: false, dataType: "string", description: "Accepts the path to the image, including the image name. Only SVG format images are available."},
                    {name: "iconColor", required: false, dataType: "string", description: "Color for icon in CSS style."},
                    {name: "caption", required: false, dataType: "string", description: "Caption in block on mouse hover."},
                    {name: "addGlow", required: false, dataType: "boolean", description: "Adding the glow effect."},
                    {name: "glowColor", required: false, dataType: "string", description: "If not passed, but passed 'addGlow' prop - used the iconColor."}
                ]}
                example={`<Tip caption="${this.state.caption}" iconPath={this.state?.iconPath} iconName={this.state?.iconName} ${this.state?.iconColor ? `iconColor="${this.state.iconColor}"` : ''} addGlow={${this.state?.addGlow}} ${this.state?.glowColor ? `glowColor="${this.state.glowColor}"` : ''}><div>Some Block</div></Tip>`}
            />
        );
    }
}

export default TipPage;