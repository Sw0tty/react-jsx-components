import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import LoadingIcon from './Loading.svg';
import './loading.css';


class Loading extends BaseComponent {
    constructor() {
        super();
        this.requiredProps = ['children', 'isLoading'];
    }
    renderComponent() {
        const blur = this.props?.blurStrong ? `blur(${this.props.blurStrong}px)` : "blur(5px)";
        return (
            <div className="loading-container" style={this.props?.containerStyles}>
                <div className="loading-background-2" style={{ WebkitBackdropFilter: this.props?.isLoading ? blur : null, backdropFilter: this.props.isLoading ? blur : null, background: this.props.isLoading ? "#00000024" : null }}></div>
                {
                    this.props.isLoading ?
                        <div className="loading-icon-container">
                            <img alt="" src={this.props?.iconPath ?? LoadingIcon} style={{ width: `${this.props?.size}px`, animationDuration: this.props?.speed }} />
                        </div>
                    : null
                }
                {this.props.children}
            </div>
        );
    }
}

export default Loading;