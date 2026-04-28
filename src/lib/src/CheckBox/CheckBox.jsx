import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './checkbox.css';


class CheckBox extends BaseComponent {
    constructor(props) {
        super();
        this._propsRules = [
            { name: 'value', type: 'boolean' },
            { name: 'disabled', type: 'boolean' },
            { name: 'caption', type: 'string' },
            { name: 'size', type: 'number' },
            { name: 'onReturnData', type: 'CallbackObject' }
        ];
        this.state = {
            value: props?.value ?? false,
            lastUpdate: props?.lastUpdate
        }
    }
    setComponentData(value) {
        this.setState({
            value: !value
        });

        if (this.props?.onReturnData) {
            setTimeout(() => {
                const { func, params } = this.props.onReturnData;
                func(!value, params ?? undefined);
            }, 0)
        }
    }
    componentCheckValueUpdate() {
        if (this.props.lastUpdate !== this.state.lastUpdate) {
            this.setState({
                value: this.props?.value ?? false,
                lastUpdate: this.props.lastUpdate
            });
        }
    }
    renderComponent() {
        this.componentCheckValueUpdate();
        const CSSVariables = {
            '--jsxrc-checkBox-actionColor-border': this.props?.actionBorderColor ?? this._baseActionColorBorder,
            '--jsxrc-checkBox-actionColor-shadow': this.props?.actionShadowColor ?? this._baseActionColorShadow,
            '--jsxrc-checkBox-checkColor': this.props?.checkColor ?? '#27c944'
        };
        return (
            <div className="jsxrc-checkbox-container" style={CSSVariables}>
                {this.props?.caption ? <span className="jsxrc-checkbox-caption">{this.props?.caption}</span> : null}
                <div className={`jsxrc-checkbox-box${this.props?.disabled ? " jsxrc-checkbox-disabled" : ''}`} style={{ width: this.props?.size ? `${this.props.size}px` : null, height: this.props?.size ? `${this.props.size}px` : null }} onClick={() => { if (!this.props?.disabled) {this.setComponentData(this.state.value)} }}>
                    <div className={`jsxrc-checkbox-box-filler${this.state.value ? " jsxrc-checkbox-checked" : ''}`}>
                        {this.state.value ? <img alt="" style={{ WebkitMaskImage: this.props?.iconPath ? `url(${this.props.iconPath}.svg)` : '', maskImage: this.props?.iconPath ? `url(${this.props.iconPath}.svg)` : '' }} /> : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default CheckBox;