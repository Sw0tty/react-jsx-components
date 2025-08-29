import BaseMethods from "../demoComponents/BaseMethods.jsx";
import Playground from '../demoComponents/Playground.jsx';
import CensorContent from "../lib/src/CensorContent/CensorContent.jsx";
import ComboBox from "../lib/src/ComboBox/ComboBox.jsx";


class CensorContentPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            type: "blur",
            showAltBlock: false,
            language: 'en'
        }
    }
    render() {
        return(
            <>
                <Playground title="CensorContent"
                    pComponent={<>
                    {
                        this.state.showAltBlock ?
                            <div>As example, on cancel you see this alt block. <button onClick={() => { this.setState({ showAltBlock: false }) }}>Return block</button></div>
                        :
                            <CensorContent type={this.state.type} language={this.state.language} caption="Secret content" onCancel={() => { this.setState({ showAltBlock: true }) }}>
                                <div style={{ width: "200px", height: "200px", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundImage: "url(./icons/Cat.jpg)", textAlign: "center", alignContent: "center" }}></div>
                            </CensorContent>
                    }
                    </>}
                    componentProps={<>
                        <ComboBox selectedItem={this.state.type} caption="Type of censor :" valueKey="vKey" captionKey="vKey" items={[{vKey: "blur"}, {vKey: "blackout"}]} onReturnData={{ func: this.setData, params: { propName: "type" } }} />
                        <ComboBox selectedItem={this.state.language} caption="Language :" valueKey="vKey" captionKey="vKey" items={[{vKey: "en"}, {vKey: "ru"}]} onReturnData={{ func: this.setData, params: { propName: "language" } }} />
                    </>}
                    componentDocumentation={[
                        {name: "children", required: true, dataType: "HTMLContent", description: "Whatever you need to censor before user action."},
                        {name: "type", required: true, dataType: "string", description: "Type of censor. Const value of 'blur' or 'blackout'."},
                        {name: "caption", required: true, dataType: "string", description: "Caption of component."},
                        {name: "onCancel", required: false, dataType: "function", description: "Callback arrow function on cancel action."},
                        {name: "captionStyle", required: false, dataType: "Object", description: "CSS style for caption."}
                    ]}
                    example={`<CensorContent type="${this.state.type}" caption="Secret content" captionStyle={{ fontSize: "14px" }} onCancel={() => { this.setState({ showAltBlock: true }) }}>
                                <div style={{ width: "200px", height: "200px", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundImage: "url(./icons/Cat.jpg)", textAlign: "center", alignContent: "center" }}></div>
                            </CensorContent>`}
                />
            </>
        );
    }
}

export default CensorContentPage;