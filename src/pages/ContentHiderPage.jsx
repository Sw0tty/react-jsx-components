import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import ContentHider from "../lib/src/ContentHider/ContentHider.jsx";
import InputText from "../lib/src/InputText/InputText.jsx";
import TextArea from "../lib/src/TextArea/TextArea.jsx";


class ContentHiderPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            caption: "My secret info",
            width: "250px",
            content: "<div style='height: 100%; display: flex; justify-content: center; align-items: center;'>And something here...</div>"
        }
    }
    render() {
        return(<Playground title="ContentHider"
                pComponentStyle={{ alignItems: "baseline" }}
                pComponent={<ContentHider caption={this.state.caption} width={this.state.width}>{<div style={{ width: "100%", height: "100%" }} dangerouslySetInnerHTML={{ __html: this.state.content }} />}</ContentHider>}
                componentProps={<>
                    <InputText caption="Caption :" value={this.state.caption} width={200} disabled={false} required={true} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "caption" } }} />
                    <InputText caption="Width :" value={this.state.width} width={200} disabled={false} required={true} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "width" } }} />
                    <TextArea caption="Container body (children) :" value={this.state.content} required={true} width={500} disabled={false} defaultHeight={50} maxHeight={300} onReturnData={{ func: this.setData, params: { propName: "content" } }} />
                </>}
                componentDocumentation={[
                    {name: "caption", required: true, dataType: "string", description: "Caption by left side of component."},
                    {name: "width", required: false, dataType: "string", description: "Width in CSS style. Min-width is 150px."},
                    {name: "maxHeight", required: false, dataType: "number", description: "CSS height in px. Default height is 100px."},
                    {name: "content", required: false, dataType: "HTMLContent", description: "Whatever you want on html"},
                ]}
            />);
    }
}

export default ContentHiderPage;