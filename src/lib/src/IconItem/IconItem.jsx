import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './iconitem.css';


class IconItem extends BaseComponent {
    constructor() {
        super();
        this._propsRules = [{ name: 'iconPath', type: 'string' }, { name: 'iconColor', type: 'string' }, { name: 'size', type: 'string' }];
    }
    renderComponent() {
        return (
            <div className="iconitem-container">
                <div className="iconitem-iconbox" style={{ WebkitFilter: this.props?.addGlow ? `drop-shadow(0px 0px ${this.props?.glowStrong ?? "5px"} ${this.props?.glowColor ?? this.props.iconColor})` : "none" }}>
                    <img alt="" style={{ WebkitMaskImage: `url(${this.props.iconPath}.svg)`, maskImage: `url(${this.props.iconPath}.svg)`, backgroundColor: this.props.iconColor, width: this.props.size, height: this.props.size }} />
                </div>
            </div>
        );
    }
}

export default IconItem;