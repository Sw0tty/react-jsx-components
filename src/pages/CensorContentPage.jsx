import BaseMethods from '../demoComponents/BaseMethods.jsx';
import Playground from '../demoComponents/Playground.jsx';
import CensorContent from '../lib/src/CensorContent/CensorContent.jsx';
import ComboBox from '../lib/src/ComboBox/ComboBox.jsx';
import CheckBox from '../lib/src/CheckBox/CheckBox.jsx';


class CensorContentPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            type: 'blur',
            showAltBlock: false,
            showBtns: true
        }
    }
    render() {
        return(
            <>
                <Playground title="CensorContent" titleTip="v0.1.5"
                    pComponent={<>
                    {
                        this.state.showAltBlock ?
                            <div>As example, on cancel you see this alt block. <button onClick={() => { this.setState({ showAltBlock: false }) }}>Return block</button></div>
                        :
                            <CensorContent type={this.state.type} showBtns={this.state.showBtns} caption="Secret content" onCancel={() => { this.setState({ showAltBlock: true }) }}>
                                <div style={{ width: "200px", height: "200px", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundImage: "url(./icons/Cat.jpg)", textAlign: "center", alignContent: "center" }}></div>
                            </CensorContent>
                    }
                    </>}
                    componentProps={<>
                        <ComboBox selectedItem={this.state.type} caption="Type of censor :" valueKey="vKey" captionKey="vKey" items={[{vKey: "blur"}, {vKey: "blackout"}]} onReturnData={{ func: this.setData, params: { propName: "type" } }} />
                        <CheckBox value={this.state.showBtns} caption="Show buttons :" onReturnData={{ func: this.setData, params: { propName: "showBtns" } }}/>
                    </>}
                    componentDocumentation={[
                        {name: "children", required: true, dataType: "HTMLContent", description: "Whatever you need to censor before user action."},
                        {name: "type", required: true, dataType: "string", description: "Type of censor. Const value of 'blur' or 'blackout'."},
                        {name: "caption", required: true, dataType: "string", description: "Caption of component."},
                        {name: "onCancel", required: false, dataType: "function", description: "Callback arrow function on cancel action."},
                        {name: "captionStyle", required: false, dataType: "Object", description: "CSS style for caption."}
                    ]}
                    example={`<CensorContent type="${this.state.type}" caption="Secret content" showBtns={${this.state.showBtns}} captionStyle={{ fontSize: "14px" }} onCancel={() => { this.setState({ showAltBlock: true }) }}>
                                <div style={{ width: "200px", height: "200px", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover", backgroundImage: "url(./icons/Cat.jpg)", textAlign: "center", alignContent: "center" }}></div>
                            </CensorContent>`}
                />
            </>
        );
    }
}

export default CensorContentPage;