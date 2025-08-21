import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import ComboBox from "../lib/src/ComboBox/ComboBox.jsx";
import TextBox from "../lib/src/TextBox/TextBox.jsx";
import Switcher from "../lib/src/Switcher/Switcher.jsx";
import ColorPicker from "../lib/src/ColorPicker/ColorPicker.jsx";


class ComboBoxPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            caption: "Test caption :",
            required: false,
            disabled: false,
            width: 200,
            items: [{ id: 1, caption: "Apple" }, { id: 2, caption: "Banana" }, { id: 3, caption: "Grapes" }, { id: 4, caption: "Kiwi" }, { id: 5, caption: "Lemon" }, { id: 6, caption: "Peach" }, { id: 7, caption: "Orange" }],
            borderColorAction: undefined,
            shadowColorAction: undefined
        }
    }
    render() {
        return(<Playground title="ComboBox"
                pComponent={<ComboBox actionShadowColor={this.state.shadowColorAction} actionBorderColor={this.state.borderColorAction} caption={this.state.caption} valueKey="id" captionKey="caption" width={this.state.width} required={this.state.required} disabled={this.state.disabled} items={this.state.items} />}
                componentProps={<>
                    <div style={{ display: "flex", flexDirection: "column", width: "max-content", alignItems: "end", rowGap: "5px" }}>
                        <TextBox caption="Caption :" value={this.state.caption} width={200} maxLength={200} onReturnData={{ func: this.setData, params: { propName: "caption" } }} />
                        <TextBox caption="Width :" inputType="number" value={this.state.width} width={200} maxLength={255} invalidData={false} onReturnData={{ func: this.setData, params: { propName: "width" } }} />
                    </div>
                    <Switcher caption="Disabled :" value={this.state.disabled} onReturnData={{ func: this.setData, params: { propName: "disabled" } }} />
                    <Switcher caption="Required :" value={this.state.required} onReturnData={{ func: this.setData, params: { propName: "required" } }} />
                    <ColorPicker caption="Border color action :" value={this.state.borderColorAction} onReturnData={{ func: this.setData, params: { propName: "borderColorAction" } }} />
                    <ColorPicker caption="Shadow color action :" value={this.state.shadowColorAction} onReturnData={{ func: this.setData, params: { propName: "shadowColorAction" } }} />
                </>}
                componentDocumentation={[
                    {name: "valueKey", required: true, dataType: "string", description: "By this key be get data from object in items. If sets prop 'onReturnData' be return data from selected item by this key."},
                    {name: "captionKey", required: true, dataType: "string", description: "By this key be get caption for each item from object in items."},
                    {name: "caption", required: false, dataType: "string", description: "Caption by left side of component."},
                    {name: "disabled", required: false, dataType: "boolean", description: "Component availability state. Default is 'false'."},
                    {name: "required", required: false, dataType: "boolean", description: "Component is required state. Default is 'false'."},
                    {name: "width", required: false, dataType: "number", description: "Width of component input in number format. Min width 100px."},
                    {name: "items", required: true, dataType: "ArrayOfObject", description: "Array with objects where be get data for rendering."},
                    {name: "actionShadowColor", required: false, dataType: "string", description: "Color for shadow on action."},
                    {name: "actionBorderColor", required: false, dataType: "string", description: "Color for border on action."},
                    {name: "onReturnData", required: false, dataType: "CallbackObject", description: "Object type of: { func: callbackFunc, params: { } }. The callback arrow function in 'func' key will be return in  the first argument the component state and in the second passed params."}
                ]}
                example={`<ComboBox caption="${this.state.caption}" valueKey="id" captionKey="caption" width={${this.state.width}} required={${this.state.required}} disabled={${this.state.disabled}} items={[${this.state.items.map(el => { return `{ id: ${el.id}, caption: '${el.caption}' }` })}]}  onReturnData={{ func: this.setData }} />`}
            />);
    }
}

export default ComboBoxPage;