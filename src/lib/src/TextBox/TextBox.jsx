import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './textbox.css';


// --- Components params ---
// value             (string) - default value of input
// caption           (string) - caption
// width             (int)    - width of input
// fontSize          (int)    - font size in px
// disabled          (bool)   - can be edited
// required          (bool)   - showing required sign
// maxLength         (int)    - max length of input
// inputType         (type)   - string param equals "text"|"number"|"date"|"yearOnly"
// invalidData       (bool)   - null or invalid input by user
// onReturnData      (Object) - Object with callback function and Object with params
// style             (Object) - for 'input', 'container' 

class TextBox extends BaseComponent {
    constructor(props) {
        super();
        this._propsRules = [
            { name: 'width', type: 'number' },
            { name: 'disabled', type: 'boolean' },
            { name: 'required', type: 'boolean' },
            { name: 'maxLength', type: 'number' }
        ];
        this.state = {
            value: props.value ?? '',
            minYear: 1700,
            lastState: props.disabled,
            lastType: props.inputType,
        }
        this.defaultSize = 13;
        this.heightIncrement = 6;
        this.maxLength = props?.maxLength;
    }
    setComponentData(value) {
        if (value.length <= this.props.maxLength) {
            this.setState({
                value: this.props?.inputType === "number" ? this.returnNumber(value.trim()) : value
            });
            
            if (this.props?.onReturnData) {
                setTimeout(() => {
                    const { func, params } = this.props.onReturnData;
                    
                    func(this.props?.inputType === "number" ? this.returnNumber(value.trim()) : this.state.value, params ?? undefined);
                }, 0)
            }
        }
    }
    returnNumber(value) {
        for (let letter of value.split('')) {
            if (letter === " " || isNaN(Number(letter))) {
                return Number(value.slice(0, value.indexOf(letter)));
            }
        }
        return Number(value);
    }
    shortDateToDateFormat() {
        return this.state?.value?.length === 4 ? `${this.state?.value}-01-01` : this.state?.value;
    }
    returnShortDate() {
        return this.props.value?.includes('-') ? this.props.value?.slice(0, this.props.value.indexOf('-')) : this.props.value;
    }
    testShortDate = () => {
        const newValue = this.state?.value?.length === 4 ? `${this.state?.value}` : '';
 
        this.setState({
            value: newValue
        });

        if (this.props?.onReturnData) {
            setTimeout(() => {
                const { func, params } = this.props.onReturnData;
                func(this.props?.inputType === "yearOnly" ? this.shortDateToDateFormat() : this.state.value, params ?? undefined);
            }, 0)
        }
    }
    componentDidUpdate() {
        if (this.props.disabled !== this.state.lastState) {
            this.setState({
                value: this.props.value,
                lastState: this.props.disabled
            });
        }

        if (this.props.inputType !== this.state.lastType) {
            this.setState({
                value: '',
                lastType: this.props.inputType
            });
        }
    }
    renderComponent() {
        const inputStyle = {
            width: `${this.props.width}px`,
        }
        return (
            <div className={`${this.props?.removeBaseCSS ? '' : 'component-baseformat-container '}textbox-container${this.props?.fullWidth ? ' textbox-full' : ''}`} style={this.props?.style?.container}>
                {
                    this.props?.required || this.props?.caption ?
                        <span className="textbox-caption" style={{ fontSize: inputStyle.fontSize }}>{this.props?.required ? this._getRequiredSign() : null}{this.props?.caption ? this.props?.caption : null}</span>
                    : null
                }
                <div className="textbox-inputcontainer">
                    <div className={`textbox-inputbox${this.props?.disabled ? " disabled" : " enable"}${this.props?.invalid ? ' invalid' : ''}`} style={{ flexDirection: this.props?.inputIconReverse ? "row-reverse" : "" }}>
                        <input placeholder={this.props?.placeholder} onBlur={() => { if (this.props?.inputType === "yearOnly") { this.testShortDate() } }} spellCheck="true" value={this.props?.inputType === "yearOnly" ? this.returnShortDate() : this.state.value} type={this.props.inputType === "date" ? "date" : this.props.inputType === "password" ? "password" : "text"} className={`textbox-input${this.props.disabled ? " disabled" : " enable"}`} title={this.state.lastType === "password" ? '' : this.state.value} style={this.props?.style?.input ?? inputStyle} onChange={(event) => { if (!this.props?.disabled) {this.setComponentData(event.target.value)} }} />
                        {
                            this.props.inputIconPath ?
                                <div className="textbox-inputbox-icon">
                                    <img alt="" style={{ WebkitMaskImage: `url(${this.props.inputIconPath}.svg)`, maskImage: `url(${this.props.inputIconPath}.svg)` }} />
                                </div>
                            : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default TextBox;