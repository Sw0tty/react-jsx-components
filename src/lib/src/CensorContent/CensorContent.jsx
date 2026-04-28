import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './censorcontent.css';


class CensorContent extends BaseComponent {
    constructor(props) {
        super();
        this._propsRules = [
            { name: 'captionStyle', type: 'Object' },
            { name: 'children', required: true },
            { name: 'type', required: true, constStrings: ['blur', 'blackout'] },
            { name: 'blurStrong', interval: [5, 15] },
            { name: 'onCancel', type: 'function' },
            { name: 'showBtns', type: 'boolean' }
        ];
        this.state = {
            censored: props?.censored ?? true
        }
    }
    renderComponent() {
        const blur = this.props?.blurStrong ? `blur(${this.props.blurStrong}px)` : 'blur(10px)';
        return (<div className="jsxrc-censorcontent-container">
            {
                this.state.censored ? 
                    <>
                        <div className="jsxrc-censorcontent-actions">
                            <div className="jsxrc-censorcontent-caption" style={this.props?.captionStyle}>{this.props.caption}</div>
                        </div>
                        
                        <div className={`jsxrc-censorcontent-button-left${this.props?.showBtns ? " jsxrc-censorcontent-button-left-show" : ""}`} onClick={() => this.setState({ censored: false })}>
                            <img alt="" />
                        </div>
                        {this.props?.onCancel ? <div className={`jsxrc-censorcontent-button-right${this.props?.showBtns ? " jsxrc-censorcontent-button-right-show" : ""}`} onClick={() => this.props.onCancel()}>
                            <img alt="" />
                        </div> : null}

                        <div className="jsxrc-censorcontent-background" style={{ background: this.props.type === 'blackout' ? "black" : null, WebkitBackdropFilter: this.props.type === 'blur' ? blur : null, backdropFilter: this.props.type === 'blur' ? blur : null}}></div>
                    </>
                : null
            }
            {this.props.children}
        </div>);
    }
}

export default CensorContent;