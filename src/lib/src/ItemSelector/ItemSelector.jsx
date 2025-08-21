import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import { ISModalWrapper, ISButton, ISGallery, ISDataGrid } from "./ISComponents.jsx";
import './itemselector.css';


class ItemSelector extends BaseComponent {
    constructor(props) {
        super();
        this._propsRules = [
            { name: 'type', required: true, type: 'string', constStrings: ['gallery', 'datagrid'] },
            { name: 'data', required: true, type: 'Array' },
            { name: 'itemDataKey', required: true, type: 'string' },
            { name: 'fields', type: 'Array' },
            { name: 'onReturnData', type: 'CallbackObject' }
        ]
        this.state = {
            modalFormHidden: true,
            mouseHover: false,
            selectedItemData: this.returnSelectedForComponent(props.type, props?.selectedData, props?.gridSelectorParams?.data, props?.gridSelectorParams?.returnedData?.fromComponent, props?.gridSelectorParams?.returnedData?.inComponent),
            lastState: undefined
        }
    }
    returnSelectedForComponent = (componentType, selectedData, gridData, keyFromComponent, keyInComponent) => {
        return componentType === "datagrid" ? this.returnSelectedFromGrid(gridData, selectedData, keyFromComponent, keyInComponent) : selectedData ?? null;
    }
    returnSelectedFromGrid = (data, selectedFrom, keyFromComponent, keyInComponent) => {
        return data && selectedFrom && keyFromComponent && keyInComponent ? data.find(el => el[keyFromComponent] === selectedFrom)[keyInComponent] : null;
    }
    openModalForm = () => {
        this.setState({
            modalFormHidden: false,
            prevSelectedData: this.state.selectedItemData
        });
    }
    rejectSelecting = (params) => {
        const { prevData } = params;

        this.closeModalForm();

        this.setState({
            selectedItemData: prevData
        });
    }
    closeModalForm = () => {
        this.setState({
            modalFormHidden: true
        });
    }
    selectItemData = (data) => {
        this.setState({
            selectedItemData: typeof(data[this.props.itemDataKey]) !== "string" ? '[Object]' : data[this.props.itemDataKey]
        });
    }
    selectReturnSelectedAndClose = (data) => {
        this.selectItemData(data);
        this.closeModalForm();

        if (this.props?.onReturnData) {
            const { func, params } = this.props.onReturnData;
            func(data, params ?? undefined);
        }
    }
    selectFromGridReturnSelectedAndClose = (params_) => {
        const { data, params } = params_;

        //const fromComponentData = data[params.fromComponentKey];

        // if (this.props.gridSelectorParams?.getOnlyChilds && !data[this.props?.gridSelectorParams?.hierarchyKeys?.parentIdKey]) {
        //     return;
        // }

        this.selectItemData(data);
        this.closeModalForm();

        this.props?.onReturnData?.func ?
            this.props.onReturnData.func(data, { ...this.props.onReturnData?.params })
        : console.error("ItemSelector: onReturnData is undefined");
    }
    returnSelectedAndClose = () => {
        this.closeModalForm();
        console.log(this.state.selectedItemData);
        if (this.props?.onReturnData) {
            const { func, params } = this.props.onReturnData;
            func(this.state.selectedItemData, params ?? undefined);
        }
    }
    clear = () => {
        this.setState({
            selectedItemData: null
        });

        if (this.props?.onReturnData) {
            this.props.onReturnData.func(null, { ...this.props.onReturnData?.params })
        }
    }
    componentDidUpdate() {
        // if (this.props.disabled !== this.state.lastState) {
        //     this.setState({
        //         selectedItemData: this.returnSelectedForComponent(this.props.type, this.props?.selectedData, this.props?.gridSelectorParams?.data, this.props?.gridSelectorParams?.returnedData?.fromComponent, this.props?.gridSelectorParams?.returnedData?.inComponent),
        //         lastState: this.props.disabled
        //     });
        // }
    }
    renderComponent() {
        return (
            <div className="itemselector-container">
                <>
                    {this.props?.caption || this.props?.required ? <span className="itemselector-caption">{this.props?.required ? this._getRequiredSign() : null}{this.props.caption}</span> : null}
                    <div className={`itemselector-selector${this.props?.disabled ? " disabled" : " enable"}`}>
                        <div className={`itemselector-item${this.props?.invalid ? ' invalid' : ''}`} title={`${this.state?.selectedItemData ?? ''}`} style={{ width: this.props?.width ?? "80px" }} onMouseEnter={() => this.setState({ mouseHover: true })} onMouseLeave={() => this.setState({ mouseHover: false })}>
                            <div className="itemselector-item-text">
                                {this.state?.selectedItemData}
                            </div>
                            {
                                this.state?.selectedItemData ?
                                    <div className="itemselector-item-dropbutton">
                                        <img alt="" style={{ display: this.state.mouseHover ? "flex" : "none" }} onClick={() => this.clear()} />
                                    </div>
                                : null
                            }
                        </div>
                        <div className="itemselector-modal-button" onClick={() => { if (!this.props?.disabled) { this.openModalForm() } }}>
                            <img alt="" />
                        </div>
                    </div>

                    <ISModalWrapper hidden={this.state.modalFormHidden} marginTop="50px" fullScreen={true}>
                        <div className="itemselector-modalform">
                            <div className="itemselector-modalform-header">
                                <div className="itemselector-modalform-header-caption">
                                    { this.props?.modalTitle ?? 'Selecting an item' }
                                </div>
                                <div className="itemselector-modalform-closebutton">
                                    <img alt="" onClick={() => this.closeModalForm()} />
                                </div>
                            </div>
                            <div className="itemselector-modalform-body">
                                {
                                    this.props?.type === "datagrid" ?
                                        <div className="itemselector-modalform-body-grid"><ISDataGrid iconsPath={this.props.iconsPath} onClick={this.selectItemData} onDoubleClick={{ func: this.selectFromGridReturnSelectedAndClose, params: { inComponentKey: this.props.gridSelectorParams?.returnedData?.inComponent, fromComponentKey: this.props.gridSelectorParams?.returnedData?.fromComponent } }} styles={this.props?.gridSelectorParams?.styles} idKey={this.props.gridSelectorParams?.hierarchyKeys?.idKey} parentIdKey={this.props.gridSelectorParams?.hierarchyKeys?.parentIdKey} iconsParams={this.props.gridSelectorParams?.iconsParams} rowNum={false} data={this.props?.data} lastDataUpdate={new Date()} fields={this.props.gridSelectorParams?.fields} /></div> :
                                    this.props?.type === "gallery" ?
                                        <div className="itemselector-modalform-body-gallery"><ISGallery cHeight="100%" cWidth="100%" selectedItem={this.state?.selectedItemData} itemDataKey={this.props?.itemDataKey} iconsSize={this.props?.galleryIconsSize ?? 70} iconsPath={this.props.iconsPath} itemsSize={this.props?.galleryItemsSize ?? 70} onClick={this.selectItemData} onDoubleClick={this.selectReturnSelectedAndClose} items={this.props?.data} /></div> : null
                                }
                            </div>
                            <div className="itemselector-modalform-buttons">
                                <ISButton caption="Выбрать" type="acceptHollow" disabled={this.state?.selectedItemData ? false : true} onClickAction={{ func: this.returnSelectedAndClose }} style={{ padding: "0px 15px", height: "30px" }} />
                                <ISButton caption="Отмена" type="acceptHollow" onClickAction={{ func: this.rejectSelecting, params: { prevData: this.state?.prevSelectedData } }} style={{ padding: "0px 15px", height: "30px" }} />
                            </div>
                        </div>
                    </ISModalWrapper>
                </>
            </div>
        );
    }
}


export default ItemSelector;