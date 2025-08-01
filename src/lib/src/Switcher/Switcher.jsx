import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './switcher.css';


class Switcher extends BaseComponent {
    constructor(props) {
        super(props);
        this._propsRules = [{ name: 'disabled', type: 'boolean' }];
        this.state = {
            value: props?.value ?? false
        }
    }
    renderComponent() {
        return (
            <div className="switcher-container ">
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