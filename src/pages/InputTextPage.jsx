import BaseMethods from "../demoComponents/BaseMethods.jsx";
import InputText from '../lib/src/InputText/InputText.jsx';
import Playground from "../demoComponents/Playground";
import CheckBox from '../lib/src/CheckBox/CheckBox.jsx';
import Switcher from "../lib/src/Switcher/Switcher.jsx";


class InputTextPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            caption: 'Test caption',
            required: true,
            width: 200,
            maxLength: 255,
            invalidData: false,
            disabled: false,
            value: "Some value",
            placeholder: "Input something",
            inputIconReverse: false,
            invalid: false
        }
    }
    render() {
        return (
            <Playground title="InputText"
                pComponent={
                    <InputText invalid={this.state.invalid} inputIconPath="./icons/Warning" inputIconReverse={this.state.inputIconReverse} required={this.state.required} caption={this.state.caption} width={200} maxLength={255} placeholder={this.state.placeholder} invalidData={false} onReturnData={{ func: this.setData, params: { settledParamName: "address" } }} disabled={this.state.disabled} />
                }
                componentProps={<>
                    <InputText required={false} caption="Caption :" value={this.state.caption} width={200} maxLength={255} invalidData={false} onReturnData={{ func: this.setData, params: { propName: "caption" } }} disabled={false} />
                    <InputText required={false} caption="Placeholder :" value={this.state.placeholder} width={200} maxLength={255} invalidData={false} onReturnData={{ func: this.setData, params: { propName: "placeholder" } }} disabled={false} />
                    <Switcher caption="Disabled :" disabled={false} onReturnData={{ func: this.setData, params: { propName: "disabled" } }} />
                    <Switcher caption="Required :" disabled={false} value={this.state.required} onReturnData={{ func: this.setData, params: { propName: "required" } }} />
                    <Switcher caption="Invalid :" disabled={false} value={this.state.invalid} onReturnData={{ func: this.setData, params: { propName: "invalid" } }} />
                    <Switcher caption="InputIconReverse :" disabled={false} value={this.state.inputIconReverse} onReturnData={{ func: this.setData, params: { propName: "inputIconReverse" } }} />
                </>}
                componentDocumentation={[
                    {name: "disabled", required: true, dataType: "bool", description: ""},
                    {name: "required", required: true, dataType: "bool", description: ""},
                    {name: "width", required: false, dataType: "number", description: ""},
                    {name: "caption", required: false, dataType: "string", description: ""},
                    {name: "maxLength", required: true, dataType: "number", description: ""},
                    {name: "placeholder", required: false, dataType: "string", description: ""},
                    {name: "invalid", required: false, dataType: "bool", description: ""},
                    {name: "inputIconReverse", required: false, dataType: "bool", description: ""},
                    {name: "inputIconPath", required: false, dataType: "bool", description: ""},
                    {name: "onReturnData", required: false, dataType: "Object", description: ""},
                ]}
            />
        );
    }
}

export default InputTextPage;