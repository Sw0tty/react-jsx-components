import { createRef, Component } from 'react';
import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './combobox.css';


// --- Components params ---
// input             (string)                   - default value of input (TODO)
// items             (Array<Object<id, value>>) - list items of Objects with (id, value) keys
// caption           (string)                   - caption
// width             (int)                      - width of select
// disabled          (bool)                     - can be edited
// required          (bool)                     - showing required sign
// onReturnData      (func)                     - callback function for current data
// settledParamName  (string)                   - name of param in parent object


class ComboBox extends BaseComponent {
    constructor(props) {
        super();
        this.requiredProps = ['items', 'required', 'disabled'];
        this.state = {
            listData: props?.items,
            listItemsHidden: true,
            inputPos: undefined,
            input: props.input,
            searching: false,
            focused: false,
            showClear: false,
            clearPos: undefined
        }
        this.defaultSize = 13;
        this.heightIncrement = 10;
        this.wrapperRef = createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    selectItem(id, value) {
        this.setState({
            input: {
                id: id,
                value: value
            },
            listData: this.props.items,
            listItemsHidden: true,
            searching: false,
            focused: false,
        });

        this.props?.onReturnData ? setTimeout(() => {
            const { func, params } = this.props.onReturnData;
            func(this.state.input.id, params ?? undefined);
        }, 0) : null;
    }
    search(event) {
        this.setState({
            listData: this.props.items.filter((el) => el.name.toString().toLowerCase().indexOf(event.target.value.trim().toLowerCase()) > -1),
            searching: event.target.value ? true : false,
        });
    }
    clear() {
        if (this.state.input) {
            this.setState({
                input: undefined,
                showClear: false
            });
            setTimeout(() => {
                this.props.onBindingData ? this.props.onBindingData(this.props.bindingParamName) : null;
            }, 0);

            this.props?.onReturnData ? setTimeout(() => {
                const { func, params } = this.props.onReturnData;
                func('', params ?? undefined);
            }, 0) : null;
        }
    }
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
            this.setState({ listItemsHidden: true, focused: false, listData: this.props.items, searching: false, });
        }       
    }
    renderComponent() {
        const boxFontSize = this.props?.fontSize ? `${this.props.fontSize}px` : `${this.defaultSize}px`;
        const boxHeight = this.props?.fontSize ? `${this.props.fontSize + this.heightIncrement}px` : `${this.defaultSize + this.heightIncrement}px`;
        return (
            <div title={this.props?.items?.find(el => el.id == this.props?.input)?.name ?? ''} className="combobox-container" ref={this.wrapperRef} style={this.props?.style}>
                {this.props.required || this.props?.caption ? <span className="component-baseformat-text combobox-text">{this.props.required ? this.getRequiredSign() : null}{this.props?.caption ? this.props.caption + ' :' : null}</span> : null}
                <div style={{ position: "relative" }} onMouseLeave={() => { this.state.input ? this.setState({ showClear: false }) : null }}>
                    <span className="combobox-clearitem" style={{ display: this.state.showClear ? "flex" : "none", }} onClick={() => this.clear()}><img src={`/src/assets/Drop.svg`} /></span>
                    <div className={`combobox-selector ${this.props.disabled ? "disabled" : "enable"} ${this.state.focused ? "focused" : ''}`} onMouseEnter={() => { this.state.input ? this.setState({ showClear: true }) : this.setState({ showClear: false }) }} onClick={(event) => { this.state.disabled ? null : this.setState({ listItemsHidden: false, focused: true, inputPos: event.target.getBoundingClientRect() }) }} style={{ height: boxHeight, fontSize: boxFontSize, width: `${this.props.width}px`, borderColor: this.props.invalidData ? "red" : undefined }}>
                        <input className="combobox-input" style={{ height: boxHeight, fontSize: boxFontSize, width: `${this.props.width - 4}px` }} value={this.state.listItemsHidden ? '' : event?.target?.value } onChange={(event) => this.search(event)} />
                        <span style={{ fontSize: boxFontSize, color: this.state.listItemsHidden ? "black" : "#bfbfbf" }} className="combobox-value">{this.state.searching ? '' : this.props?.items?.find(el => el.id == this.props?.input)?.name ?? ''}</span>
                        <span onClick={() => this.clear()} className="combobox-icon"><img style={{ opacity: this.state.showClear ? 0 : 1 }} src={`/src/assets/${this.state.listItemsHidden ? "Arrow" : "Loupe"}.svg`} /></span>
                    </div>
                </div>
                <ListWrapper hidden={this.state.listItemsHidden}>
                    <ul style={{ maxHeight: this.state.listItemsHidden ? 0 : "150px", width: `${this.props.width}px`, right: this.state.inputPos ? 0 : undefined, top: this.state.inputPos ? this.state.inputPos.height : undefined }} className="combobox-items-container">
                        {this.state?.listData.map((el, idx) => { return <li title={el.name} className="combobox-item" style={{ fontSize: boxFontSize }} key={idx} onClick={() => this.selectItem(el.id, el.name)}>{el.name}</li> })}
                    </ul>
                </ListWrapper>
            </div>
        );
    }
}


class ListWrapper extends Component {
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
        const CSSTransitionTime = 200;

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
                    display: "block"
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
                <div className="comboboxlistwrapper" style={{ display: this.state.bindingElement.display, opacity: this.state?.bindingElement?.willShow ? 1 : 0 }}>
                    {this.props.children}
                </div>
        );
    }
}

export default ComboBox;