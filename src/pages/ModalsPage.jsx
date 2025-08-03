import { Component } from "react";
import Playground from '../demoComponents/Playground.jsx';
import TextBox from "../lib/src/TextBox/TextBox.jsx";
import Switcher from "../lib/src/Switcher/Switcher.jsx";
import ColorPicker from "../lib/src/ColorPicker/ColorPicker.jsx";
import CustomButton from "../lib/src/CustomButton/CustomButton.jsx";
import { InfoModalForm } from "../lib/src/Modals/Modals.jsx";


class ModalsPage extends Component {
    constructor() {
        super();
        this.state = {
            infoModalHidden: true
        }
    }
    openModal = (params) => {
        const { modalName } = params;

        this.setState({
            [modalName]: false
        });
    }
    render() {
        return(<Playground title="Modals"
                pComponent={<div><InfoModalForm hidden={this.state.infoModalHidden}/></div>}
                componentProps={<>
                    <CustomButton caption="Show modal" type="hollow" onClickAction={{ func: this.openModal, params: { modalName: 'infoModalHidden' } }} style={{ padding: "0px 15px", height: "30px" }} />
                    {/* <TextBox caption="Progress :" dataType="number" value={this.state.progress} width={200} disabled={false} required={true} maxLength={3} onReturnData={{ func: this.setData, params: { propName: "progress" } }} />
                    <TextBox caption="Caption :" value={this.state.caption} width={200} disabled={false} required={false} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "caption" } }} />
                    <TextBox caption="Width :" value={this.state.width} width={200} disabled={false} required={false} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "width" } }} />
                    <TextBox caption="Length :" value={this.state.length} width={200} disabled={false} required={false} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "length" } }} />
                    <Switcher disabled={false} caption="Vertical :" value={this.state.vertical} onReturnData={{ func: this.setData, params: { propName: "vertical" } }} />
                    <Switcher disabled={false} caption="Reverse caption :" value={this.state.reverseCaption} onReturnData={{ func: this.setData, params: { propName: "reverseCaption" } }} />
                    <ColorPicker caption="Color :" disabled={false} onReturnData={{ func: this.setData, params: { propName: "color" } }} /> */}
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
                //example={`<ProgressBar progress={${this.state.progress}} ${this.state?.color ? `color="${this.state.color}"` : ''} caption="${this.state.caption}" width="${this.state.width}" length="${this.state.length}" reverseCaption={${this.state.reverseCaption}} vertical={${this.state.vertical}} />`}
            />);
    }
}

export default ModalsPage;