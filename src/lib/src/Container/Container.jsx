import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './container.css';


class Container extends BaseComponent {
    constructor() {
        super();
        this.requiredProps = [{ name: "children" }];
    }
    renderComponent() {
        return (
            <div className="container-box" style={{ borderWidth: this.props?.borderWeight ? `${this.props.borderWeight}px` : null, ...this.props?.boxStyles }}>
                {this.props?.caption ? <span className="container-caption">{this.props.caption}</span> : null}
                <div className="container-body" style={{ ...this.props?.bodyStyles }}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Container;