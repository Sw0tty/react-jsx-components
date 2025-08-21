import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import PropDetails from "../demoComponents/PropDetails.jsx";


class BaseComponentPage extends BaseMethods {
    render() {
        return(
            <>
            <Playground title="BaseComponent"
                description={<div style={{ fontFamily: "Helvetica, sans-serif", textAlign: "justify", fontSize: "14px" }}>
                    <div style={{ margin: "10px", textIndent: "10px", background: "#e4e4e4ff", borderRadius: "5px", padding: "10px 15px" }}>Each component of the library inherits from this component. It contains basic methods for checking the props used in components. Rules of checking passed in constructor of component like: <span style={{ fontWeight: "bold" }}>this._propsRules</span>. And if incorrect data is transmitted, it catches an exception and outputs an error with a description in a convenient format.</div>
                    <div style={{ margin: "10px", textIndent: "10px", background: "#e4e4e4ff", borderRadius: "5px", padding: "10px 15px" }}>Starting with version 0.1.2 added new base props for components actions color. Is <span style={{ fontWeight: "bold" }}>_baseActionColorBorder</span> - base color for hover and focus actions on components. And <span style={{ fontWeight: "bold" }}>_baseActionColorShadow</span> - color of shadow for component on focus action.</div>
                </div>}
            />
            <PropDetails propName="_propsRules" propParams={[
                    { keyName: "name", description: <div>Required. Name of prop what need to check.</div> },
                    { keyName: "type", description: <div>Optional. If passed checking prop on type. Must be: string, number, boolean, Array, Object, ArrayOfStrings, ArrayOfObjects or CallbackObject. Here is custom type CallbackObject - this Object must have two required keys, 'func' (arrow function) and 'params' (Object).</div> },
                    { keyName: "required", description: <div>Optional. Boolean value if 'true', then prop not must be 'undefined'.</div> },
                    { keyName: "constStrings", description: <div>Optional. Object type of ArrayOfString. When passed, the prop must match one of the array values.</div> },
                    { keyName: "interval", description: <div>Optional. Object type of Array with two values of numbers, where first greaten, then second. When passed, the prop value must be greaten or equal first, or less or equal second.</div> },
                ]}/>
            </>
        );
    }
}

export default BaseComponentPage;