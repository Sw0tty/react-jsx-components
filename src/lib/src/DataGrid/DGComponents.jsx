import { Component, createRef } from "react";
import { Link } from 'react-router-dom';
import Loupe from './Loupe.svg';
import Check from './Check.svg';
import './dgcomponents.css';


export class DGTool extends Component {
    checkRequiredProps = (requiredParams) => {
        for (let param of requiredParams) {
            if (!(param in this.props)) {
                return <div className="dgtool-error-container"><span>{`ERROR! Field '${param}' is required`}</span></div>;
            }
        }
    }
    render() {
        const baseHoverColor = "#5eaac5";

        return (
            this.checkRequiredProps(['disabled', 'caption']) ??
            <Link style={{ '--dgtoolHoverColor': this.props?.hoverColor ?? baseHoverColor }} onClick={(event) => this.props?.onClickAction?.action ? this.props.onClickAction.action?.func({ event: event, ...this.props.onClickAction.action?.params }) : null} to={this.props?.onClickAction?.redirect ? `/${this.props?.onClickAction?.redirect?.path}` : window.location.href} className={`dgtool-button${this.props.disabled ? " disabled" : ''}`} >
                {
                    this.props?.icon ?
                        <div className="dgtool-button-icon">
                            {
                                this.props?.isImage ?
                                    <img src={`/src/assets/${this.props.icon}.svg`} /> :
                                    <img className="dgtool-button-imgicon" style={{ WebkitMaskImage: `url(/src/assets/${this.props.icon}.svg)`, maskImage: `url(/src/assets/${this.props.icon}.svg)` }} />
                            }
                        </div>
                    : null
                }
                <div className="dgtool-button-caption" style={this.props?.styles?.hoverColor ? { '--hover-color': this.props?.styles?.hoverColor } : null}>
                    {this.props.caption}
                </div>
            </Link>
        );
    }
}


export class DGCheckBox extends Component {
    constructor(props) {
        super();
        this.state = {
            value: props?.value ?? false,
        }
    }
    setComponentData(value) {
        this.setState({
            value: !value
        });

        if (this.props?.onReturnData) {
            setTimeout(() => {
                const { func, params } = this.props.onReturnData;
                func(!value, params ?? undefined);
            }, 0)
        }
    }
    render() {
        return (
            <div className="dgcheckbox-container">
                <>
                    {this.props?.caption ? <span className="dgcheckbox-caption">{this.props?.caption}</span> : null}
                    <div className={`dgcheckbox-box`} style={{ width: this.props?.size ? `${this.props.size}px` : null, height: this.props?.size ? `${this.props.size}px` : null }} onClick={() => this.setComponentData(this.state.value)}>
                        <div className={`dgcheckbox-box-filler${this.state.value ? " dgcheckbox-checked" : ''}`}>
                            {this.state.value ? <img style={{ WebkitMaskImage: `url(${Check})`, maskImage: `url(${Check})` }} /> : null}
                        </div>
                    </div>
                </>
            </div>
        );
    }
}


export class DGButton extends Component {
    constructor() {
        super();
        this.requiredProps = ['caption', 'type'];
        this.baseHoverColor = "#5eaac5";
    }
    render() {
        return (
            <div className="dgbutton-container">
                <div style={{ ...this.props?.style, '--datagridbuttonHoverColor': this.props?.hoverColor ?? this.baseHoverColor, flexDirection: this.props?.reverse ? "row-reverse" : null }} onClick={(event) => this.props?.onClickAction?.func({ event: event, ...this.props?.onClickAction?.params })} className="dgbutton-button">
                    {this.props?.iconPath ? <div className="dgbutton-icon">
                        <img className="dgbutton-icon-imgicon" style={{ WebkitMaskImage: `url(${this.props.iconPath}.svg)`, maskImage: `url(${this.props.iconPath}.svg)` }} />
                    </div> : null}
                    {this.props.caption}
                </div>
            </div>
        );
    }
}


