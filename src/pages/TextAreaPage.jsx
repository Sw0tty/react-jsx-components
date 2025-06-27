import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import TextArea from "../lib/src/TextArea/TextArea.jsx";
import InputText from "../lib/src/InputText/InputText.jsx";
import Switcher from "../lib/src/Switcher/Switcher.jsx";


class TextAreaPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            caption: "Test caption :",
            required: true,
            disabled: false,
            defaultHeight: 30,
            maxHeight: 200,
            width: "250px"
        }
    }
    render() {
        return(<Playground title="TextArea"
                pComponentStyle={{ alignItems: "baseline" }}
                pComponent={<TextArea caption={this.state.caption} required={this.state.required} disabled={this.state.disabled} width={this.state.width} maxHeight={this.state.maxHeight} defaultHeight={this.state.defaultHeight} />}
                componentProps={<>
                    <InputText caption="Caption :" value={this.state.caption} width={200} disabled={false} required={false} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "caption" } }} />
                    <InputText caption="DefaultHeight :" inputType="number" value={this.state.defaultHeight} width={200} disabled={false} required={false} maxLength={3} onReturnData={{ func: this.setData, params: { propName: "defaultHeight" } }} />
                    <InputText caption="MaxHeight :" inputType="number" value={this.state.maxHeight} width={200} disabled={false} required={false} maxLength={3} onReturnData={{ func: this.setData, params: { propName: "maxHeight" } }} />
                    <InputText caption="Width :" value={this.state.width} width={200} disabled={false} required={false} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "width" } }} />
                    <Switcher caption="Required :" disabled={false} inOnState={this.state.required} onReturnData={{ func: this.setData, params: { propName: "required" } }} />
                    <Switcher caption="Disabled :" disabled={false} inOnState={this.state.disabled} onReturnData={{ func: this.setData, params: { propName: "disabled" } }} />
                </>}
                componentDocumentation={[
                    {name: "caption", required: false, dataType: "string", description: ""},
                    {name: "disabled", required: true, dataType: "bool", description: ""},
                    {name: "required", required: true, dataType: "bool", description: ""},
                    {name: "defaultHeight", required: true, dataType: "bool", description: ""},
                    {name: "maxHeight", required: true, dataType: "bool", description: ""},
                    {name: "width", required: true, dataType: "bool", description: ""},
                    {name: "data", required: false, dataType: "bool", description: ""},
                    {name: "invalid", required: false, dataType: "bool", description: ""},
                    {name: "readOnly", required: false, dataType: "bool", description: ""},
                    {name: "onReturnData", required: false, dataType: "bool", description: ""},
                ]}
            />);
    }
}

export default TextAreaPage;