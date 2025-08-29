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
            { name: 'language', type: 'string', constStrings: ['en', 'ru'] }
        ];
        this.state = {
            censored: props?.censored ?? true
        }
    }
    renderComponent() {
        const blur = this.props?.blurStrong ? `blur(${this.props.blurStrong}px)` : "blur(10px)";
        return (<div className="censorcontent-container">
            {
                this.state.censored ? 
                    <>
                        <div className="censorcontent-actions">
                            <div className="censorcontent-caption" style={this.props?.captionStyle}>{this.props.caption}</div>
                            <div className="censorcontent-buttons-container">
                                <div className="censorcontent-button" onClick={() => this.setState({ censored: false })}>{this.props?.language === "ru" ? 'Показать' : 'Show'}</div>
                                {this.props?.onCancel ? <div className="censorcontent-button" onClick={() => this.props.onCancel()}>{this.props?.language === "ru" ? 'Отмена' : 'Cancel'}</div> : null}
                            </div>
                        </div>
                        <div className="censorcontent-background" style={{ background: this.props.type === 'blackout' ? "black" : null, WebkitBackdropFilter: this.props.type === 'blur' ? blur : null, backdropFilter: this.props.type === 'blur' ? blur : null}}></div>
                    </>
                : null
            }
            {this.props.children}
        </div>);
    }
}

export default CensorContent;