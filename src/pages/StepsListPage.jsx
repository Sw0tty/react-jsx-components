import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import StepsList from "../lib/src/StepsList/StepsList.jsx";
import Switcher from "../lib/src/Switcher/Switcher.jsx";
import ColorPicker from "../lib/src/ColorPicker/ColorPicker.jsx";


class StepsListPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            stayNum: false,
            stepsColor: undefined
        }
    }
    render() {
        return (<Playground title="StepsList"
                pComponent={<StepsList stayNum={this.state.stayNum} stepsColor={this.state.stepsColor} steps={[{ title: "Open git bash", description: "In your repo folder fight click -> open git bash" }, { title: "Add all for commit", description: "Input command: git add -A" }, { title: "Commit", description: "Input command: git commit -m 'change code' " }, { title: "Ready to push!" }]} />}
                componentProps={<>
                    <Switcher value={this.state.stayNum} disabled={false} caption="Stay num :" onReturnData={{ func: this.setData, params: { propName: "stayNum" } }} />
                    <ColorPicker disabled={false} caption="Steps color :" onReturnData={{ func: this.setData, params: { propName: "stepsColor" } }} />
                </>}
                componentDocumentation={[
                    {name: "steps", required: true, dataType: "ArrayOfObjects", description: ""},
                    {name: "stayNum", required: false, dataType: "bool", description: "Switch check in last step on num."},
                    {name: "stepsColor", required: false, dataType: "string", description: "Sets color on each step. Default color is blue."},
                    {name: "width", required: false, dataType: "string", description: "Sets the width in CSS format."},
                    {name: "style", required: false, dataType: "Object", description: "Object with CSS styles for element container."},
                ]}
                example='<StepsList stayNum={true} stepsColor="green" steps={[{ title: "Some t", description: "Some d" }, { title: "Some t 2" }, { title: "Some t 3", description: "Some d 3" }]} />'
            />);
    }
}

export default StepsListPage;