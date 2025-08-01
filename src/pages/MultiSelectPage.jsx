import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import MultiSelect from "../lib/src/MultiSelect/MultiSelect.jsx";
import TextBox from "../lib/src/TextBox/TextBox.jsx";
import Switcher from "../lib/src/Switcher/Switcher.jsx";


class MultiSelectPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            caption: "Test caption :",
            required: false,
            disabled: false,
            invalid: false,
            width: 200,
            items: [{ id: 5, caption: 'Cherry' },{ id: 1, caption: 'Apple' }, { id: 3, caption: 'Peach' }, { id: 2, caption: 'Banana' }, { id: 4, caption: 'Melon' }]
        }
    }
    render() {
        return(<Playground title="MultiSelect"
                pComponent={<MultiSelect invalid={this.state.invalid} valueKey="id" captionKey="caption" caption={this.state.caption} width={this.state.width} required={this.state.required} disabled={this.state.disabled} selectedValues={[3, 5]} items={this.state.items} />}
                componentProps={<>
                    <TextBox caption="Caption :" value={this.state.caption} width={200} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "caption" } }} />
                    <TextBox caption="Width :" inputType="number" value={this.state.width} width={200} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "width" } }} />
                    <Switcher caption="Required :" value={this.state.required} onReturnData={{ func: this.setData, params: { propName: "required" } }} />
                    <Switcher caption="Disabled :" value={this.state.required} onReturnData={{ func: this.setData, params: { propName: "disabled" } }} />
                    <Switcher caption="Invalid :" value={this.state.required} onReturnData={{ func: this.setData, params: { propName: "invalid" } }} />
                </>}
                componentDocumentation={[
                    {name: "caption", required: false, dataType: "string", description: "Caption by top side of component."},
                    {name: "valueKey", required: true, dataType: "string", description: "By this key be get data from object in items. If sets prop 'onReturnData' be return data from selected item by this key."},
                    {name: "captionKey", required: true, dataType: "string", description: "By this key be get caption for each item from object in items."},
                    {name: "width", required: false, dataType: "number", description: "Component size in number format."},
                    {name: "required", required: false, dataType: "boolean", description: "Component is required state. Default is 'false'."},
                    {name: "disabled", required: false, dataType: "boolean", description: "Deactivate actions for user. Default is 'false'."},
                    {name: "selectedValues", required: false, dataType: "Array", description: "Selected values for first render."},
                    {name: "onReturnData", required: false, dataType: "Object", description: "Object type of: { func: callbackFunc, params: { } } The callback function in the first argument returns the state values of the component. And seconds Object of passed params."},
                ]}
                example={`<MultiSelect invalid={${this.state.invalid}} valueKey="id" captionKey="caption" caption="${this.state.caption}" width={${this.state.width}} required={${this.state.required}} disabled={${this.state.disabled}} selectedValues={[3, 5]} items={[${this.state.items.map(el => { return `{ id: ${el.id}, caption: ${el.caption} }` })}]} onReturnData={{ func: this.setData }} />`}
            />);
    }
}

export default MultiSelectPage;