export class DGSearchTool extends Component {
    constructor(props) {
        super();
        this.requiredProps = ['width', 'disabled', 'required', 'maxLength'];
        this.state = {
            value: props.value ?? '',
            lastState: props.disabled,
        }
        this.defaultSize = 13;
        this.heightIncrement = 6;
        this.maxLength = 255;
    }
    setComponentData(value) {
        if (value.length <= this.maxLength) {
            this.setState({
                value: value
            });
        }

        if (this.props?.onReturnData) {
            setTimeout(() => {
                const { func, params } = this.props.onReturnData;
                func(this.state.value, params ?? undefined);
            }, 0)
        }
    }
    componentDidUpdate() {
        if (this.props.disabled !== this.state.lastState) {
            this.setState({
                value: this.props.value,
                lastState: this.props.disabled
            });
        }
    }
    render() {
        const inputStyle = {
            width: `${this.props.width}px`,
        }
        return (
            <div className={`${this.props?.removeBaseCSS ? '' : 'component-baseformat-container '}dgsearchtool-container${this.props?.fullWidth ? ' dgsearchtool-full' : ''}`} style={this.props?.style?.container}>
                {
                    this.props.required || this.props?.caption ?
                        <span className="component-baseformat-text dgsearchtool-caption" style={{ fontSize: inputStyle.fontSize }}>{this.props.required ? this.getRequiredSign() : null}{this.props?.caption ? this.props?.caption : null}</span>
                    : null
                }
                <div className="dgsearchtool-inputcontainer">
                    <div className={`dgsearchtool-inputbox${this.props.disabled ? " disabled" : " enable"}${this.props?.invalid ? ' invalid' : ''}`} style={{ flexDirection: this.props?.inputIconReverse ? "row-reverse" : "" }}>
                        <input placeholder={this.props?.placeholder} value={this.state.value} type="text" className={`dgsearchtool-input${this.props.disabled ? " disabled" : " enable"}`} title={this.state.value} style={this.props?.style?.input ?? inputStyle} onChange={(event) => this.setComponentData(event.target.value)} />
                        {
                            this.props.inputIconPath ?
                                <div className="dgsearchtool-inputbox-icon">
                                    <img alt="" style={{ WebkitMaskImage: `url(${Loupe})`, maskImage: `url(${Loupe})` }} />
                                </div>
                            : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}


export class DGContextMenu extends Component {
    constructor() {
        super();
        this.wrapperRef = createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.contextHeight = null;
    }
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }
    handleClickOutside(event) {
        this.props.onHide();
    }
    componentDidUpdate() {
        if (this.wrapperRef?.current) {
            if (this.state?.contextHeight != this.wrapperRef.current.offsetHeight) {
                this.setState({
                    contextHeight: this.wrapperRef.current.offsetHeight
                });
            }
        }
    }
    render() {
        const baseHoverColor = "#13b3eb";
        return (
            <DGContextMenuWrapper hidden={this.props.hidden}>
                <div ref={this.wrapperRef} style={{ left: `${this.props?.contextPos?.x}px`, top: `${this.props?.contextPos?.y - (this.state?.contextHeight + this.props?.contextPos?.y > window.innerHeight ? this.state?.contextHeight : 0)}px` }} className="dgcontextmenu-container">
                    {
                        this.props.contextActions.map((itemsGroup, groupIdx) => {
                            return (
                                <div key={groupIdx}>
                                    {itemsGroup.map((item, idx) => {
                                        return (
                                            <Link key={idx} title={item.caption} style={{ '--dgcontextMenuHoverColor': item?.color ?? baseHoverColor }} className="dgcontextmenu-element" onClick={(event) => item?.onClick?.func ? item.onClick?.func({ event: event, ...item.onClick?.params }) : this.props.onHide()} to={!(item?.onClick?.func) && item?.onClick?.redirect ? `/${item?.onClick?.redirect}` : ''} >
                                                <div className="dgcontextmenu-element-icon">
                                                    <img style={{ WebkitMaskImage: `url(/src/assets/${item.icon}.svg)`, maskImage: `url(/src/assets/${item.icon}.svg)` }} />
                                                </div>
                                                <div className="dgcontextmenu-element-caption">{item.caption}</div>
                                            </Link>
                                        );
                                    })}
                                    {groupIdx + 1 != this.props.contextActions.length ? <div className="dgcontextmenu-separator"></div> : null}
                                </div>
                            );
                        })
                    }
                </div>
            </DGContextMenuWrapper>
        );
    }
}

class DGContextMenuWrapper extends Component {
    constructor(props) {
        super();
        this.state = {
            hidden: props.hidden,
            bindingElement: {
                willShow: false,
                display: "none"
            }
        }
    }
    hideModalHangler = () => {
        const CSSTransitionTime = 100;

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
        if (this.state.hidden != this.props.hidden) {
            this.hideModalHangler();
        }
    }
    componentDidMount() {
        this.hideModalHangler();
    }
    render() {
        return (
            this.state.bindingElement.display == "none" ? null :
                <div className="dgcontextmenuwrapper-container" style={{ display: this.state.bindingElement.display, opacity: this.state?.bindingElement?.willShow ? 1 : 0 }}>
                    {this.props.children}
                </div>
        );
    }
}
