import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './gallery.css';


/*box - shadow: 0px 0px 3px 3px var(--componentFocusShadowColor);
border - color: var(--componentHoverColor);
transform: scale(1.02);*/

class Gallery extends BaseComponent {
    constructor() {
        super();
        this._propsRules = [{ name: 'itemDataKey', type: 'string' }];
    }
    //setComponentData
    renderComponent() {
        const selectedStyle = {
            boxShadow: "0px 0px 3px 3px var(--componentFocusShadowColor)",
            borderColor: "var(--componentHoverColor)",
            transform: "scale(1.02)"
        }
        return (
            <div className="gallery-container" style={{ width: this.props?.cWidth, height: this.props?.cHeight}}>
                <div className="gallery-items-container">
                    {
                        this.props?.items ?
                            this.props.items.map((item, idx) => {
                                return (
                                    <div key={idx} className="gallery-item" title={`${item?.caption ?? ''}`} style={{ width: this.props?.itemSize, height: this.props?.itemSize }} style1={ this.props.selectedItem === item[this.props.itemDataKey] ? selectedStyle : null } onClick={() => { this.setComponentData('selectedItem', idx); this.props.onClick.func(item.data, { ...this.props.onClick?.params }) }} onDoubleClick={() => this.props.onDoubleClick.func(item.data, { ...this.props.onDoubleClick?.params })}>
                                        <div className="gallery-item-icon">
                                            <img alt="" style={{ height: this.props?.iconsSize ? `${this.props?.iconsSize}%` : null, width: this.props?.iconsSize ? `${this.props?.iconsSize}%` : null }} src={`${item?.iconPath ?? this.props?.iconsPath ?? '/'}${item.iconName}`} />
                                        </div>
                                        {
                                            item?.caption ?
                                                <div className="gallery-item-caption">{item.caption}</div>
                                            : null
                                        }
                                    </div>
                                )
                            })
                            : "Not data"
                    }
                </div>
            </div>
        );
    }
}


export default Gallery;