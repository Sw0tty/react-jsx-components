import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import Container from "../lib/src/Container/Container.jsx";
import InputText from "../lib/src/InputText/InputText.jsx";
import TextArea from "../lib/src/TextArea/TextArea.jsx";


class ContainerPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            caption: "Test caption",
            content: "<div>Some content</div>"
        }
    }
    render() {
        return(<Playground title="Container"
                pComponent={<Container caption={this.state.caption}>{<div dangerouslySetInnerHTML={{ __html: this.state.content }} />}</Container>}
                componentProps={<>
                    <InputText caption="Caption :" value={this.state.caption} width={200} disabled={false} required={false} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "caption" } }} />
                    <TextArea caption="Container body (children) :" value={this.state.content} required={true} width={500} disabled={false} defaultHeight={50} maxHeight={300} onReturnData={{ func: this.setData, params: { propName: "content" } }} />
                </>}
                componentDocumentation={[
                    {name: "caption", required: false, dataType: "string", description: "Caption by left side of component."},
                    {name: "children", required: true, dataType: "HTMLContent", description: "Default component value."},
                    {name: "borderWeight", required: false, dataType: "number", description: "Weight of border container."},
                    {name: "boxStyles", required: false, dataType: "Object", description: "CSS styles for container border."},
                    {name: "bodyStyles", required: false, dataType: "Object", description: "CSS styles for container body."},
                ]}
            />);
    }
}

export default ContainerPage;