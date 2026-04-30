import { createRef, Component } from 'react';
import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './combobox.css';


class ComboBox extends BaseComponent {
    constructor(props) {
        super();
        this._propsRules = [
            { name: 'valueKey', required: true, type: 'string' },
            { name: 'width', type: 'number'},
            { name: 'captionKey', required: true, type: 'string'},
            { name: 'selectedItem', type: 'any' },
            { name: 'required', type: 'boolean' },
            { name: 'disabled', type: 'boolean' },
            { name: 'invalid', type: 'boolean' },
            { name: 'items', required: true, type: 'Array' },
            { name: 'onReturnData', type: 'CallbackObject' }
        ];
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
        document.addEventListener('mousedown', this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    handleClickOutside(event) {
        if ((this.wrapperRef && !this.wrapperRef.current.contains(event.target)) || !this) {
            this.setState({ listItemsHidden: true, focused: false, listData: this.props.items, searching: false, searchingBy: '' });
        }       
    }
    renderComponent() {
        const boxFontSize = this.props?.fontSize ? `${this.props.fontSize}px` : `${this.defaultSize}px`;
        const boxHeight = this.props?.fontSize ? `${this.props.fontSize + this.heightIncrement}px` : `${this.defaultSize + this.heightIncrement}px`;
        const CSSVariables = {
            '--jsxrc-comboBox-actionColor-border': this.props?.actionBorderColor ?? this._baseActionColorBorder,
            '--jsxrc-comboBox-actionColor-shadow': this.props?.actionShadowColor ?? this._baseActionColorShadow
        };
        return (
            <div title={this.state?.selectedItem?.caption ?? ''} className="jsxrc-combobox-container" style={{...this.props?.style, ...CSSVariables}}>
                {this.props?.required || this.props?.caption ? <span className="jsxrc-combobox-caption">{this.props?.required ? this._getRequiredSign() : null}{this.props?.caption ? this.props.caption : null}</span> : null}
                <div ref={this.wrapperRef}>
                    <div className="jsxrc-combobox-selector-container" onMouseLeave={() => { if (this.state.selectedItem) { this.setState({ showClear: false }) } }}>
                        <div className={`jsxrc-combobox-selector ${this.props?.disabled ? "jsxrc-combobox-disabled" : "jsxrc-combobox-enable"} ${this.props.invalid ? "jsxrc-combobox-invalid" : ''} ${this.state.focused ? "jsxrc-combobox-focused" : ''}`} onMouseEnter={() => { this.state.selectedItem ? this.setState({ showClear: true }) : this.setState({ showClear: false }) }} style={{ height: boxHeight, fontSize: boxFontSize, width: `${this.props.width}px` }}>
                            <input className="jsxrc-combobox-input" style={{ height: boxHeight, fontSize: boxFontSize, width: `${this.props.width - 24}px` }} value={this.state.listItemsHidden ? '' : this.state.searchingBy} onChange={(event) => this.search(event?.target?.value)} onClick={(event) => { if (!this.state.disabled) { this.setState({ listItemsHidden: false, focused: true, inputPos: event.target.getBoundingClientRect() }) } }} />
                            <span className="jsxrc-combobox-value" style={{ fontSize: boxFontSize, color: this.state.listItemsHidden ? "black" : "#bfbfbf" }}>{this.state.searching ? '' : this.state?.selectedItem?.caption}</span>
                            <span className={`jsxrc-combobox-icon ${this.state.showClear ? "jsxrc-combobox-icon-drop" : this.state.listItemsHidden ? "jsxrc-combobox-icon-arrow" : "jsxrc-combobox-icon-loupe"}`} onClick={() => { if (this.state.showClear) { this.clear() } }}><img alt="" /></span>
                        </div>
                    </div>
                    <CBListWrapper hidden={this.state.listItemsHidden}>
                        <ul style={{ maxHeight: this.state.listItemsHidden ? 0 : "150px" }} className="jsxrc-combobox-items-container">
                            {this.state?.listData.map((el, idx) => { return <li title={el[this.props.captionKey]} className="jsxrc-combobox-item" style={{ fontSize: boxFontSize }} key={idx} onClick={() => this.selectItem(idx, el[this.props.valueKey], el[this.props.captionKey])}>{el[this.props.captionKey]}</li> })}
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
                display: 'none'
            }
        }
    }
    hideModalHandler = () => {
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
            this.hideModalHandler();
        }
    }
    componentDidMount() {
        this.hideModalHandler();
    }
    render() {
        return (
            this.state.bindingElement.display === "none" ? null :
                <div className="jsxrc-combobox-listwrapper" style={{ display: this.state.bindingElement.display, opacity: this.state?.bindingElement?.willShow ? 1 : 0 }}>
                    {this.props.children}
                </div>
        );
    }
}

export default ComboBox;