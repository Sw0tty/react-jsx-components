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
        this.buttonStyles = ['hollow', 'fill'];
        this.requiredProps = [{ name: 'caption', type: 'string' }, { name: 'type', constValue: this.buttonStyles }];
        this.baseHoverColor = "#5eaac5";
    }
    renderComponent() {
        return (
            <div className={`custombutton-container`}>
                <div style={{ ...this.props?.style, '--customButtonHoverColor': this.props?.hoverColor ?? this.baseHoverColor, flexDirection: this.props?.reverse ? "row-reverse" : null }} onClick={(event) => this.props?.onClickAction?.func({ event: event, ...this.props?.onClickAction?.params })} className={`button-default ${this.buttonStyles.includes(this.props.type) ? this.props.type : ''}`}>
                    {this.props?.iconPath ? <div className="custombutton-icon">
                        {
                            this.props?.isImage ?
                                <img src={this.props.iconPath} /> :
                                <img className="custombutton-icon-imgicon" style={{ WebkitMaskImage: `url(${this.props.iconPath}.svg)`, maskImage: `url(${this.props.iconPath}.svg)` }} />
                        }
                    </div> : null}
                    {this.props.caption}
                </div>
            </div>
        );
    }
}

export default CustomButton;