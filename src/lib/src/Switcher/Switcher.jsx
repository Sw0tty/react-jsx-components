import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './switcher.css';


class Switcher extends BaseComponent {
    constructor(props) {
        super(props);
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
            '--switcher-actionColor-border': this.props?.actionBorderColor ?? this._baseActionColorBorder,
            '--switcher-actionColor-shadow': this.props?.actionShadowColor ?? this._baseActionColorShadow
        };
        return (
            <div className="switcher-container" style={CSSVariables}>
                {this.props?.caption ? <div className="switcher-caption">{this.props.caption}</div> : null}
                <div className={`switcher-switch-block${this.props?.disabled ? ' disabled' : ''}`}>
                    <div className="switcher-inset-shadow"></div>
                    <div className="switcher-on-back" style={{ width: this.state.value ? "100%" : "10px" }}></div>
                    <div className="switcher-button-container" onClick={() => { if (!this.props?.disabled) {this.setComponentData('value', !this.state.value)} }}>
                        <div className="switcher-button"></div>
                    </div>
                    <div className="switcher-off-back"></div>
                </div>
            </div>
        );
    }
}

export default Switcher;