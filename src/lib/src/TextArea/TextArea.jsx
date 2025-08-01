import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './textarea.css';


class TextArea extends BaseComponent {
    constructor(props) {
        super();
        this._propsRules = [
            { name: 'required', type: 'boolean'},
            { name: 'disabled', type: 'boolean'},
            { name: 'maxHeight', type: 'number' },
            { name: 'defaultHeight', type: 'number' },
            { name: 'onReturnData', type: 'CallbackObject' }
        ];
        this.state = {
            value: props.value ?? '',
            lastState: props.disabled
        }
    }
    setComponentData(value) {
        this.setState({
            value: value
        });

        if (this.props?.onReturnData) {
            setTimeout(() => {
                const { func, params } = this.props.onReturnData;
                func(this.state.value, params ?? undefined);
            }, 0)
        }
    }
    renderComponent() {
        return (
            <div className="textarea-container" style={{ minWidth: this.props?.width, maxWidth: this.props?.width }}>
                <div className="textarea-text-block">
                    {this.props?.caption ? 
                        <span className="textarea-text">
                            {this.props.required ? this._getRequiredSign() : null}{this.props.caption}
                        </span>
                    : null}
                </div>
                <textarea readOnly={this.props?.readOnly} spellCheck="true" className={`textarea-content ${this.props.disabled ? "disabled" : "enable"}`} value={this.state.value} onChange={(event) => { if (!this.props?.disabled) { this.setComponentData(event.target.value) } }} style={{ minHeight: `${this.props.defaultHeight}px`, maxHeight: `${this.props.maxHeight}px`, borderColor: this.props.invalid ? "red" : undefined }}></textarea>
            </div>
        );
    }
}

export default TextArea;