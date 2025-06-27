import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import ComboBox from "../lib/src/ComboBox/ComboBox.jsx";


class ComboBoxPage extends BaseMethods {
    constructor() {
        super();
        this.state = {

        }
    }
    render() {
        return(<Playground title="ComboBox"
                pComponent={<ComboBox width={200} required={false} disabled={false} items={[{ id: "", name: "some"}, { id: "", name: "some"}, { id: "", name: "some"},{ id: "", name: "some"}, { id: "", name: "some"}, { id: "", name: "some"}, { id: "", name: "some"}, { id: "", name: "some"}, { id: "", name: "some"}, { id: "", name: "some"}, { id: "", name: "some"}, { id: "", name: "some"}]} />}
            />);
    }
}

export default ComboBoxPage;