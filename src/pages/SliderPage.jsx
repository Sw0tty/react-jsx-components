import BaseMethods from '../demoComponents/BaseMethods.jsx';
import Playground from '../demoComponents/Playground.jsx';
import Slider from '../lib/src/Slider/Slider.jsx';
import ComboBox from '../lib/src/ComboBox/ComboBox.jsx';


class SliderPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            direction: "horizontal"
        }
    }
    render() {
        return(<Playground title="Slider" titleTip="v0.1.5"
                pComponent={<Slider auto={3} width={200} height={200} startSlide={2} direction={this.state.direction} slides={[{ data: "Slide 1" }, { data: "Slide 2" }, { data: "Slide 3" }]} />}
                componentProps={<>
                    <ComboBox caption="Direction :" valueKey="value" captionKey="caption" selectedItem={this.state.direction} items={[{ value: "horizontal", caption: "horizontal" }, { value: "vertical", caption: "vertical" }]} onReturnData={{ func: this.setData, params: { propName: "direction" } }} />
                </>}
                componentDocumentation={[
                    {name: "", required: true, dataType: "", description: ""},
                ]}
                example={`<Slider  />`}
            />);
    }
}

export default SliderPage;