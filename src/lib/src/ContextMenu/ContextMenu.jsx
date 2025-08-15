import { createRef } from 'react';
import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import { Component } from 'react';
import { Link } from 'react-router-dom';
import './contextmenu.css';


class ContextMenu extends BaseComponent {
    constructor() {
        super();
        this._propsRules = [
            { name: 'children', required: true },
            { name: 'contextActions', required: true, type: 'ArrayOfObjects' },
            { name: 'iconsPath', type: 'string' }
        ];
        this.baseHoverColor = "#13b3eb";
        this.wrapperRef = createRef();
        this.childrenRef = createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.contextHeight = null;
        this.state = {
            hidden: true
        }
    }
    componentDidMount() {
        if (this.childrenRef.current) {
            document.addEventListener("mousedown", this.handleClickOutside);
        }
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }
    handleClickOutside(event) {
        if ((this.childrenRef && !this.childrenRef.current?.contains(event.target)) || event.button === 0) {
            this.setState({
                hidden: true
            });
        } else {
            this.setState({
                hidden: false
            });
        }
    }
    componentDidUpdate() {
        if (this.wrapperRef?.current) {
            if (this.state?.contextHeight !== this.wrapperRef.current.offsetHeight) {
                this.setState({
                    contextHeight: this.wrapperRef.current.offsetHeight
                });
            }
        }
    }
    showContext = (event) => {
        
        event.preventDefault();

        this.setState({
            hidden: false,
            contextPos: {
                x: event.nativeEvent.offsetX,
                y: event.nativeEvent.offsetY
            }
         })
    }
    renderComponent() {
        return (
            <div style={{ position: "relative" }}>
                <div ref={this.childrenRef} onContextMenu={(event) => { this.showContext(event) } }>{this.props.children}</div>
                <CMWrapper hidden={this.state.hidden}>
                    <div ref={this.wrapperRef} style={{ left: `${this.state?.contextPos?.x}px`, top: `${this.state?.contextPos?.y - (this.state?.contextHeight + this.state?.contextPos?.y > window.innerHeight ? this.state?.contextHeight : 0)}px` }} className="contextmenu-container">
                        {
                            this.props.contextActions.map((itemsGroup, groupIdx) => {
                                return (
                                    <div key={groupIdx}>
                                        {itemsGroup.map((item, idx) => {
                                            return (
                                                <Link key={idx} title={item.caption} style={{ '--contextMenuHoverColor': item?.color ?? this.baseHoverColor }} className="contextmenu-element" onClick={(event) => item?.onClick?.func ? item.onClick?.func({ event: event, ...item.onClick?.params }) : this.setState({ hidden: true })} to={!(item?.onClick?.func) && item?.onClick?.redirect ? `/${item?.onClick?.redirect}` : ''} >
                                                    {
                                                        item?.icon ? 
                                                            <div className="contextmenu-element-icon">
                                                                <img alt="" style={{ WebkitMaskImage: `url(${item?.iconPath ?? this.props?.iconsPath ?? './'}${item.icon}.svg)`, maskImage: `url(${item?.iconPath ?? this.props?.iconsPath ?? './'}${item.icon}.svg)` }} />
                                                            </div>
                                                        : null
                                                    }
                                                    <div className="contextmenu-element-caption">{item.caption}</div>
                                                </Link>
                                            );
                                        })}
                                        {groupIdx + 1 !== this.props.contextActions.length ? <div className="contextmenu-separator"></div> : null}
                                    </div>
                                );
                            })
                        }
                    </div>
                </CMWrapper>
            </div>
        );
    }
}


class CMWrapper extends Component {
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
    hideModalHandler = () => {
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
            }, 100);
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
                <div className="contextmenuwrapper-container" style={{ display: this.state.bindingElement.display, opacity: this.state?.bindingElement?.willShow ? 1 : 0 }}>
                    {this.props.children}
                </div>
        );
    }
}

export default ContextMenu;