import { Component } from "react";
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
                <div className="modalwrapper-background" style={{ display: this.state.bindingElement.display, opacity: this.state?.bindingElement?.willShow ? 1 : 0 }}>
                    <div className="modalwrapper-container" style={{ marginTop: this.state?.bindingElement?.willShow ? this.state.marginTop : 0, height: this.props?.fullScreen ? `calc(100% - ${this.state.marginTop} - ${this.state.marginTop})` : null }}>
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