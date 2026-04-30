import BaseMethods from '../demoComponents/BaseMethods.jsx';
import Playground from '../demoComponents/Playground.jsx';
import FlipCard from '../lib/src/FlipCard/FlipCard.jsx';
import ComboBox from '../lib/src/ComboBox/ComboBox.jsx';
import TextArea from '../lib/src/TextArea/TextArea.jsx';
import CheckBox from '../lib/src/CheckBox/CheckBox.jsx';


class FlipCardPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            direction: "horizontal",
            width: 300,
            height: 150,
            selfFlippers: false,
            front: `<div style="width: 100%; height: 100%; display: flex; background: linear-gradient(148deg, rgb(0 31 73), rgb(156 239 234))"><div style="padding: 10px; width: 100%; display: flex; flex-direction: column; justify-content: space-between"><div style="width: 70px; height: 85px; border-radius: 5px; background-position: center; background-repeat: no-repeat; background-size: cover; background-image: url(./icons/Cat.jpg); text-align: center; align-content: center"></div><div style="font-size: 22px; font-weight: bold; color: white; text-align: right; text-shadow: 0 0 1px black">000 000 000 000</div><label style="border: 1px solid black; background: #d9d9d9; font-size: 13px; width: 80px; text-align: center;" for="jsxrc-flipcard-state">SELF FLIPPER</label></div></div>`,
            back: `<div style="width: 100%; height: 100%; display: flex; background: #e5e5e5"><div style="width: 100%; padding: 10px; display: flex; flex-wrap: wrap; gap: 5px; justify-content: space-between;">
                <div style="background: #cbcbcb; width: 200px; height: 20px; border-radius: 5px"></div>
                <div style="background: #cbcbcb; width: 150px; height: 20px; border-radius: 5px"></div>
                <div style="background: #cbcbcb; width: 80px; height: 20px; border-radius: 5px"></div>
                <div style="background: #cbcbcb; width: 100%; height: 20px; border-radius: 5px"></div>
                <div style="background: #cbcbcb; width: 80%; height: 20px; border-radius: 5px"></div>
                </div></div>`
        }
    }
    render() {
        return(<Playground title="FlipCard" titleTip="v0.1.5"
                pComponent={<FlipCard backSurfaceStyles={{ borderRadius: "5px", border: "1px solid #b7b7b7" }} selfFlippers={this.state.selfFlippers} width={this.state.width} height={this.state.height} front={<div style={{ height: "100%" }} dangerouslySetInnerHTML={{ __html: this.state.front }} />} back={<div style={{ height: "100%" }} dangerouslySetInnerHTML={{ __html: this.state.back }} />} />}
                componentProps={<>
                    <ComboBox caption="Direction :" valueKey="value" captionKey="caption" selectedItem={this.state.direction} items={[{ value: "horizontal", caption: "horizontal" }, { value: "vertical", caption: "vertical" }]} onReturnData={{ func: this.setData, params: { propName: "direction" } }} />
                    <CheckBox caption="Self flippers :" value={this.state.selfFlippers} onReturnData={{ func: this.setData, params: { propName: "selfFlippers" } }} />
                    <TextArea caption="Front :" value={this.state.front} defaultHeight={150} maxHeight={300} onReturnData={{ func: this.setData, params: { propName: "front" } }} />
                    <TextArea caption="Back :" value={this.state.back} defaultHeight={150} maxHeight={300} onReturnData={{ func: this.setData, params: { propName: "back" } }} />
                </>}
                componentDocumentation={[
                    {name: "", required: true, dataType: "", description: ""},
                    {name: "width", required: true, dataType: "number", description: "Sets width of card."},
                    {name: "height", required: true, dataType: "number", description: "Sets height of card."},
                    {name: "selfFlippers", required: false, dataType: "boolean", description: `Deactivate default buttons for flip card. For making self flip handlers, add to 'front' and/or 'back' <label for="jsxrc-flipcard-state">. Check example of front prop.`},
                ]}
                example={`<FlipCard  />`}
            />);
    }
}

export default FlipCardPage;