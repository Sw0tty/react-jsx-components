import { Component } from "react";
import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import CheckCircle from './CheckCircle.svg';
import CrossCircle from './CrossCircle.svg';
import Loupe from './Loupe.svg';
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
                <div className="ismodalwrapper-background" style={{ display: this.state.bindingElement.display, opacity: this.state?.bindingElement?.willShow ? 1 : 0 }}>
                    <div className="ismodalwrapper-container" style={{ marginTop: this.state?.bindingElement?.willShow ? this.state.marginTop : 0, height: this.props?.fullScreen ? `calc(100% - ${this.state.marginTop} - ${this.state.marginTop})` : null }}>
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


export class ISGallery extends BaseComponent {
    constructor(props) {
        super();
        this.state = {
            selectedItemIdx: this.selectItemByName(props.selectedItem, props.items)
        };
        this._propsRules = [
            { name: 'itemDataKey', type: 'string' },
            { name: 'itemsSize', required: true, type: 'number' },
            { name: 'iconsSize', required: true, type: 'number', interval: [0, 100] }
        ];
    }
    selectItemByName = (iconName, items) => {
        let selectedIdx;
        items?.forEach((el, idx) => {
            if (el.iconName === iconName) {
                selectedIdx = idx;
                return;
            }
        });
        return selectedIdx;
    }
    renderComponent() {
        return (
            <div className="isgallery-container" style={{ width: this.props?.cWidth, height: this.props?.cHeight}}>
                <div className="isgallery-items-container">
                    {
                        this.props?.items ?
                            this.props.items.map((item, idx) => {
                                return (
                                    <div key={idx} className="isgallery-item" title={`${item?.caption ?? ''}`} style={{ width: `${this.props?.itemsSize}px`, height: `${this.props?.itemsSize}px`, boxShadow: this.state.selectedItemIdx === idx ? "0px 0px 3px 3px var(--componentFocusShadowColor)" : null, borderColor: this.state.selectedItemIdx === idx ? "var(--componentHoverColor)" : null, transform: this.state.selectedItemIdx === idx ? "scale(1.02)" : null }} onClick={() => { this.setState({ selectedItemIdx: idx }); this.props.onClick(item) }} onDoubleClick={() => { this.props.onDoubleClick(item) }}>
                                        <div className="isgallery-item-icon">
                                            <img alt="" style={{ height: this.props?.iconsSize ? `${this.props?.iconsSize}%` : null, width: this.props?.iconsSize ? `${this.props?.iconsSize}%` : null }} src={`${item?.iconPath ?? this.props?.iconsPath ?? '/'}${item.iconName}`} />
                                        </div>
                                        {
                                            item?.caption ?
                                                <div className="isgallery-item-caption">{item.caption}</div>
                                            : null
                                        }
                                    </div>
                                )
                            })
                            : "Not data"
                    }
                </div>
            </div>
        );
    }
}


