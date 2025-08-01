import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import Loading from "../lib/src/Loading/Loading.jsx";
import TextBox from "../lib/src/TextBox/TextBox.jsx";
import Switcher from "../lib/src/Switcher/Switcher.jsx";


class LoadingPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            isLoading: true,
            iconPath: null,
            speed: "1.2s",
            size: 45,
            blurStrong: 3
        }
    }
    render() {
        return(<Playground title="Loading"
                pComponent={<Loading isLoading={this.state.isLoading} blurStrong={this.state.blurStrong} speed={this.state.speed} size={this.state.size}><div style={{ width: "400px", height: "200px" }}>Some loading content...</div></Loading>}
                componentProps={<>
                    <TextBox caption="IconPath :" value={this.state.iconPath} width={200} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "iconPath" } }} />
                    <TextBox caption="Speed :" value={this.state.speed} width={200} maxLength={6} onReturnData={{ func: this.setData, params: { propName: "speed" } }} />
                    <TextBox caption="Size :" inputType="number" value={this.state.size} width={200} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "size" } }} />
                    <TextBox caption="BlurStrong :" inputType="number" value={this.state.blurStrong} width={200} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "blurStrong" } }} />
                    <Switcher caption="IsLoading :" value={this.state.isLoading} onReturnData={{ func: this.setData, params: { propName: "isLoading" } }} />
                </>}
                componentDocumentation={[
                    {name: "iconPath", required: false, dataType: "string", description: "Path to icon with icon name. Accepted only SVG format imgs."},
                    {name: "speed", required: false, dataType: "string", description: "Speed in seconds."},
                    {name: "blurStrong", required: false, dataType: "number", description: "Strong of blur in number format."},
                    {name: "size", required: false, dataType: "number", description: "Size in number format."},
                    {name: "children", required: true, dataType: "HTMLContent", description: "Whatever you need to loading before show."},
                    {name: "isLoading", required: true, dataType: "bool", description: "Is loading or no state."},
                ]}
                example={`<Loading isLoading={${this.state.isLoading}} blurStrong={${this.state.blurStrong}} speed="${this.state.speed}" size={${this.state.size}}><div style={{ width: "400px", height: "200px" }}>Some loading content...</div></Loading>`}
            />);
    }
}

export default LoadingPage;