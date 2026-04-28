import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './colorpicker.css';


class ColorPicker extends BaseComponent {
    constructor(props) {
        super();
        this._propsRules = [
            { name: 'invalid', type: 'boolean' },
            { name: 'disabled', type: 'boolean' },
            { name: 'onReturnData', type: 'CallbackObject' }
        ];
        this.state = {
            value: props?.value ?? '#ffffff',
            lastUpdate: props?.lastUpdate
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
    componentCheckValueUpdate() {
        if (this.props.lastUpdate !== this.state.lastUpdate) {
            this.setState({
                value: this.props?.value ?? '#ffffff',
                lastUpdate: this.props.lastUpdate
            });
        }
    }
    renderComponent() {
        this.componentCheckValueUpdate();
        const CSSVariables = {
            '--jsxrc-colorPicker-actionColor-border': this.props?.actionBorderColor ?? this._baseActionColorBorder,
            '--jsxrc-colorPicker-actionColor-shadow': this.props?.actionShadowColor ?? this._baseActionColorShadow
        };
        return (
            <div className="jsxrc-colorpicker-container" style={{...this.props?.style, ...CSSVariables}}>
                {this.props?.caption ? <span className="jsxrc-colorpicker-caption">{this.props.caption}</span> : null}
                <input type="color" className={`jsxrc-colorpicker${this.props.disabled ? ' jsxrc-disabled' : ' jsxrc-enable'}${this.props?.invalid ? ' jsxrc-colorpicker-invalid' : ''}`} value={this.state.value} onChange={(event) => { this.setComponentData(event.target.value) }} />
            </div>
        );
    }
}

export default ColorPicker;