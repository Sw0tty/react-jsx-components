import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './inputtext.css';


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

class InputText extends BaseComponent {
    constructor(props) {
        super();
        this.state = {
            value: props.value ?? '',
            minYear: 1700,
            lastState: props.disabled,
            lastType: props.inputType,
            helpParams: {
                helpBlockPos: null,
                blockDisplay: "none",
                blockOpacity: 0
            },
        }
        this.defaultSize = 13;
        this.heightIncrement = 6;
        this.maxLength = props?.inputType == "yearOnly" ? 4 : props?.maxLength;
    }
    setComponentData(value) {
        const maxLength = this.props?.inputType == "yearOnly" ? 4 : this.props?.maxLength

        if (value.length <= maxLength) {
            this.setState({
                value: this.props?.inputType == "yearOnly" || this.props?.inputType == "number" ? this.returnNumber(value.trim()) : value
            });
        }

        this.props?.onReturnData ? setTimeout(() => {
            const { func, params } = this.props.onReturnData;
            func(this.props?.inputType == "yearOnly" || this.props?.inputType == "number" ? this.shortDateToDateFormat() : this.state.value, params ?? undefined);
        }, 0) : null;
    }
    showHelp(event) {
        this.setState((prevState) => ({
            helpParams: {
                ...prevState.helpParams,
                helpBlockPos: event.target.getBoundingClientRect(),
                blockDisplay: "block"
            }
        }));
        setTimeout(() => {
            this.setState((prevState) => ({
                helpParams: {
                    ...prevState.helpParams,
                    blockOpacity: 1
                }
            }));
        }, 0);
    }
    hideHelp(event) {
        this.setState((prevState) => ({
            helpParams: {
                ...prevState.helpParams,
                helpBlockPos: event.target.getBoundingClientRect(),
                blockOpacity: 0
                
            }
        }));
        setTimeout(() => {
            this.setState((prevState) => ({
                helpParams: {
                    ...prevState.helpParams,
                    blockDisplay: "none"
                }
            }));
        }, 300);
    }
    returnNumber(value) {
        for (let letter of value.split('')) {
            if (letter === " " || isNaN(Number(letter))) {
                return value.slice(0, value.indexOf(letter));
            }
        }
        return value;
    }
    shortDateToDateFormat() {
        return this.state?.value?.length == 4 ? `${this.state?.value}-01-01` : this.state?.value;
    }
    returnShortDate() {
        return this.props.value?.includes('-') ? this.props.value?.slice(0, this.props.value.indexOf('-')) : this.props.value;
    }
    testShortDate = () => {
        const newValue = this.state?.value?.length == 4 ? `${this.state?.value}` : '';
 
        this.setState({
            value: newValue
        });
        this.props?.onReturnData ? setTimeout(() => {
            const { func, params } = this.props.onReturnData;
            func(this.props?.inputType == "yearOnly" ? this.shortDateToDateFormat() : this.state.value, params ?? undefined);
        }, 0) : null;
    }
    componentDidUpdate() {
        if (this.props.disabled != this.state.lastState) {
            this.setState({
                value: this.props.value,
                lastState: this.props.disabled
            });
        }

        if (this.props.inputType != this.state.lastType) {
            this.setState({
                value: '',
                lastType: this.props.inputType
            });
        }
    }
    render() {
        const inputStyle = {
            width: `${this.props.width}px`,
        }
        return (
            <>
                {this.checkRequiredProps(['width', 'disabled', 'required', 'maxLength']) ??
                    <div className={`${this.props?.removeBaseCSS ? '' : 'component-baseformat-container '}textbox-container${this.props?.fullWidth ? ' textbox-full' : ''}`} style={this.props?.style?.container}>
                        {
                            this.props.required || this.props?.caption ?
                                <span className="component-baseformat-text textbox-caption" style={{ fontSize: inputStyle.fontSize }}>{this.props.required ? this.getRequiredSign() : null}{this.props?.caption ? `${this.props?.caption} :` : null}</span>
                            : null
                        }
                        <div className="textbox-inputcontainer">
                            <div className={`textbox-inputbox${this.props.disabled ? " disabled" : " enable"}${this.props?.invalidData ? ' invalid' : ''}`} style={{ flexDirection: this.props?.inputIcon?.alignLeft ? "row-reverse" : "" }}>
                                <input placeholder={this.props?.placeholder} onBlur={() => { this.props?.inputType == "yearOnly" ? this.testShortDate() : null }} spellCheck="true" value={this.props?.inputType == "yearOnly" ? this.returnShortDate() : this.state.value} type={this.props.inputType == "date" ? "date" : this.props.inputType == "password" ? "password" : "text"} className={`textbox-input${this.props.disabled ? " disabled" : " enable"}`} title={this.state.lastType == "password" ? '' : this.state.value} style={this.props?.style?.input ?? inputStyle} onChange={(event) => this.setComponentData(event.target.value)} />
                                {
                                    this.props.inputIcon?.icon ?
                                        <div className="textbox-inputbox-icon">
                                            <img style={{ WebkitMaskImage: `url(/src/assets/${this.props?.inputIcon?.icon}.svg)`, maskImage: `url(/src/assets/${this.props?.inputIcon?.icon}.svg)` }} />
                                        </div>
                                    : null
                                }
                            </div>
                        </div>
                    </div>
                }
            </>
        );
    }
}

export default InputText;