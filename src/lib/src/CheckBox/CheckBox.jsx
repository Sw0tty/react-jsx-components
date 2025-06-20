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
        this.requiredProps = ['disabled'];
        this.state = {
            data: props.value ?? false,
        }
    }
    setComponentData() {
        const { func, params } = this.props.onReturnData;
        func(!this.props.value, params ?? undefined);
        this.props.onBindingData ? this.props.onBindingData(this.props.bindingParamName) : null;
        //this.props.onBindingData ? this.props.onBindingData.func(this.props.onBindingData?.params) : null;
    }
    renderComponent() {
        return (
            <div className="checkbox-container">
                <>
                    {this.props?.caption ? <span className="checkbox-caption">{this.props?.caption} :</span> : null}
                    <div className={`checkbox-box${this.props.disabled ? " disabled" : ''}`} style={{ width: this.props?.size ? `${this.props.size}px` : null, height: this.props?.size ? `${this.props.size}px` : null }} onClick={() => this.setComponentData()}>
                        <div className={`checkbox-box-filler${this.props?.value ? " checked" : ''}`}>
                            {this.props?.icon && this.props?.value ? <img style={{ WebkitMaskImage: `url(/src/assets/${this.props?.icon}.svg)`, maskImage: `url(/src/assets/${this.props?.icon}.svg)` }} /> : null}
                        </div>
                    </div>
                </>
            </div>
        );
    }
}

export default CheckBox;