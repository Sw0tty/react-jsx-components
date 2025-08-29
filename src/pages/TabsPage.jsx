import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import Tabs from "../lib/src/Tabs/Tabs.jsx";
import PropDetails from "../demoComponents/PropDetails.jsx";


class TabsPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            panels: [
                { name: "Panel 1", color: "#0000ff", useColorTab: true, data: <div style={{margin: "20px"}}>Some of content</div> },
                { name: "Panel 2", color: "#26b1b1" },
                { name: "Panel 3" },
                { name: "Panel 4" }
            ],
            style: { width: "400px", height: "200px" }
        }
    }
    render() {
        return(
            <>
                <Playground title="Tabs"
                    pComponent={<Tabs panels={this.state.panels} style={this.state.style} />}
                    componentDocumentation={[
                        {name: "panels", required: true, dataType: "ArrayOfObjects", description: "Rules of rendering tabs. Description under below."},
                        {name: "style", required: false, dataType: "Object", description: "CSS style for tabs-container."}
                    ]}
                    example={`<Tabs panels={[{ name: "Panel 1", color: "#0000ff", useColorTab: true, data: <div style={{margin: "20px"}}>Some of content</div> }, { name: "Panel 2", color: "#26b1b1" }, { name: "Panel 3" }, { name: "Panel 4" }]} style={${JSON.stringify(this.state.style)}} />`}
                />
                <PropDetails propName="Panels" propParams={[
                    { keyName: "name", description: <div>Sets a name of tab.</div> },
                    { keyName: "color", description: <div>Optional. Sets a color of tab.</div> },
                    { keyName: "useColorTab", description: <div>Optional. Is boolean value to set content block color same as color tab.</div> },
                    { keyName: "data", description: <div>Html component.</div> }
                ]} />
            </>
        );
    }
}

export default TabsPage;