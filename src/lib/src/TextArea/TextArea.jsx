import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './textarea.css';

// --- Components params ---
// width          (int)    - component width
// defaultHeight  (int)    - start and min component height
// maxHeight      (int)    - max component height
// caption        (string) - caption
// value          (string) - default value in component
// required       (bool)   - showing required sign
// disabled       (bool)   - can be edited
// invalidData    (bool)   - null or invalid input by user
// readOnly       (bool)   - value is read only

class TextArea extends BaseComponent {
    constructor(props) {
        super();
        this.requiredProps = [{ name: 'required', type: 'boolean'}, { name: 'disabled', type: 'boolean'}, { name: 'maxHeight', type: 'number' }];
        this.state = {
            data: props.value ?? '',
            lastState: props.disabled
        }
    }
    setComponentData(value) {
        this.setState({
            data: value
        });

        if (this.props?.onReturnData) {
            setTimeout(() => {
                const { func, params } = this.props.onReturnData;
                func(this.state.data, params ?? undefined);
            }, 0)
        }
    }
    componentDidUpdate() {
        if (this.props.disabled !== this.state.lastState) {
            this.setState({
                data: this.props.value ?? '',
                lastState: this.props.disabled
            });
        }
    }
    renderComponent() {
        return (
            <div className="textarea-container" style={{ minWidth: this.props?.width, maxWidth: this.props?.width }}>
                <div className="textarea-text-block">
                    {this.props?.caption ? 
                        <span className="textarea-text">
                            {this.props.required ? this.getRequiredSign() : null}{this.props.caption}
                        </span>
                    : null}
                </div>
                <textarea readOnly={this.props?.readOnly} spellCheck="true" className={`textarea-content ${this.props.disabled ? "disabled" : "enable"}`} value={this.state.data} onChange={(event) => this.setComponentData(event.target.value)} style={{ minHeight: `${this.props.defaultHeight}px`, maxHeight: `${this.props.maxHeight}px`, borderColor: this.props.invalidData ? "red" : undefined }}></textarea>
            </div>
        );
    }
}

export default TextArea;