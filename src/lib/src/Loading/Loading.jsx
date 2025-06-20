import { Component } from 'react';
import Loading from './Loading.svg';
import './loading.css';


class Loading extends Component {
    render() {
        const blur = this.props?.blurStrong ? `blur(${this.props.blurStrong}px)` : "blur(5px)";
        return (
            <div className="loading-background" style={{ background: this.props?.blackout ? null : "none", WebkitBackdropFilter: blur, backdropFilter: blur }}>
                <div className="loading-container">
                    <img src={`/src/assets/${this.props?.icon ?? "Loading_1"}.svg`} style={{ width: `${this.props?.size}px`, animationDuration: this.props?.speed }} />
                </div>
            </div>
        );
    }
}

export default Loading;