export class ISDataGrid extends BaseComponent {
    constructor(props) {
        super();
        this._propsRules = [{ name: 'fields', type: 'Array' }];
        let convertedData = this.convertDataForGrid({ data: props?.data, idKey: props?.idKey, parentIdKey: props?.parentIdKey, iconsParams: props?.iconsParams });
        this.defaultCellColor = "#ffd575";
        this.defaultRowColor = "#ffe7b1";
        this.state = {
            data: convertedData,
            lastDataUpdate: props.lastDataUpdate,
            isLoading: true,
            contextPos: undefined,
            contextHidden: true,
            selectedData: undefined,

            selected: {
                row: undefined,
                cell: undefined
            },

            resizeState: {
                pageX: undefined,
                curCol: undefined,
                curColWidth: undefined
            },

            sorting: {
                isSorting: false,
                increasing: false,
                sortingBy: undefined
            },

            searching: {
                columns: undefined, // ArrayOfStrings
                value: undefined
            },

            filters: this.createFilters({ data: convertedData, fields: props?.fields })
        }
    }
    resizeColumn(event) {
        const curHeader = event.target.parentElement.parentElement.parentElement;
        const curHeaderWidth = curHeader.offsetWidth;

        this.setState({
            resizeState: {
                pageX: event.pageX,
                curCol: curHeader,
                curColWidth: curHeaderWidth,
            }
        });
        const mMove = (event) => {
            if (this.state.resizeState.curCol) {
                var diffX = event.pageX - this.state.resizeState.pageX;
                let curCol = this.state.resizeState.curCol;
                curCol.style.width = (this.state.resizeState.curColWidth + diffX) + 'px';

                this.setState(prevState => ({
                    resizeState: {
                        ...prevState.resizeState,
                        curCol: curCol,
                    }
                }));
            }
        }
        const mUp = () => {
            this.setState({
                resizeState: {
                    pageX: undefined,
                    curCol: undefined,
                    curColWidth: undefined,
                }
            });
            document.removeEventListener('mousemove', mMove);
            document.removeEventListener('mouseup', mUp);
        }
        document.addEventListener('mousemove', mMove);
        document.addEventListener('mouseup', mUp);
    }
    copyCellData = (event) => {
        if (event.key.toLowerCase() === 'c' && (event.ctrlKey || event.metaKey) && this.state.selected.currentData) {
            navigator.clipboard.writeText(this.state.selected.currentData);
        }
    }
    returnTreeFromRoot = (params) => {
        const { idKey, parentIdKey, rootId, gridData, treeElems=[] } = params;
        const rootChilds = gridData.filter(el => el.data[parentIdKey] === rootId);

        if (rootChilds.length > 0) {
            for (let el of rootChilds) {
                this.returnTreeFromRoot({ idKey, parentIdKey, rootId: el.data[idKey], gridData, treeElems })
            }
        }
        treeElems.push(gridData.find(el => el.data[idKey] === rootId))
        return treeElems;
    }
    shrinkChilds = (params) => {
        const { idKey, parentIdKey, parentId, gridData } = params;

        let treeActions = {};
        const tree = this.returnTreeFromRoot({ idKey, parentIdKey, rootId: parentId, gridData }).sort((a, b) => { return a.level - b.level });
        const treeRoot = tree[0];
        tree.filter(el => el.level > treeRoot.level).forEach(el => {
            if (!treeRoot.childsHidden) {
                treeActions[el.data[idKey]] = true;
            } else if (!(el.data[idKey] in treeActions)) {
                if (el.isParent && el.childsHidden) {
                    this.returnTreeFromRoot({ idKey, parentIdKey, rootId: el.data[idKey], gridData: tree }).filter(el_1 => el_1.level > el.level).forEach(el_1 => {
                        treeActions[el_1.data[idKey]] = true;
                    });
                    treeActions[el.data[idKey]] = false;
                } else if (el.isParent && !el.childsHidden) {
                    treeActions[el.data[idKey]] = false;
                } else if (!el.isParent) {
                    treeActions[el.data[idKey]] = false;
                }
            }
        });

        this.setState({
            data: gridData.map(el => {
                if (el.data[idKey] === treeRoot.data[idKey]) {
                    return { ...el, childsHidden: !el.childsHidden }
                } else if (el.data[idKey] in treeActions) {
                    return { ...el, hidden: treeActions[el.data[idKey]] }
                } return el;
            })
        });
    }
    shrinkAll = (params) => {
        const { onHide } = params;

        this.setState({
            data: this.state.data.map(el => {
                if (el.isParent && el.level === 0) {
                    return { ...el, childsHidden: onHide }
                } else if (el.isParent && el.level > 0) {
                    return { ...el, childsHidden: onHide, hidden: onHide }
                } else if (!el.isParent && el.level > 0) {
                    return { ...el, hidden: onHide }
                } else {
                    return { ...el }
                }
            })
        });
    }
    returnIcon = (params) => {
        const { iconsParams, data } = params;

        if (!iconsParams) {
            return undefined;
        } else if (iconsParams?.eachItem) {

            return iconsParams.eachItem;
        } else if (iconsParams?.byKey) {
            const byKeyParams = iconsParams.byKey;
            if (byKeyParams?.key || byKeyParams?.icons || data || byKeyParams?.key in data) {
                const icon = byKeyParams.icons?.find(el => el.typeName === data[byKeyParams?.key])?.iconName;
                if (icon) {
                    return icon;
                } return undefined;
            }
        } return undefined;
    }
    convertDataForGrid = (params) => {
        const { data, idKey, parentIdKey, iconsParams } = params;

        if ((idKey && parentIdKey) && data?.length > 0 && idKey in data[0] && parentIdKey in data[0]) {
            const recursData = (params) => {
                const { roots, childs, key, parentKey, newRoots = [], level = 0 } = params;

                roots.forEach(root => {
                    const rootChilds = childs.filter(ch => ch[parentKey] === root[key]);

                    if (rootChilds.length === 0) {
                        newRoots.push({ checked: false, hidden: false, level: level, icon: this.returnIcon({ iconsParams, data: root }), isParent: false, childsHidden: false, data: root });
                    } else {
                        newRoots.push({ checked: false, hidden: false, level: level, icon: this.returnIcon({ iconsParams, data: root }), isParent: true, childsHidden: false, data: root });
                        recursData({ roots: rootChilds, childs: childs, key: key, parentKey: parentKey, newRoots: newRoots, level: level + 1 });
                    }
                });
                return newRoots;
            }
            return recursData({ roots: data.filter(el => el[parentIdKey] == null), childs: data.filter(el => el[parentIdKey] != null), key: idKey, parentKey: parentIdKey }).map((el, idx) => { return { ...el, rowId: idx } });
        }
        return data?.map((el, idx) => {
            return { rowId: idx, checked: false, hidden: false, level: 0, icon: this.returnIcon({ iconsParams, data: el }), isParent: false, childsHidden: false, data: el }
        });
    }
    switchLoading = (params) => {
        const { isLoading } = params;
        this.setState({
            isLoading: isLoading
        });
    }
    returnCurrentDataState = () => {
        return this.state?.data;
    }
    returnNonHiddenData = () => {
        return this.state.data.filter(el => !el.hidden).map(el => { return el.data; });
    }
    returnCheckedData = () => {
        return this.state.data.filter(el => !el.hidden && el.checked)?.map(el => { return el.data; });
    }
    showContext = (event) => {
        event.preventDefault();
        setTimeout(() => {
            this.setState({
                contextHidden: false,
                contextPos: { x: event.clientX, y: event.clientY },
            })
        }, 100);
    }
    hideContext = () => {
        this.setState({
            contextHidden: true
        });
    }
    toDefaultFormat(data, dataType) {
        switch (dataType) {
            case "date":


                return new DataRender().toDateFormat(new Date(data));
            case "datetime":
                return new DataRender().toDateTimeFormat(new Date(data));
            case "bool":
                return (<img alt="" className="datagrid-cell-img" style={{ WebkitMaskImage: `url(${data ? CheckCircle : CrossCircle})`, maskImage: `url(${data ? CheckCircle : CrossCircle})` }} />);
            default:
                return data;
        }
    }
    /*renderData(data, objectKey, key, dataType) {
        if (objectKey) {
            return data[objectKey] != null ? data[objectKey][key] != null ? this.toDefaultFormat(data[objectKey][key], dataType) : '' : '';
        }
        return data[key] != null ? this.toDefaultFormat(data[key], dataType) : '';
    }*/
    switchFilterForm = (params) => {
        const { target, columnKey } = params;
        const updatedFilter = { ...this.state.filters[columnKey], parentTarget: target, hidden: !this.state.filters[columnKey].hidden }

        this.setState((prevState) => ({
            filters: {
                ...prevState.filters,
                [columnKey]: updatedFilter
            }
        }));
    }
    closeFilterForm = (params) => {
        const { columnKey } = params;
        const updatedFilter = { ...this.state.filters[columnKey], hidden: true }

        this.setState((prevState) => ({
            filters: {
                ...prevState.filters,
                [columnKey]: updatedFilter
            }
        }));
    }
    // ---- UNDER METHODS IS NOT CONFIRM AND CHECKED ON BUGS ----
    createFilters = (params) => {
        const { data, fields } = params;
        let gridFilters = {};

        fields?.forEach(field => {
            if (field.filter) {
                let columnData = new Set();
                data?.forEach(el => { columnData.add(el.data[field.key]) });
                columnData = Array.from(columnData).map((el, idx) => { return { id: idx, checked: true, hidden: false, value: el } });
                gridFilters[field.key] = { data: columnData, hidden: true, queueNum: -1 };
            }
        });

        return gridFilters;
    }
    updateFilters = (params) => {
        const { notHiddenData, filters, currentColumn } = params;

        let filtersOrder = [];
        for (let filterKey of Object.keys(filters)) {
            if (filters[filterKey].queueNum > 0) {
                filtersOrder.push({ key: filterKey, order: filters[filterKey].queueNum });
            }
        }

        console.log("gridFilters", notHiddenData, filters);
        // filtersOrder.sort((a, b) => { return a.order - b.order })
        if (filtersOrder.length > 0) {
            let { resetedFilters } = this.returnReseted({ filters: filters });
            console.log("resetedFilters", resetedFilters);


        } return filters;

        
    }
    returnQueueNumber = (params) => {
        const { columnKey, dataFridFilters, currentFilters } = params;

        let lastQueue = 0;
        let lastQueueColumn = null;
        for (let key of Object.keys(dataFridFilters)) {
            let filterQueue = dataFridFilters[key].queueNum;
            if (filterQueue > lastQueue) {
                lastQueue = filterQueue;
                lastQueueColumn = key;
            }
        }

        if (currentFilters.find(el => !el.checked)) {
            if (lastQueue === 0) {
                return 1;
            } else if (columnKey === lastQueueColumn) {
                return lastQueue;
            } return lastQueue + 1;
        } return -1;

    }
    addFiltersHandler = (params) => {
        const { filters, columnKey } = params;
        let copyFilters = this.state.filters;

        if (this.state?.data) {
            let copyData = JSON.parse(JSON.stringify(this.state.data));

            copyFilters[columnKey] = { data: filters, hidden: true, queueNum: this.returnQueueNumber({ columnKey: columnKey, dataFridFilters: copyFilters, currentFilters: filters }) };

            copyData = this.filterData({ rawData: copyData, filters: copyFilters });
            /*if (filters.find(el => !el.checked)) {
                //
            } else {
                copyFilters[columnKey] = { ...copyFilters[columnKey], hidden: true };
            }*/


            if (this.state.sorting.isSorting) {
                copyData = this.sortData({ rowData: copyData, columnKey: this.state.sorting.sortingBy.columnKey, dataType: this.state.sorting.sortingBy.dataType });
            }



            this.updateFilters({ notHiddenData: copyData.filter(el => !el.hidden), filters: copyFilters, currentColumn: columnKey });
            this.setState((prevState) => ({
                //filters: this.updateFilters({ data: copyData, filters: copyFilters }),
                data: copyData
            }));
        }
    }
    filterData = (params) => {
        let { rawData, filters } = params;
        //let skipRows = [];

        //const { resetedData } = this.returnReseted({ data: rawData, filters: filters });
        //console.log("filter1", resetedData);
        // ---
        let { resetedData } = this.returnReseted({ data: rawData });

        let filtersOrder = [];
        console.log("filters[filterKey]", filters);
        for (let filterKey of Object.keys(filters)) {
            if (filters[filterKey].queueNum > 0) {
                filtersOrder.push({ key: filterKey, order: filters[filterKey].queueNum });
            }
        }
        
        if (filtersOrder.length > 0) {
            //let nextSkip = [];
            //let hiddenFilters = {}; // key: number, idxs []
            for (let filter of filtersOrder.sort((a, b) => { return a.order - b.order })) {
                const uncheckFilters = filters[filter.key].data.filter(el => !el.checked);
                let executedValues = uncheckFilters.map(el => { return el.value });
                //let hiddenFilters = uncheckFilters.map(el => { return el.id });

                //nextSkip = new Set([...nextSkip, ...hiddenFilters]);
                resetedData = resetedData.map(el => {
                    if (!el.hidden && executedValues.includes(el.data[filter.key])) {
                        return { ...el, hidden: true }
                    } return el;
                });
            }
        } else {
            resetedData = resetedData.map(el => {
                return { ...el, hidden: false }
            });
        }
        
        
        return resetedData;
    }
    returnReseted = (params) => {
        const { data, filters } = params;
        const resetedData = data ? data.map(el => { return { ...el, hidden: false } }) : undefined;
        let resetedFilters = filters ? JSON.parse(JSON.stringify(filters)) : undefined;

        if (resetedFilters) {
            for (let filterKey of Object.keys(filters)) {
                resetedFilters[filterKey] = {
                    ...resetedFilters[filterKey],
                    data: resetedFilters[filterKey].data.map(el => { return { ...el, hidden: false } }),
                    queueNum: -1
                };
            }
        }

        return { resetedData, resetedFilters };
    }
    setResetFilters = (params) => {
        const { data, filters } = params;
    }
    sortData(params) {
        let { rowData, columnKey, dataType } = params;

        return rowData?.sort((a, b) => {
            if (a.data[columnKey] < b.data[columnKey]) {
                return this.state.sorting?.increasing ? -1 : 1;
            } else if (a.data[columnKey] > b.data[columnKey]) {
                return this.state.sorting?.increasing ? 1 : -1;
            }
            return 0;
        });
    }
    setSortFilterDataState = (params) => {
        const { data, filters, sortingColumnKey, sortingDataType } = params;

        this.setState((prevState) => ({
            filters: filters,
            sorting: {
                isSorting: true,
                increasing: !this.state.sorting?.increasing,
                sortingBy: { columnKey: sortingColumnKey, dataType: sortingDataType }
            },
            data: data
        }));
    }
    setSortDataState = (params) => {
        const { data, columnKey, dataType } = params;

        this.setState({
            sorting: {
                isSorting: true,
                increasing: !this.state.sorting?.increasing,
                sortingBy: { columnKey: columnKey, dataType: dataType }
            },
            data: data
        });
    }
    setFilterDataState = (params) => {
        const { data, filters } = params;

        this.setState((prevState) => ({
            filters: filters,
            data: data
        }));
    }
    // ----  ----
    setDefaultGridState = () => {
        let convertedData = this.convertDataForGrid({ data: this.props?.data, idKey: this.props?.idKey, parentIdKey: this.props?.parentIdKey, iconsParams: this.props?.iconsParams });
        const gridFilters = this.createFilters({ data: convertedData, fields: this.props?.fields });

        this.setState({
            data: convertedData,
            lastDataUpdate: this.props.lastDataUpdate,
            isLoading: false,
            selected: {
                row: undefined,
                cell: undefined,
                currentData: undefined,
                rowData: undefined
            },
            searching: {
                columns: this.props?.searchToolColumns,
                value: undefined
            },
            sorting: {
                isSorting: false,
                increasing: false,
                sortingBy: undefined
            },
            filters: gridFilters
        });
    }
    componentDidUpdate() {
        if (this.state.lastDataUpdate !== this.props.lastDataUpdate) {
            this.setDefaultGridState();
        }
    }
    componentDidMount() {
        this.switchLoading({ isLoading: false });
    }
    checkRow = (checked, params) => {
        const { id } = params;

        this.setState({
            data: this.state.data.map(el => el.rowId === id ? { ...el, checked: checked } : el)
        });
    }
    updateRedirectPath = (params) => {
        const { defaultPath, updateRules, selectedData } = params;
        let newPath = defaultPath;

        for (let ruleParams of updateRules) {
            if (ruleParams.rule === "ADD") {
                if ("str" in ruleParams) {
                    newPath += ruleParams.str;
                } else if ("fromSelected" in ruleParams) {
                    newPath += new DataRender().selectFromDictionary({ data: selectedData, chainKeys: ruleParams.fromSelected.split('.') });
                }
            }
        }

        return newPath;
    }
    updateContextMenu = (params) => {
        const { thisClass, contextParams, selectedData } = params;

        return contextParams.map(group => {
            return group.map(groupElement => {
                const redirect = selectedData && groupElement?.redirectUpdateRules && groupElement?.onClick?.redirect ? this.updateRedirectPath({ defaultPath: groupElement?.onClick?.redirect, updateRules: groupElement.redirectUpdateRules, selectedData: selectedData }) : groupElement?.onClick?.redirect;
                const func = (typeof groupElement?.onClick?.func) === "function" ? groupElement?.onClick?.func : (typeof groupElement?.onClick?.func) === "string" && groupElement?.onClick?.func in thisClass ? thisClass[groupElement?.onClick?.func] : undefined;
                const params = { ...groupElement?.onClick?.params, selectedData: selectedData };

                return {
                    ...groupElement,
                    onClick: {
                        redirect: redirect,
                        func: func,
                        params: params
                    }
                }
            })
        });
    }
    setSearchStr = (value) => {
        console.log(value);
        this.setState(prevState => ({
            searching: {
                ...prevState.searching,
                value: value.trim().length > 0 ? value.trim() : undefined
            }
        }));
    }
    renderComponent() {
        try {
            return (
                <div id="datagrid-element-block" style={this.props?.styles}>
                    {
                        this.props?.toolbar ? 
                            <div className="datagrid-toolbar">
                                {/* <div className="datagrid-toolbar-tools">
                                    {this.props?.tools ? this.props.tools.map((tool, idx) => { return (<DGTool key={idx} disabled={this.state.isLoading} caption={tool.caption} icon={tool.icon} isImage={tool?.isImage} hoverColor={tool?.color} onClickAction={{ action: (typeof tool?.func) === "function" ? { func: tool.func, params: { _dataGridData: this.returnCurrentDataState(), ...tool?.funcParams } } : undefined, redirect: tool?.redirect ? { path: tool?.redirect?.path } : undefined }} />); }) : null}
                                </div> */}
                                {
                                    this.props?.searchTool ?
                                        <div className="datagrid-toolbar-search">
                                            <ISDGSearchTool width="" fullWidth={true} removeBaseCSS={true} disabled={false} required={false} placeholder={this.props?.searchToolPlaceholder ?? 'Search'} inputIcon={{ icon: "Loupe" }} onReturnData={{ func: this.setSearchStr }} />
                                        </div>
                                    : null
                                }
                            </div>
                        : null
                    }
                    <div className="datagrid-container">
                        <div className="datagrid-elements-container">
                            <table id="datagrid">
                                <thead>
                                    <tr>
                                        {this.props?.rowNum ? <th className="datagrid-numcolumn"></th> : null}
                                        {this.props.fields.map((field, idx) => {
                                            return (<th key={idx} className="datagrid-header">
                                                <div className="datagrid-header-container" style={{ width: field?.width ? `${field?.width}px` : null }}>
                                                    <div className="datagrid-header-left-handlers">
                                                        <div className="datagrid-header-title" title={field?.columnName ?? ''}>{field.columnName}</div>
                                                        {/* <div className="datagrid-header-handlers">
                                                            <div className="datagrid-thead-buttons">
                                                                {field.sorting ?
                                                                    <div className="datagrid-sorter" style={{ filter: field.key === this.state.sorting?.sortingBy?.columnKey ? "drop-shadow(0px 0px 2px #70c6ffff)" : null }} onClick={() => { this.setSortDataState({ data: this.sortData({ rowData: this.state?.data, columnKey: field.key, dataType: field.dataType }), columnKey: field.key, dataType: field.dataType }) }}>
                                                                    <img alt="" style={{ background: field.key === this.state.sorting?.sortingBy?.columnKey ? '#077be1' : '#666666', transform: `rotate(${field.key === this.state.sorting?.sortingBy?.columnKey && this.state.sorting?.increasing ? '180' : '0'}deg)` }} /></div>
                                                                : null}
                                                            </div>
                                                        </div> */}
                                                    </div>
                                                    <div className="datagrid-header-right-handlers">
                                                        <div className="datagrid-resizer" onMouseDown={(event) => this.resizeColumn(event)}><img alt="" /></div>
                                                    </div>
                                                </div>
                                            </th>)
                                        })}
                                    </tr>
                                </thead>
                                <tbody>
                                    {!this.props?.data ? null :
                                        this.state?.data?.filter(el => !el.hidden)?.map((rowData, rowIdx) => {
                                            return (<tr key={rowData.rowId}>
                                                {this.props?.rowNum ? <td className="datagrid-numcolumn"><div>{rowIdx + 1}</div></td> : null}
                                                {this.props.fields.map((field, fIdx) => {
                                                    return (<td key={fIdx} style={{ background: rowData.rowId === this.state.selected?.row && fIdx === this.state.selected?.cell ? this.props?.cellColor ?? this.defaultCellColor : rowData.rowId === this.state.selected?.row ? this.props?.rowColor ?? this.defaultRowColor : 'white', }} onClick={() => { this.setState({ selected: { row: rowData.rowId, cell: fIdx, currentData: rowData.data[field?.key], rowData: rowData.data } }) }} onDoubleClick={(event) => { this.props?.onDoubleClick?.func({ event: event, data: rowData.data, params: { ...this.props?.onDoubleClick?.params } }) }} onContextMenu={this.props?.contextMenu ? (event) => { this.setState({ selected: { row: rowData.rowId, cell: fIdx }, selectedData: rowData.data }); this.showContext(event); } : null}>
                                                        <div className="datagrid-cell" style={{ paddingLeft: fIdx === 0 ? `${rowData.level * 15}px` : '' }}>
                                                            {rowData.isParent && fIdx === 0 ? <div className="datagrid-parent-shrink" onClick={() => this.shrinkChilds({ parentId: rowData.data[this.props.idKey], idKey: this.props.idKey, parentIdKey: this.props.parentIdKey, gridData: this.state.data })}><img alt="" style={{ transform: `rotate(${rowData.childsHidden ? -90 : 0}deg)` }} /></div> : null}
                                                            {this.props?.parentIdKey && !rowData.isParent && fIdx === 0 ? <div className="datagrid-parent-shrink-plug"></div> : null}
                                                            {rowData.icon && fIdx === 0 ? <div className="datagrid-item-icon"><img alt="" src={`/src/assets/${rowData.icon}.svg`} /></div> : null}
                                                            {field?.render && (typeof field?.render === "function") ? <div className="datagrid-cell-data" style={{ ...field?.style}}>{field?.render(rowData.data)}</div> ?? '' : <span>{this.toDefaultFormat(rowData.data[field?.key], field?.dataType)}</span>}
                                                        </div>
                                                    </td>)
                                                })}
                                            </tr>)
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        {this.state.isLoading || this.state?.data ? null : <NonData />}
                    </div>
                </div>
            );
        } catch (error) {
            return JSON.stringify(error.stack.split('\n'));
        }
        
    }
}


class ISDGSearchTool extends Component {
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
                        <span className="dgsearchtool-caption" style={{ fontSize: inputStyle.fontSize }}>{this.props.required ? this._getRequiredSign() : null}{this.props?.caption ? this.props?.caption : null}</span>
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

class NonData extends Component {
    render() {
        return (
            <div className="datagrid-nondata-container">
                <div className="datagrid-nondata-icon"><img alt="" /></div>
                <div className="datagrid-nondata-caption">Ничего не найдено</div>
            </div>
        );
    }
}


class DataRender {
    toDateFormat(jsDate) {
        return `${jsDate.getDate() < 10 ? '0' : ''}${jsDate.getDate()}.${(jsDate.getMonth() + 1) < 10 ? '0' : ''}${jsDate.getMonth() + 1}.${jsDate.getFullYear()}`;
    }
    toDateTimeFormat(jsDateTime) {
        return `${jsDateTime.getDate() < 10 ? '0' : ''}${jsDateTime.getDate()}.${(jsDateTime.getMonth() + 1) < 10 ? '0' : ''}${jsDateTime.getMonth() + 1}.${jsDateTime.getFullYear()} ${jsDateTime.getHours()}:${jsDateTime.getMinutes() < 10 ? `0${jsDateTime.getMinutes()}` : jsDateTime.getMinutes() }`;
    }
    selectFromDictionary(params) {
        const { data, chainKeys } = params;
        const executedData = chainKeys[0] in data ? data[chainKeys[0]] : undefined;
        const newChainKeys = chainKeys.length > 1 ? chainKeys.slice(1, chainKeys.length) : [];

        if (executedData === undefined || newChainKeys.length === 0)
            return executedData;
        return this.selectFromDictionary({ data: executedData, chainKeys: newChainKeys });
    }
}