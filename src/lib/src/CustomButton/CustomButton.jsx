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
        this._propsRules = [
            { name: 'caption', type: 'string' },
            { name: 'type', required: true, constStrings: this.buttonStyles },
            { name: 'hoverColor', type: 'string' },
            { name: 'actionColor', type: 'string' },
            { name: 'reverse', type: 'boolean' }
        ];
    }
    renderComponent() {
        const CSSVariables = {
            ...this.props?.style,
            '--jsxrc-customButtonHoverColor': this.props?.hoverColor ?? this._baseActionColorBorder,
            '--jsxrc-customButtonActionColor': this.props?.actionColor ?? this._baseActionColorShadow,
            flexDirection: this.props?.reverse ? "row-reverse" : null
        };
        return (
            <div className="jsxrc-custombutton-container">
                <div className={`jsxrc-custombutton-base ${this.buttonStyles.includes(this.props.type) ? `jsxrc-custombutton-${this.props.type}` : ''}`} style={CSSVariables} onClick={(event) => this.props?.onClickAction?.func({ event: event, ...this.props?.onClickAction?.params })}>
                    {this.props?.iconPath ? <div className="jsxrc-custombutton-icon">
                        {
                            this.props?.isImage ?
                                <img alt="" src={this.props.iconPath} /> :
                                <img alt="" className="jsxrc-custombutton-icon-imgicon" style={{ WebkitMaskImage: `url(${this.props.iconPath}.svg)`, maskImage: `url(${this.props.iconPath}.svg)` }} />
                        }
                    </div> : null}
                    {this.props.caption}
                </div>
            </div>
        );
    }
}

export default CustomButton;