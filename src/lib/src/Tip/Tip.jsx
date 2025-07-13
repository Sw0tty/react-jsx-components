//import PropTypes from 'prop-types';
import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import Question from './Question.svg';
import './tip.css';


class Tip extends BaseComponent {
    constructor() {
        super();
        this.requiredProps = [{ name: 'children' }];
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
                            <img alt="" style={{ WebkitMaskImage: this.props?.iconPath ? `url(${this.props.iconPath}.svg)` : `url(${Question})`, maskImage: this.props?.iconPath ? `url(${this.props.iconPath}.svg)` : `url(${Question})`, backgroundColor: this.props?.iconColor ?? "black" }} onMouseEnter={(event) => this.showHelp(event)} onMouseLeave={(event) => this.hideHelp(event)} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
// Tip.propTypes = {
//     children: PropTypes.any.isRequired,
//     caption: PropTypes.string,
//     addGlow: PropTypes.bool,
//     icon: PropTypes.string,
//     iconColor: PropTypes.string
// }


export default Tip;