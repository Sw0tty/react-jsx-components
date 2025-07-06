import { createRef, Component } from 'react';
import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import Arrow from './Arrow.svg';
import Drop from './Drop.svg';
import Loupe from './Loupe.svg';
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
        this.requiredProps = ['valueKey', 'captionKey', 'items', 'required', 'disabled'];
        this.state = {
            captionKey: props?.captionKey,
            valueKey: props?.valueKey,
            listData: props?.items,
            listItemsHidden: true,
            inputPos: undefined,
            selectedItem: this.setSelectedItem(props?.valueKey, props?.items, props?.selectedItem, props?.captionKey),
            searching: false,
            searchingBy: '',
            focused: false,
            showClear: false,
            clearPos: undefined
        }
        this.defaultSize = 13;
        this.heightIncrement = 10;
        this.wrapperRef = createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    setSelectedItem(valueKey, items, selectedItem, captionKey) {
        if (!valueKey || !items || !selectedItem) {
            return undefined;
        }
        let obj = items.find(el => { return el[valueKey] === selectedItem });
        if (obj) {
            return { caption: obj[captionKey], value: obj[valueKey] }
        } return undefined;
    }
    selectItem(idx, value, caption) {
        this.setState({
            selectedItem: {
                idx: idx,
                value: value,
                caption: caption
            },
            listData: this.props.items,
            listItemsHidden: true,
            searching: false,
            searchingBy: '',
            focused: false,
        });

        if (this.props?.onReturnData) {
            setTimeout(() => {
                const { func, params } = this.props.onReturnData;
                func(this.state.selectedItem.value, params ?? undefined);
            }, 0)
        }
    }
    search(targetValue) {
        this.setState({
            listData: this.props.items.filter((el) => el[this.props.captionKey].toString().toLowerCase().indexOf(targetValue.trim().toLowerCase()) > -1),
            searching: targetValue ? true : false,
            searchingBy: targetValue ?? ''
        });
    }
    clear() {
        if (this.state.selectedItem) {
            this.setState({
                selectedItem: undefined,
                showClear: false
            });
            setTimeout(() => {
                if (this.props?.onBindingData) {
                    this.props.onBindingData(this.props.bindingParamName);
                }
            }, 0);

            if (this.props?.onReturnData) {
                setTimeout(() => {
                    const { func, params } = this.props.onReturnData;
                    func('', params ?? undefined);
                }, 0)
            }
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
            this.setState({ listItemsHidden: true, focused: false, listData: this.props.items, searching: false, searchingBy: '' });
        }       
    }
    renderComponent() {
        const boxFontSize = this.props?.fontSize ? `${this.props.fontSize}px` : `${this.defaultSize}px`;
        const boxHeight = this.props?.fontSize ? `${this.props.fontSize + this.heightIncrement}px` : `${this.defaultSize + this.heightIncrement}px`;
        return (
            <div title={this.state?.selectedItem?.caption ?? ''} className="combobox-container" style={this.props?.style}>
                {this.props.required || this.props?.caption ? <span className="combobox-caption">{this.props.required ? this.getRequiredSign() : null}{this.props?.caption ? this.props.caption : null}</span> : null}
                <div ref={this.wrapperRef}>
                    <div style={{ position: "relative" }} onMouseLeave={() => { if (this.state.selectedItem) { this.setState({ showClear: false }) } }}>
                        <span className="combobox-clearitem" style={{ display: this.state.showClear ? "flex" : "none", }} onClick={() => this.clear()}><img alt="" src={Drop} /></span>
                        <div className={`combobox-selector ${this.props.disabled ? "disabled" : "enable"} ${this.state.focused ? "focused" : ''}`} onMouseEnter={() => { this.state.selectedItem ? this.setState({ showClear: true }) : this.setState({ showClear: false }) }} onClick={(event) => { if (!this.state.disabled) { this.setState({ listItemsHidden: false, focused: true, inputPos: event.target.getBoundingClientRect() }) } }} style={{ height: boxHeight, fontSize: boxFontSize, width: `${this.props.width}px`, borderColor: this.props.invalidData ? "red" : undefined }}>
                            <input className="combobox-input" style={{ height: boxHeight, fontSize: boxFontSize, width: `${this.props.width - 24}px` }} value={this.state.listItemsHidden ? '' : this.state.searchingBy} onChange={(event) => this.search(event?.target?.value)} />
                            <span style={{ fontSize: boxFontSize, color: this.state.listItemsHidden ? "black" : "#bfbfbf" }} className="combobox-value">{this.state.searching ? '' : this.state?.selectedItem?.caption}</span>
                            <span onClick={() => this.clear()} className="combobox-icon"><img alt="" style={{ opacity: this.state.showClear ? 0 : 1 }} src={`${this.state.listItemsHidden ? Arrow : Loupe}`} /></span>
                        </div>
                    </div>
                    <CBListWrapper hidden={this.state.listItemsHidden}>
                        <ul style={{ maxHeight: this.state.listItemsHidden ? 0 : "150px" }} className="combobox-items-container">
                            {this.state?.listData.map((el, idx) => { return <li title={el[this.props.captionKey]} className="combobox-item" style={{ fontSize: boxFontSize }} key={idx} onClick={() => this.selectItem(idx, el[this.props.valueKey], el[this.props.captionKey])}>{el[this.props.captionKey]}</li> })}
                        </ul>
                    </CBListWrapper>
                </div>
            </div>
        );
    }
}


class CBListWrapper extends Component {
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
        if (this.state.hidden !== this.props.hidden) {
            this.hideModalHangler();
        }
    }
    componentDidMount() {
        this.hideModalHangler();
    }
    render() {
        return (
            this.state.bindingElement.display === "none" ? null :
                <div className="combobox-listwrapper" style={{ display: this.state.bindingElement.display, opacity: this.state?.bindingElement?.willShow ? 1 : 0 }}>
                    {this.props.children}
                </div>
        );
    }
}

export default ComboBox;