import { Component } from "react";
import CustomButton from "../CustomButton/CustomButton.jsx";
import './modals.css';


export class InfoModalForm extends Component {
    constructor(props) {
        super();
        this._propsRules = [
            { name: 'buttonCaption', type: 'string' },
            { name: 'hidden', required: true, type: 'boolean' }
        ];
    }
    // switch = () => {
    //     this.setState({
    //         hidden: !this.state.hidden
    //     });
    // }
	render() {
		const baseIconColor = "#42a6ffd4";
        
		return (
            <ModalWrapper hidden={this.props.hidden}>
                <div className="infomodalform-form">
                    <div className="infomodalform-form-content">
                        {this.props?.icon ? 
                            <div className="infomodalform-form-content-icon" style={{ WebkitFilter: `drop-shadow(1px 1px 4px ${this.props?.iconGlowColor ?? this.props?.iconColor ?? baseIconColor})` }}>
                                <img alt="" style={{ WebkitMaskImage: `url(${this.props?.icon})`, maskImage: `url(${this.props?.icon})`, backgroundColor: this.props?.iconColor ?? baseIconColor }} />
                            </div>
                        : null}
                        <div className="infomodalform-form-content-caption">{this.props.caption}</div>
                    </div>
                    <div className="infomodalform-form-button">
                        <CustomButton caption={this.props?.buttonCaption ?? "Ok"} type="hollow" onClickAction={{ func: this.props.onClickAction.func, params: this.props.onClickAction?.params }} style={{ padding: "0px 15px", height: "30px" }} />
                    </div>
                </div>
            </ModalWrapper>
		);
	}
}


class ModalWrapper extends Component {
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
                <div className="modalswrapper-background" style={{ display: this.state.bindingElement.display, opacity: this.state?.bindingElement?.willShow ? 1 : 0 }}>
                    <div className="modalswrapper-container" style={{ marginTop: this.state?.bindingElement?.willShow ? this.state.marginTop : 0, height: this.props?.fullScreen ? `calc(100% - ${this.state.marginTop} - ${this.state.marginTop})` : null }}>
                        {this.props.children}
                    </div>
                </div>
        );
    }
}