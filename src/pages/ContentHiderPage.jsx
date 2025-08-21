import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import ContentHider from "../lib/src/ContentHider/ContentHider.jsx";
import TextBox from "../lib/src/TextBox/TextBox.jsx";
import TextArea from "../lib/src/TextArea/TextArea.jsx";
import ColorPicker from "../lib/src/ColorPicker/ColorPicker.jsx";


class ContentHiderPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            caption: "My secret info",
            width: "250px",
            content: "<div style='height: 100%; display: flex; justify-content: center; align-items: center;'>And something here...</div>",
            borderColorAction: undefined,
            shadowColorAction: undefined
        }
    }
    render() {
        return(<Playground title="ContentHider"
                pComponentStyle={{ alignItems: "baseline" }}
                pComponent={<ContentHider actionShadowColor={this.state.shadowColorAction} actionBorderColor={this.state.borderColorAction} caption={this.state.caption} width={this.state.width}>{<div style={{ width: "100%", height: "100%" }} dangerouslySetInnerHTML={{ __html: this.state.content }} />}</ContentHider>}
                componentProps={<>
                    <TextBox caption="Caption :" value={this.state.caption} width={200} required={true} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "caption" } }} />
                    <TextBox caption="Width :" value={this.state.width} width={200} required={true} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "width" } }} />
                    <TextArea caption="Container body (children) :" value={this.state.content} required={true} width={500} disabled={false} defaultHeight={50} maxHeight={300} onReturnData={{ func: this.setData, params: { propName: "content" } }} />
                    <ColorPicker caption="Border color action :" value={this.state.borderColorAction} onReturnData={{ func: this.setData, params: { propName: "borderColorAction" } }} />
                    <ColorPicker caption="Shadow color action :" value={this.state.shadowColorAction} onReturnData={{ func: this.setData, params: { propName: "shadowColorAction" } }} />
                </>}
                componentDocumentation={[
                    {name: "caption", required: true, dataType: "string", description: "Caption by left side of component."},
                    {name: "width", required: false, dataType: "string", description: "Width in CSS style. Min-width is 150px."},
                    {name: "maxHeight", required: false, dataType: "number", description: "CSS height in px. Default height is 100px."},
                    {name: "content", required: false, dataType: "HTMLContent", description: "Whatever you want on html"},
                    {name: "actionShadowColor", required: false, dataType: "string", description: "Color for shadow on action."},
                    {name: "actionBorderColor", required: false, dataType: "string", description: "Color for border on action."},
                ]}
                example={`<ContentHider caption="${this.state.caption}" width="${this.state.width}">${this.state.content}</ContentHider>`}
            />);
    }
}

export default ContentHiderPage;