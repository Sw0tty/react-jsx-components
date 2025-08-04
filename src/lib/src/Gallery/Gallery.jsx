import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './gallery.css';


class Gallery extends BaseComponent {
    constructor(props) {
        super();
        this.state = {
            selectedItemIdx: this.selectItemByName(props.selectedItem, props.items)
        };
        this._propsRules = [
            { name: 'itemDataKey', type: 'string' },
            { name: 'itemsSize', required: true, type: 'number' },
            { name: 'iconsSize', required: true, type: 'number', interval: [0, 100] }
        ];
    }
    selectItemByName = (iconName, items) => {
        let selectedIdx;
        items?.forEach((el, idx) => {
            if (el.iconName === iconName) {
                selectedIdx = idx;
                return;
            }
        });
        return selectedIdx;
    }
    renderComponent() {
        return (
            <div className="gallery-container" style={{ width: this.props?.cWidth, height: this.props?.cHeight}}>
                <div className="gallery-items-container">
                    {
                        this.props?.items ?
                            this.props.items.map((item, idx) => {
                                return (
                                    <div key={idx} className="gallery-item" title={`${item?.caption ?? ''}`} style={{ width: `${this.props?.itemsSize}px`, height: `${this.props?.itemsSize}px`, boxShadow: this.state.selectedItemIdx === idx ? "0px 0px 3px 3px var(--componentFocusShadowColor)" : null, borderColor: this.state.selectedItemIdx === idx ? "var(--componentHoverColor)" : null, transform: this.state.selectedItemIdx === idx ? "scale(1.02)" : null }} onClick={() => { this.setState({ selectedItemIdx: idx }); if (this.props?.onClickAction) { this.props.onClickAction.func(item.data, { ...this.props.onClickAction?.params }) } }}>
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