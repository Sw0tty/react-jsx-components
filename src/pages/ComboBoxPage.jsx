import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import ComboBox from "../lib/src/ComboBox/ComboBox.jsx";


class ComboBoxPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            caption: "Test caption :",
            required: false,
            disabled: false,
            width: 200,
            items: [{ id: 1, caption: "Apple" }, { id: 2, caption: "Banana" }, { id: 3, caption: "Grapes" }, { id: 4, caption: "Kiwi" }, { id: 5, caption: "Lemon" }, { id: 6, caption: "Peach" }, { id: 7, caption: "Orange" }]
        }
    }
    render() {
        return(<Playground title="ComboBox"
                pComponent={<ComboBox caption={this.state.caption} valueKey="id" captionKey="caption" width={this.state.width} required={this.state.required} disabled={this.state.disabled} items={this.state.items} />}
            />);
    }
}

export default ComboBoxPage;