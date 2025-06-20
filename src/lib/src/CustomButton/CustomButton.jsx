import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './custombutton.css';


// --- Info ---
// Can handle only action
// --- Components params ---
// icon           (string)   - name of svg icon
// caption        (string)   - caption of button
// onClickAction  (Object)   - contains 'action' and 'redirect' Objects
// action         (Object)   - contains func handler and handler params


class CustomButton extends BaseComponent {
    constructor() {
        super();
        this.requiredProps = ['caption'];
    }
    renderComponent() {
        const baseHoverColor = "#5eaac5";

        return (
            <div style={{ ...this.props?.style, '--customButtonHoverColor': this.props?.hoverColor ?? baseHoverColor }} onClick={(event) => this.props?.onClickAction?.func({ event: event, ...this.props?.onClickAction?.params })} className={`button-default ${this.props?.disabled ? "disabled" : ""} ${this.props.type == "acceptFill" ? "accept-fill" : this.props.type == "acceptHollow" ? "accept-hollow" : this.props.type == "rejectHollow" ? "reject-hollow" : ""}`}>
                {this.props?.icon ? <div className="custombutton-icon">
                    {
                        this.props?.isImage ?
                            <img src={`/src/assets/${this.props.icon}.svg`} /> :
                            <img className="custombutton-icon-imgicon" style={{ WebkitMaskImage: `url(/src/assets/${this.props.icon}.svg)`, maskImage: `url(/src/assets/${this.props.icon}.svg)` }} />
                    }
                </div> : null}
                {this.props.caption}
            </div>
        );
    }
}

export default CustomButton;