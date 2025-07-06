import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './colorpicker.css';


class ColorPicker extends BaseComponent {
    constructor(props) {
        super();
        this.requiredProps = ['disabled'];
        this.state = {
            value: props?.value ?? "#ffffff"
        }
    }
    setComponentData(value) {
        this.setState({
            value
        });

        if (this.props?.onReturnData) {
            setTimeout(() => {
                const { func, params } = this.props.onReturnData;
                func(value, params ?? undefined);
            }, 0)
        }
    }
    componentDidUpdate() {
        //this.updateValueState({ stateKey: "value", newValue: this.props?.value, lastStateValue: this.state.value});
    }
    renderComponent() {
        return (
            <div className="colorpicker-container" style={this.props?.style}>
                {this.props?.caption ? <span className="colorpicker-caption">{this.props.caption}</span> : null}
                <input type="color" className={`colorpicker${this.props.disabled ? ' disabled' : ' enable'}${this.props?.invalidData ? ' invalid' : ''}`} value={this.state.value} onChange={(event) => { this.setComponentData(event.target.value) }} />
            </div>
        );
    }
}

export default ColorPicker;