import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';

class ToolButtonPage extends BaseMethods {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return(<Playground title={<div style={{ display: "flex", justifyContent: "center", position: "relative" }}><div>ToolButton</div><div><span style={{ fontSize: "12px", padding: "0 5px", position: "absolute", borderRadius: "5px", fontWeight: "bolder", color: "white", background: "gray"  }}>SOON</span></div></div>}

            />);
    }
}

export default ToolButtonPage;