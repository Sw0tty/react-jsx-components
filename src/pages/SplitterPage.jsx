import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import Splitter from "../lib/src/Splitter/Splitter.jsx";
import Switcher from "../lib/src/Switcher/Switcher.jsx";
import ComboBox from "../lib/src/ComboBox/ComboBox.jsx";


class SplitterPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            splitRule: "vertical",
            addResize: true,
            removeResizeBlock: false,
            reverse: false
        }
    }
    render() {
        return(<Playground title="Splitter"
                pComponent={<div style={{ width: "100%", height: "200px" }}><Splitter mainBlockWidth="250px" reverse={this.state.reverse} removeResizeBlock={this.state.removeResizeBlock} addResize={this.state.addResize} splitRule={this.state.splitRule} firstBlockContent={<div>First block</div>} secondBlockContent={<div>Second block</div>} /></div>}
                componentProps={<>
                    <ComboBox selectedItem="vertical" required={true} disabled={false} caption="Split rule" width={200} valueKey="keyCap" captionKey="keyCap" items={[{ keyCap: "vertical" }, { keyCap: "horizontal" }]} onReturnData={{ func: this.setData, params: { propName: "splitRule" } }} />
                    <Switcher caption="AddResize :" value={this.state.addResize} onReturnData={{ func: this.setData, params: { propName: "addResize" } }} />
                    <Switcher caption="RemoveResizeBlock :" value={this.state.removeResizeBlock} onReturnData={{ func: this.setData, params: { propName: "removeResizeBlock" } }} />
                    <Switcher caption="Reverse :" value={this.state.reverse} onReturnData={{ func: this.setData, params: { propName: "reverse" } }} />
                </>}
                componentDocumentation={[
                    {name: "splitRule", required: true, dataType: "string", description: "Accepts the const value like: vertical OR horizontal."},
                    {name: "firstBlockContent", required: false, dataType: "HTMLContent", description: "Whatever you want on html."},
                    {name: "secondBlockContent", required: false, dataType: "HTMLContent", description: "Whatever you want on html."},
                    {name: "reverse", required: false, dataType: "boolean", description: "Replace the first block with second."},  
                    {name: "addResize", required: false, dataType: "boolean", description: "Adding func for resize blocks."},
                    {name: "mainBlockWidth", required: false, dataType: "string", description: "Start width for main block in CSS style. Main block is 'firstBlockContent' prop. Default value is 200px"},
                    {name: "removeResizeBlock", required: false, dataType: "boolean", description: "Removed the resize/split block."},
                    {name: "style", required: false, dataType: "Object", description: "Object with keys 'firstBlock' AND/OR 'secondBlock'. And thats keys contains objects with CSS styles for blocks."},
                ]}
                example={`<Splitter reverse={${this.state.reverse}} removeResizeBlock={${this.state.removeResizeBlock}} addResize={${this.state.addResize}} splitRule="${this.state.splitRule}" firstBlockContent={<div>First block</div>} secondBlockContent={<div>Second block</div>} />`}
            />);
    }
}

export default SplitterPage;