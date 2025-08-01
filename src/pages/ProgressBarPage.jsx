import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import ProgressBar from "../lib/src/ProgressBar/ProgressBar.jsx";
import TextBox from "../lib/src/TextBox/TextBox.jsx";
import Switcher from "../lib/src/Switcher/Switcher.jsx";
import ColorPicker from "../lib/src/ColorPicker/ColorPicker.jsx";


class ProgressBarPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            progress: 70,
            caption: 'Test caption',
            width: '30px',
            length: '250px',
            vertical: false,
            reverseCaption: true,
            color: '#42d642'
        }
    }
    render() {
        return(<Playground title="ProgressBar"
                pComponent={<ProgressBar progress={this.state.progress} color={this.state.color} caption={this.state.caption} width={this.state.width} length={this.state.length} reverseCaption={this.state.reverseCaption} vertical={this.state.vertical} />}
                componentProps={<>
                    <TextBox caption="Progress :" dataType="number" value={this.state.progress} width={200} required={true} maxLength={3} onReturnData={{ func: this.setData, params: { propName: "progress" } }} />
                    <TextBox caption="Caption :" value={this.state.caption} width={200} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "caption" } }} />
                    <TextBox caption="Width :" value={this.state.width} width={200} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "width" } }} />
                    <TextBox caption="Length :" value={this.state.length} width={200} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "length" } }} />
                    <Switcher caption="Vertical :" value={this.state.vertical} onReturnData={{ func: this.setData, params: { propName: "vertical" } }} />
                    <Switcher caption="Reverse caption :" value={this.state.reverseCaption} onReturnData={{ func: this.setData, params: { propName: "reverseCaption" } }} />
                    <ColorPicker caption="Color :" value={this.state.color} onReturnData={{ func: this.setData, params: { propName: "color" } }} />
                </>}
                componentDocumentation={[
                    {name: "progress", required: true, dataType: "number", description: "Sets the progress state."},
                    {name: "caption", required: false, dataType: "string", description: "Caption for progress bar."},
                    {name: "reverseCaption", required: false, dataType: "boolean", description: "Reverse bar and caption blocks."},
                    {name: "vertical", required: false, dataType: "boolean", description: "Makes progress bar in vertical orientation."},
                    {name: "width", required: false, dataType: "string", description: "Width of bar in CSS style. Default 20px."},
                    {name: "length", required: false, dataType: "string", description: "Length of bar in CSS style. Min length 200px."},
                    {name: "color", required: false, dataType: "string", description: "Color of progress. Has default green color."},
                    {name: "style", required: false, dataType: "Object", description: "Object with CSS styles for component container."},
                ]}
                example={`<ProgressBar progress={${this.state.progress}} color="${this.state.color}" caption="${this.state.caption}" width="${this.state.width}" length="${this.state.length}" reverseCaption={${this.state.reverseCaption}} vertical={${this.state.vertical}} />`}
            />);
    }
}

export default ProgressBarPage;