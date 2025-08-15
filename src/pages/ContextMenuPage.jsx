import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import ContextMenu from "../lib/src/ContextMenu/ContextMenu.jsx";
import PropDetails from "../demoComponents/PropDetails.jsx";


class ContextMenuPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            caption: "My secret info",
            width: "250px",
            actions: [
                [
                    { caption: "Print in console", onClick: { func: () => { console.log('Some func to call...') } } }
                ],
                [
                    { caption: "Redirect to StepsList", color: "green", icon: "StepsList", onClick: { redirect: "react-jsx-components/StepsList" } },
                    { caption: "Redirect to Switcher", color: "#5c00bd", icon: "Switcher", iconPath: "./icons/", onClick: { redirect: "react-jsx-components/Switcher" } }
                ],
            ]
        }
    }
    render() {
        return(<>
            <Playground title="ContextMenu"
                pComponent={<ContextMenu iconsPath="./icons/" contextActions={this.state.actions}><div style={{ background: "gray", width: "200px", height: "200px", alignContent: "center", textAlign: "center" }}>SomeBlock</div></ContextMenu>}
                example={`<ContextMenu iconsPath="./icons/" contextActions={${JSON.stringify(this.state.actions)}}><div style={{ background: "gray", width: "200px", height: "200px", alignContent: "center", textAlign: "center" }}>SomeBlock</div></ContextMenu>`}
                componentDocumentation={[
                    {name: "children", required: true, dataType: "HTMLContent", description: "Any HTML block that needs to be wrapped to open the context menu when you click on it."},
                    {name: "contextActions", required: true, dataType: "ArrayOfArraysOfObjects", description: "Array of arrays of objects with rules to action on click. Each array in the array is a group of elements that will be separated by a dash. A detailed description of the rules for building elements is spelled out below."},
                    {name: "iconsPath", required: false, dataType: "string", description: "A common path for all icons, unless the menu component has its own unique path."}
                ]}
            />
            <div style={{display: "flex", flexDirection: "column", rowGap: "50px" }}>
                <PropDetails propName="ContextActions" propParams={[
                    { keyName: "caption", description: <div>Required. Display caption in item.</div> },
                    { keyName: "color", description: <div>Optional. Color on hover action.</div> },
                    { keyName: "icon", description: <div>Optional. Icon name in item by left side. Icons can be only svg extension.</div> },
                    { keyName: "iconPath", description: <div>Optional. Path for icon if 'iconsPath' prop not passed or need another path for icon.</div> },
                    { keyName: "onClick", description: <div>Required. Object with 'func' key with arrow function value, or 'redirect' key with string to redirect.</div> }
                ]}/>
            </div>
            </>
        );
    }
}

export default ContextMenuPage;