import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './multiselect.css';


// --- Components params ---
// items         (Array<Object<id, name>>) - list available items of Objects with (id, name) keys
// selectedItems (Array<Object<id, name>>) - list selected items of Objects with (id, name) keys
// caption       (string)                  - component caption
// width         (int)                     - width of select
// disabled      (bool)                    - can be edited
// required      (bool)                    - showing required sign
// invalidData   (bool)                    - null or invalid input by user


class MultiSelect extends BaseComponent {
    constructor(props) {
        super();
        this.requiredProps = [];
        this.state = {
            data: props.items,
            selectedData: props.selectedItems
        }
    }
    findItem(id) {
        return this.state.selectedData.filter((el) => el.id == id);
    }
    change(id) {
        const stateSelectedData = this.state.selectedData;
        let selectedData2 = this.state.selectedData.filter((el) => el.id == id);

        if (selectedData2.length > 0) {
            this.setState({
                selectedData: this.state.selectedData.filter((el) => el.id != id)
            });
        } else {
            stateSelectedData.push(this.state.data.filter((el) => el.id == id)[0]);
            this.setState({
                selectedData: stateSelectedData
            });
        }
        setTimeout(() => {
            this.props.onReturnData(this.state.selectedData, this.props.settledParamName);
        }, 0);
    }
    render() {
        return (
            <div className="multiselect-container" style={{ width: `${this.props.width}px` }}>
                <span className="multiselect-text">
                    {this.props.required ? this.getRequiredSign() : null}{this.props.caption}
                </span>
                <div className={`multiselect-items-container ${this.props.disabled ? "disabled" : "enable"}`} style={{ borderColor: this.props.invalidData ? "red" : undefined }}>
                    {this.state.data.map((el, idx) => {
                        return (
                            <div key={idx} className="multiselect-item" onClick={() => this.change(el.id)}>
                                <div className="multiselect-item-text">
                                    {el.name}
                                </div>
                                <div className="multiselect-item-icon">
                                    <img src="/src/assets/Check.svg" style={{ opacity: (this.state.selectedData && this.findItem(el.id).length > 0 && this.findItem(el.id)[0].id == el.id) ? 1 : 0 }} />
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