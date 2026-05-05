import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './contenthider.css';


class ContentHider extends BaseComponent {
    constructor(props) {
        super(props);
        this._propsRules = [
            { name: 'children', required: true },
            { name: 'caption', type: 'string' },
            { name: 'shrinked', type: 'boolean' },
            { name: 'maxHeight', type: 'number' }
        ];
        this.state = {
            shrinked: props?.shrinked ?? true,
            maxHeight: props?.maxHeight ? `${props.maxHeight}px` : null
        }
    }
    renderComponent() {
        const CSSVariables = {
            '--jsxrc-contentHider-actionColor-border': this.props?.actionBorderColor ?? this._baseActionColorBorder,
            '--jsxrc-contentHider-actionColor-shadow': this.props?.actionShadowColor ?? this._baseActionColorShadow
        };
        return (
            <div className="jsxrc-contenthider-container" style={{ width: this.props?.width ?? null, ...CSSVariables }}>
               <div className="jsxrc-contenthider-hider-container" title={this.props.caption} onClick={() => this.setState({ shrinked: !this.state.shrinked })}>
                    <div className="jsxrc-contenthider-hider">
                        <div className="jsxrc-contenthider-hider-caption">
                            {this.props.caption}
                        </div>
                        <div className="jsxrc-contenthider-hider-icon">
                            <img alt="" style={{ transform: `rotate(${this.state.shrinked ? 0 : -180}deg)` }} />
                        </div>
                    </div>
                </div>
                <div className="jsxrc-contenthider-body-container" style={{ height: this.state.shrinked ? "0px" : this.state.maxHeight ?? "100px" }}>
                    <div className="jsxrc-contenthider-body">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default ContentHider;