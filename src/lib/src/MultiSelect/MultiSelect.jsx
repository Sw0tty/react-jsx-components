import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import Check from './Check.svg';
import './multiselect.css';


class MultiSelect extends BaseComponent {
    constructor(props) {
        super();
        this._propsRules = [
            { name: 'items', required: true, type: 'ArrayOfObjects' },
            { name: 'valueKey', required: true, type: 'string' },
            { name: 'captionKey', required: true, type: 'string'},
            { name: 'onReturnData', type: 'CallbackObject' }
        ];
        this.state = {
            selectedItems: props?.selectedValues ? props.items.filter(item => props.selectedValues.includes(item[props.valueKey])) : undefined
        }
    }
    findItem(id) {
        return this.state.selectedItems.find((el) => el[this.props.valueKey] === id);
    }
    change(id) {
        let stateSelectedItems = this.state.selectedItems;

        if (this.findItem(id)) {
            stateSelectedItems = this.state.selectedItems.filter((el) => el[this.props.valueKey] !== id);
            
        } else {
            stateSelectedItems.push(this.props.items.filter((el) => el.id === id)[0]);
        }

        this.setState({
            selectedItems: stateSelectedItems
        });

        if (this.props?.onReturnData) {
            setTimeout(() => {
                const { func, params } = this.props.onReturnData;
                func({ data: stateSelectedItems, params: params ?? undefined });
            }, 0)
        }
    }
    renderComponent() {
        return (
            <div className="multiselect-container" style={{ width: `${this.props.width}px` }}>
                <span className="multiselect-caption">
                    {this.props?.required ? this._getRequiredSign() : null}{this.props.caption}
                </span>
                <div className={`multiselect-items-container ${this.props?.disabled ? "disabled" : "enable"}`} style={{ borderColor: this.props.invalid ? "red" : undefined }}>
                    {this.props.items.map((el, idx) => {
                        return (
                            <div key={idx} className="multiselect-item" onClick={() => this.change(el[this.props.valueKey])}>
                                <div className="multiselect-item-caption">
                                    {el[this.props.captionKey]}
                                </div>
                                <div className="multiselect-item-icon">
                                    <img alt="" src={Check} style={{ opacity: (this.state.selectedItems && this.findItem(el[this.props.valueKey])) ? 1 : 0 }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default MultiSelect;