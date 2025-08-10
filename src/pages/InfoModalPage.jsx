import Playground from '../demoComponents/Playground.jsx';
import TextBox from "../lib/src/TextBox/TextBox.jsx";
import BaseMethods from "../demoComponents/BaseMethods.jsx";
import ColorPicker from "../lib/src/ColorPicker/ColorPicker.jsx";
import CustomButton from "../lib/src/CustomButton/CustomButton.jsx";
import { InfoModalForm } from "../lib/src/Modals/Modals.jsx";


class InfoModalPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            infoModalHidden: true,
            infoModalCaption: "Some info on modal"
        }
    }
    openModal = (params) => {
        const { modalName } = params;

        this.setState({
            [modalName]: false
        });
    }
    closeModal = (params) => {
        const { modalName } = params;

        this.setState({
            [modalName]: true
        });
    }
    render() {
        return(<Playground title={<div style={{ display: "flex", justifyContent: "center", position: "relative" }}><div>InfoModal</div><div><span style={{ fontSize: "12px", padding: "0 5px", position: "absolute", borderRadius: "5px", fontWeight: "bolder", color: "white", background: "gray"  }}>SOON</span></div></div>}
                pComponent={<>
                    <CustomButton caption="Show modal" type="hollow" onClickAction={{ func: this.openModal, params: { modalName: 'infoModalHidden' } }} style={{ padding: "0px 15px", height: "30px" }} />
                    <InfoModalForm iconColor={this.state.infoModalIconColor} iconGlowColor={this.state.infoModalIconGlowColor} icon="./icons/Warning.svg" caption={this.state.infoModalCaption} onClickAction={{ func: this.closeModal, params: { modalName: 'infoModalHidden' } }} hidden={this.state.infoModalHidden}/>
                </>}
                componentProps={<>
                    <TextBox caption="Caption :" value={this.state.infoModalCaption} width={200} maxLength={255} onReturnData={{ func: this.setData, params: { propName: "infoModalCaption" } }} />
                    <ColorPicker caption="Color :" value={this.state.infoModalIconColor} onReturnData={{ func: this.setData, params: { propName: "infoModalIconColor" } }} />
                    <ColorPicker caption="Glow color :" value={this.state.infoModalIconGlowColor} onReturnData={{ func: this.setData, params: { propName: "infoModalIconGlowColor" } }} />
                </>}
                componentDocumentation={[
                    {name: "buttonCaption", required: false, dataType: "string", description: "Sets the progress state."},
                ]}
                example={`<InfoModalForm iconColor={this.state.infoModalIconColor} iconGlowColor={this.state.infoModalIconGlowColor} icon="./icons/Warning.svg" caption={this.state.infoModalCaption} onClickAction={{ func: this.closeModal, params: { modalName: 'infoModalHidden' } }} hidden={this.state.infoModalHidden}/>`}
            />);
    }
}

export default InfoModalPage;