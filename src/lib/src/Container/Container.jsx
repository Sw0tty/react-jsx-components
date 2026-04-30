import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './container.css';


class Container extends BaseComponent {
    constructor() {
        super();
        this._propsRules = [
            { name: 'children', required: true },
            { name: 'caption', type: 'string' },
            { name: 'boxStyles', type: 'Object' },
            { name: 'bodyStyles', type: 'Object' }
        ];
    }
    renderComponent() {
        return (
            <div className="jsxrc-container-box" style={{ ...this.props?.boxStyles }}>
                {this.props?.caption ? <span className="jsxrc-container-caption">{this.props.caption}</span> : null}
                <div className="jsxrc-container-body" style={{ ...this.props?.bodyStyles }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Container;