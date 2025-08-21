import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './checkbox.css';


// --- Components params ---
// value             (bool)   - default value of input
// caption           (string) - caption
// size              (int)    - size of checkbox
// onReturnData      (func)   - callback function for current data
// settledParamName  (string) - name of param in parent object


class CheckBox extends BaseComponent {
    constructor(props) {
        super();
        this._propsRules = [
            { name: 'value', type: 'boolean' },
            { name: 'disabled', type: 'boolean' },
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
            '--checkBox-actionColor-border': this.props?.actionBorderColor ?? this._baseActionColorBorder,
            '--checkBox-actionColor-shadow': this.props?.actionShadowColor ?? this._baseActionColorShadow,
            '--checkBox-checkColor': this.props?.checkColor ?? '#27c944'
        };
        return (
            <div className="checkbox-container" style={CSSVariables}>
                {this.props?.caption ? <span className="checkbox-caption">{this.props?.caption}</span> : null}
                <div className={`checkbox-box${this.props?.disabled ? " disabled" : ''}`} style={{ width: this.props?.size ? `${this.props.size}px` : null, height: this.props?.size ? `${this.props.size}px` : null }} onClick={() => { if (!this.props?.disabled) {this.setComponentData(this.state.value)} }}>
                    <div className={`checkbox-box-filler${this.state.value ? " checked" : ''}`}>
                        {this.state.value ? <img alt="" style={{ WebkitMaskImage: this.props?.iconPath ? `url(${this.props.iconPath}.svg)` : '', maskImage: this.props?.iconPath ? `url(${this.props.iconPath}.svg)` : '' }} /> : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default CheckBox;