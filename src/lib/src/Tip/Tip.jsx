import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './tip.css';


class Tip extends BaseComponent {
    constructor() {
        super();
        this._propsRules = [{ name: 'children', required: true }];
        this.state = {
            tipBoxPosition: null,
            tipBoxDisplay: "none",
            tipBoxOpacity: 0
        }
    }
    showHelp() {
        this.setState({
            tipBoxDisplay: "block"
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
                tipBoxDisplay: "none"
            });
        }, 300);
    }
    renderComponent() {
        return (
            <div className="tip-container">
                <div className="tip-child-container">{this.props.children}</div>
                <div className="tip-iconbox">
                    <div className="tip-icon" >
                        <div className="tip-caption-block" style={{ display: this.state.tipBoxDisplay, opacity: this.state.tipBoxOpacity }}>{this.props?.caption}</div>
                        <div style={{ WebkitFilter: this.props?.addGlow ? `drop-shadow(0px 0px 5px ${this.props?.glowColor ?? this.props?.iconColor ?? 'black'})` : "none" }}>
                            <img alt="" style={{ WebkitMaskImage: this.props?.iconPath ? `url(${this.props.iconPath}.svg)` : '', maskImage: this.props?.iconPath ? `url(${this.props.iconPath}.svg)` : '', backgroundColor: this.props?.iconColor ?? "black" }} onMouseEnter={(event) => this.showHelp(event)} onMouseLeave={(event) => this.hideHelp(event)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Tip;