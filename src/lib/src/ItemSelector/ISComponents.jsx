import { Component } from "react";
import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './iscomponents.css';


export class ISModalWrapper extends Component {
    constructor(props) {
        super();
        this.state = {
            hidden: props.hidden,
            marginTop: props?.marginTop ?? "100px",
            bindingElement: {
                willShow: false,
                display: "none"
            }
        }
    }
    hideModalHandler = () => {
        const CSSTransitionTime = 300;

        this.setState({
            hidden: this.props.hidden
        });

        if (this.props.hidden) {
            this.setState(prevState => ({
                bindingElement: {
                    ...prevState.bindingElement,
                    willShow: false
                }
            }));

            setTimeout(() => {
                this.setState(prevState => ({
                    bindingElement: {
                        ...prevState.bindingElement,
                        display: "none"
                    }
                }));
            }, CSSTransitionTime);
        } else {
            this.setState(prevState => ({
                bindingElement: {
                    ...prevState.bindingElement,
                    display: "flex"
                }
            }));

            setTimeout(() => {
                this.setState(prevState => ({
                    bindingElement: {
                        ...prevState.bindingElement,
                        willShow: true
                    }
                }));
            }, 0);
        }
    }
    componentDidUpdate() {
        if (this.state.hidden !== this.props.hidden) {
            this.hideModalHandler();
        }
    }
    componentDidMount() {
        this.hideModalHandler();
    }
    render() {
        return (
            this.state.bindingElement.display === "none" ? null :
                <div className="ismodalwrapper-background" style={{ display: this.state.bindingElement.display, opacity: this.state?.bindingElement?.willShow ? 1 : 0 }}>
                    <div className="ismodalwrapper-container" style={{ marginTop: this.state?.bindingElement?.willShow ? this.state.marginTop : 0, height: this.props?.fullScreen ? `calc(100% - ${this.state.marginTop} - ${this.state.marginTop})` : null }}>
                        {this.props.children}
                    </div>
                </div>
        );
    }
}


export class ISButton extends Component {
    constructor() {
        super();
        this.requiredProps = ['caption', 'type'];
        this.baseHoverColor = "#5eaac5";
    }
    render() {
        return (
            <div className="isbutton-container">
                <div style={{ ...this.props?.style, '--isbuttonHoverColor': this.props?.hoverColor ?? this.baseHoverColor, flexDirection: this.props?.reverse ? "row-reverse" : null }} onClick={(event) => this.props?.onClickAction?.func({ event: event, ...this.props?.onClickAction?.params })} className="isbutton-button">
                    {this.props?.iconPath ? <div className="isbutton-icon">
                        <img alt="" className="isbutton-icon-imgicon" style={{ WebkitMaskImage: `url(${this.props.iconPath}.svg)`, maskImage: `url(${this.props.iconPath}.svg)` }} />
                    </div> : null}
                    {this.props.caption}
                </div>
            </div>
        );
    }
}


export class ISGallery extends BaseComponent {
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
            <div className="isgallery-container" style={{ width: this.props?.cWidth, height: this.props?.cHeight}}>
                <div className="isgallery-items-container">
                    {
                        this.props?.items ?
                            this.props.items.map((item, idx) => {
                                return (
                                    <div key={idx} className="isgallery-item" title={`${item?.caption ?? ''}`} style={{ width: `${this.props?.itemsSize}px`, height: `${this.props?.itemsSize}px`, boxShadow: this.state.selectedItemIdx === idx ? "0px 0px 3px 3px var(--componentFocusShadowColor)" : null, borderColor: this.state.selectedItemIdx === idx ? "var(--componentHoverColor)" : null, transform: this.state.selectedItemIdx === idx ? "scale(1.02)" : null }} onClick={() => { this.setState({ selectedItemIdx: idx }); if (this.props?.onClickAction) { this.props.onClickAction.func(item.data, { ...this.props.onClickAction?.params }) } }}>
                                        <div className="isgallery-item-icon">
                                            <img alt="" style={{ height: this.props?.iconsSize ? `${this.props?.iconsSize}%` : null, width: this.props?.iconsSize ? `${this.props?.iconsSize}%` : null }} src={`${item?.iconPath ?? this.props?.iconsPath ?? '/'}${item.iconName}`} />
                                        </div>
                                        {
                                            item?.caption ?
                                                <div className="isgallery-item-caption">{item.caption}</div>
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