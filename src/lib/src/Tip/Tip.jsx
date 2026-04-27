import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './tip.css';


class Tip extends BaseComponent {
    constructor() {
        super();
        this._propsRules = [
            { name: 'children', required: true },
            { name: 'type', required: true, constStrings: ['icon', 'text'] },
            { name: 'destroyCaptionSpace', type: 'boolean' }
        ];
        this.state = {
            tipBoxPosition: null,
            tipBoxDisplay: 'none',
            tipBoxOpacity: 0
        }
    }
    showHelp() {
        this.setState({
            tipBoxDisplay: 'block'
        });
        setTimeout(() => {
            this.setState({
                tipBoxOpacity: 1
            });
        }, 0);
    }
    hideHelp() {
        this.setState({
            tipBoxOpacity: 0
        });
        setTimeout(() => {
            this.setState({
                tipBoxDisplay: 'none'
            });
        }, 300);
    }
    renderComponent() {
        return (
            <div className="jsxrc-tip-container">
                <div>{this.props.children}</div>
                <div className="jsxrc-tip-type-container">
                    {
                        this.props?.type === 'text' ?
                            <div className={`jsxrc-tip-text-type-container${this.props?.destroyCaptionSpace ? " jsxrc-tip-caption-destroyed-space" : ""}`}>
                                <div className="jsxrc-tip-text-type-caption">{this.props?.caption}</div>
                            </div>
                        : this.props?.type === 'icon' ? 
                            <div className="jsxrc-tip-icon-type-container" >
                                <div className="jsxrc-tip-caption-block" style={{ display: this.state.tipBoxDisplay, opacity: this.state.tipBoxOpacity }}>{this.props?.caption}</div>
                                <div style={{ WebkitFilter: this.props?.addGlow ? `drop-shadow(0px 0px 5px ${this.props?.glowColor ?? this.props?.iconColor ?? "black"})` : "none" }}>
                                    <img draggable="false" alt="" style={{ WebkitMaskImage: this.props?.iconPath ? `url(${this.props.iconPath}.svg)` : "", maskImage: this.props?.iconPath ? `url(${this.props.iconPath}.svg)` : "", backgroundColor: this.props?.iconColor ?? "black" }} onMouseEnter={(event) => this.showHelp(event)} onMouseLeave={(event) => this.hideHelp(event)} />
                                </div>
                            </div>
                        :
                        null
                    }
                </div>
            </div>
        );
    }
}

export default Tip;