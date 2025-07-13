import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './contenthider.css';
import ArrowDown from './ArrowDown.svg';


class ContentHider extends BaseComponent {
    constructor(props) {
        super(props);
        this.requiredProps = [{ name: 'children' }, { name: 'caption', type: 'string' }];
        this.state = {
            shrinked: props?.shrinked ?? true,
            maxHeight: props?.maxHeight ? `${props.maxHeight}px` : null
        }
    }
    renderComponent() {
        return (
            <div className="contenthider-container" style={{ width: this.props?.width ?? null }}>
               <div className="contenthider-hider-container" title={this.props.caption} onClick={() => this.setState({ shrinked: !this.state.shrinked })}>
                    <div className="contenthider-hider">
                        <div className="contenthider-hider-caption">
                            {this.props.caption}
                        </div>
                        <div className="contenthider-hider-icon">
                            <img alt="" style={{ WebkitMaskImage: `url(${ArrowDown})`, maskImage: `url(${ArrowDown})`, transform: `rotate(${this.state.shrinked ? 0 : -180}deg)` }} />
                        </div>
                    </div>
                </div>
                <div className="contenthider-body-container" style={{ height: this.state.shrinked ? "0px" : this.state.maxHeight ?? "100px" }}>
                    <div className="contenthider-body">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default ContentHider;