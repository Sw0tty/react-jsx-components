import { Component, createRef } from 'react';
import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import CheckCircle from './CheckCircle.svg';
import CrossCircle from './CrossCircle.svg';



import { DGCheckBox, DGSearchTool, DGTool, DGContextMenu, DGButton } from './DGComponents.jsx';

import './datagrid.css';


// --- Props info ---
// data            *  (Array(Dictionaries)) - data for render in datagrid
// lastDataUpdate  *  (Date)                - date of last updating data (if component only rerender needed for reload data)
// fields          *  (Array(Dictionaries)) - rules of getting, render and working with passed data
//                 Example: [
//                            { key: "name", columnName: "Name", dataType: "string", width: 150, sorting: false, filter: true },
//                            { key: "creationDateTime", columnName: "Creation date time", dataType: "datetime", width: 80, sorting: true, filter: false },
//                            { key: "number", columnName: "Custom number", dataType: "string", width: 80, sorting: false, filter: false, render: (rowData) => { return `<div><img src="someImg.png" /><span>${rowData.number}</span></div>`; } }
//                          ],
// idKey           ?  (string)              - name of id key for each row data dictionary (only for data with Parent|Child hierarchy)
// parentIdKey     ?  (string)              - name of parent id key for each row data dictionary (only for data with Parent|Child hierarchy)
// iconsParams     ?  (object)              - render params for each items in table
//                 1) Rendering by searching for the value in the element data and equating it with the value of the passed icon dictionary
//                 Example:
//                   {
//                     byKey: {
//                         key: "recordType",
//                         icons: [
//                             { typeName: "FOLDER", iconName: "Stack" },
//                             { typeName: "RECORD", iconName: "File" }
//                         ]
//                      }
//                   }
//                 2) Rendering each row with same icon
//                 Example:
//                   { eachItem: "File" }
// contextMenu     ?  (Array(Dictionaries)) - rules to build action in ContextMenu component
//                 Example: [
//                            [
//                              { caption: "View item", icon: "EyeShow", accessRoles: ["admin", "def_user"], onClick: { redirect: "Items?id=" }, redirectUpdateRules: [{ rule: 'ADD', fromSelected: 'id' } ] }
//                            ],
//                            [
//                              { caption: "Create item", icon: "Create", accessRoles: ["admin"], onClick: { redirect: "Items?id=" }, redirectUpdateRules: [{ rule: 'ADD', fromSelected: 'id' }] },
//                              { caption: "Update item", icon: "Update", accessRoles: ["admin"], onClick: { func: "updateModalForm", params: { a: "some", b: 22181 } } }   // func was added from DataGrid methods
//                              { caption: "Detele item", icon: "Delete", color: "red", accessRoles: ["admin"], onClick: { func: function(), params: { a: "some", b: 22181 } } }   // func was passed from parent of DataGrid component
//                            ],
//                          ]
// rowNum          ?  (bool)                - add row number for each row
// checkBoxes      ?  (bool)                - add checkboxes for each row
// toolbar         ?  (bool)                - add toolbar
// searchTool      ?  (bool)                - add search in datagrid (toolbar is required for activate)
// tools           ?  (Array(Dictionaries)) - rules to build tools
//                 Example: [
//                            { caption: "Create", icon: "Create", isImage: true, redirect: { path: 'Items/Create' } },
//                            { caption: "Refresh data", color: "green", icon: "Refresh", func: function() }
//                          ]
// styles          ?  (CSS Dictionary)      - style for datagrid container
class DataGrid extends BaseComponent {
    constructor(props) {
        super();
        this.requiredProps = ['fields'];
        let convertedData = this.convertDataForGrid({ data: props?.data, idKey: props?.idKey, parentIdKey: props?.parentIdKey, iconsParams: props?.iconsParams });
        this.wrapperRef = createRef();
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
        if (event.key.toLowerCase() == 'c' && (event.ctrlKey || event.metaKey) && this.state.selected.currentData) {
            navigator.clipboard.writeText(this.state.selected.currentData);
        }
    }
    returnTreeFromRoot = (params) => {
        const { idKey, parentIdKey, rootId, gridData, treeElems=[] } = params;
        const rootChilds = gridData.filter(el => el.data[parentIdKey] == rootId);

        if (rootChilds.length > 0) {
            for (let el of rootChilds) {
                this.returnTreeFromRoot({ idKey, parentIdKey, rootId: el.data[idKey], gridData, treeElems })
            }
        }
        treeElems.push(gridData.find(el => el.data[idKey] == rootId))
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
                if (el.data[idKey] == treeRoot.data[idKey]) {
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
                if (el.isParent && el.level == 0) {
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
                const icon = byKeyParams.icons?.find(el => el.typeName == data[byKeyParams?.key])?.iconName;
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
                    const rootChilds = childs.filter(ch => ch[parentKey] == root[key]);

                    if (rootChilds.length == 0) {
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
                return (<img className="datagrid-cell-img" style={{ WebkitMaskImage: `url(${data ? CheckCircle : CrossCircle})`, maskImage: `url(${data ? CheckCircle : CrossCircle})` }} />);
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
            if (lastQueue == 0) {
                return 1;
            } else if (columnKey == lastQueueColumn) {
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
            searchBy: undefined,
            sorting: {
                isSorting: false,
                increasing: false,
                sortingBy: undefined
            },
            filters: gridFilters
        });
    }
    componentDidUpdate() {
        if (this.state.lastDataUpdate != this.props.lastDataUpdate) {
            this.setDefaultGridState();
        }
    }
    componentDidMount() {
        this.switchLoading({ isLoading: false });
    }
    checkRow = (checked, params) => {
        const { id } = params;

        this.setState({
            data: this.state.data.map(el => el.rowId == id ? { ...el, checked: checked } : el)
        });
    }
    updateRedirectPath = (params) => {
        const { defaultPath, updateRules, selectedData } = params;
        let newPath = defaultPath;

        for (let ruleParams of updateRules) {
            if (ruleParams.rule == "ADD") {
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
        //console.log(value);
    }
    renderComponent() {
        try {
            return (
                <div id="datagrid-element-block" style={this.props?.styles}>
                    {
                        this.props?.toolbar ? 
                            <div className="datagrid-toolbar">
                                <div className="datagrid-toolbar-tools">
                                    {this.props?.tools ? this.props.tools.map((tool, idx) => { return (<DGTool key={idx} disabled={this.state.isLoading} caption={tool.caption} icon={tool.icon} isImage={tool?.isImage} hoverColor={tool?.color} onClickAction={{ action: (typeof tool?.func) === "function" ? { func: tool.func, params: { _dataGridData: this.returnCurrentDataState(), ...tool?.funcParams } } : undefined, redirect: tool?.redirect ? { path: tool?.redirect?.path } : undefined }} />); }) : null}
                                </div>
                                {
                                    this.props?.searchTool ?
                                        <div className="datagrid-toolbar-search">
                                            <DGSearchTool width="" fullWidth={true} removeBaseCSS={true} disabled={false} required={false} placeholder={this.props?.searchToolPlaceholder ?? 'Search'} inputIcon={{ icon: "Loupe" }} onReturnData={{ func: this.setSearchStr }} />
                                        </div>
                                    : null
                                }
                            </div>
                        : null
                    }
                    <div className="datagrid-container">
                        {/* {this.state.isLoading ? <Loading size={60} speed="1s" icon="Loading_3" blurStrong={3} /> : null} */}
                        <div className="datagrid-elements-container">
                            {this.props?.contextMenu && this ? <DGContextMenu onHide={this.hideContext} hidden={this.state.contextHidden} contextPos={this.state.contextPos} contextActions={this.updateContextMenu({ thisClass: this, contextParams: this.props?.contextMenu, selectedData: this.state?.selectedData })} /> : null}
                            <table id="datagrid">
                                <thead>
                                    <tr>
                                        {this.props?.rowNum ? <th className="datagrid-numcolumn"></th> : null}
                                        {this.props.fields.map((field, idx) => {
                                            return (<th key={idx} className="datagrid-header">
                                                <div className="datagrid-header-container" style={{ width: field?.width ? `${field?.width}px` : null }}>
                                                    <div className="datagrid-header-left-handlers">
                                                        <div className="datagrid-header-title" title={field?.columnName ?? ''}>{field.columnName}</div>
                                                        <div className="datagrid-header-handlers">
                                                            <div className="datagrid-thead-buttons">
                                                                {field.sorting ?
                                                                    <div className="datagrid-sorter" onClick={() => { this.setSortDataState({ data: this.sortData({ rowData: this.state?.data, columnKey: field.key, dataType: field.dataType }), columnKey: field.key, dataType: field.dataType }) }}>
                                                                    <img style={{ background: field.key == this.state.sorting?.sortingBy?.columnKey ? '#7aeaf3' : 'black', transform: `rotate(${field.key == this.state.sorting?.sortingBy?.columnKey && this.state.sorting?.increasing ? '180' : '0'}deg)` }} /></div>
                                                                : null}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="datagrid-header-right-handlers">
                                                        {field.filter ?
                                                            <div className="datagrid-filter-container">
                                                                <div className={`datagrid-filter${this.state.filters[field.key]?.queueNum > 0 ? " datagrid-filter-active" : ""}`} onClick={(event) => { this.switchFilterForm({ target: event.target, position: event.target.getBoundingClientRect(), columnKey: field.key }) }}>
                                                                    <img />
                                                                </div>
                                                                <DGFilter parentTarget={this.state.filters[field.key]?.parentTarget} hidden={this.state.filters[field.key]?.hidden ?? true} onHide={this.closeFilterForm} data={this.state?.filters[field.key]?.data} columnKey={field.key} onReturnData={this.addFiltersHandler} />
                                                            </div>
                                                            : null}
                                                        <div className="datagrid-resizer" onMouseDown={(event) => this.resizeColumn(event)}><img /></div>
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
                                                    return (<td key={fIdx} style={{ background: rowData.rowId == this.state.selected?.row && fIdx == this.state.selected?.cell ? 'var(--datagridCellSelectedColor)' : rowData.rowId == this.state.selected?.row ? 'var(--datagridRowSelectedColor)' : 'white', }} onClick={() => { this.setState({ selected: { row: rowData.rowId, cell: fIdx, currentData: rowData.data[field?.key], rowData: rowData.data } }) }} onDoubleClick={(event) => { this.props?.onDoubleClick?.func({ event: event, data: rowData.data, params: { ...this.props?.onDoubleClick?.params } }) }} onContextMenu={this.props?.contextMenu ? (event) => { this.setState({ selected: { row: rowData.rowId, cell: fIdx }, selectedData: rowData.data }); this.showContext(event); } : null}>
                                                        <div className="datagrid-cell" style={{ paddingLeft: fIdx == 0 ? `${rowData.level * 20}px` : '', ...field?.style }}>
                                                            {fIdx == 0 && this.props?.checkBoxes ? <div className="datagrid-checkbox-wrapper"><DGCheckBox value={rowData.checked} disabled={false} onReturnData={{ func: this.checkRow, params: { id: rowData.rowId } }} /></div> : null}
                                                            {rowData.isParent && fIdx == 0 ? <div className="datagrid-parent-shrink" onClick={() => this.shrinkChilds({ parentId: rowData.data[this.props.idKey], idKey: this.props.idKey, parentIdKey: this.props.parentIdKey, gridData: this.state.data })}><img style={{ transform: `rotate(${rowData.childsHidden ? -90 : 0}deg)` }} /></div> : null}
                                                            {this.props?.parentIdKey && !rowData.isParent && fIdx == 0 ? <div className="datagrid-parent-shrink-plug"></div> : null}
                                                            {rowData.icon && fIdx == 0 ? <div className="datagrid-item-icon"><img src={`/src/assets/${rowData.icon}.svg`} /></div> : null}
                                                            {field?.render && (typeof field?.render === "function") ? field?.render(rowData.data) ?? '' : this.toDefaultFormat(rowData.data[field?.key], field?.dataType)}
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
            //const errorStack = error.stack.split('\n');
            //error.stack.map((el, idx) => console.log(idx, el))
            console.log("Error", error);
            return JSON.stringify(error.stack.split('\n'));
            /*return (<div>
                {errorStack[1, errorStack.length].map((el, idx) => { return })}
            </div>);*/
        }
        
    }
}


class DGFilter extends Component {
    constructor(props) {
        super();
        this.state = {
            data: props?.data,
            hidden: props?.hidden,
            parentHandlerPress: false
        }
        this.wrapperRef = createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }
    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }
    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }
    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.current.contains(event.target) && event.target != this.props.parentTarget) {
            this.props.onHide({ columnKey: this.props.columnKey });
            this.setState({
                data: undefined,
            });
        }
    }
    hiddingHangler = () => {
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
            }, 300);
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
        if (this.state.hidden != this.props.hidden) {
            this.setState({
                data: this.props.data,
                parentHandlerPress: true
            });
            this.hiddingHangler();
        }
    }
    checkFiltersHandler = (isChecked, params) => {
        const { id } = params;
        const copyData = this.state?.data?.map(el => {
            if (el.id == id) {
                return { ...el, checked: isChecked }
            } return { ...el }
        });

        this.setState({
            data: copyData
        });
    }
    checkAllHandler = (params) => {
        const { data } = params;
        this.setState({
            data: data.map(el => { return { ...el, checked: true } })
        });
    }
    uncheckAllHandler = (params) => {
        const { data } = params;
        this.setState({
            data: data.map(el => { return { ...el, checked: false } })
        });
    }
    render() {
        return (
            <div ref={this.wrapperRef} className="datagrid-filter-form-container" style={{ position: "absolute", display: this.state?.bindingElement?.display ?? "none", height: this.state?.bindingElement?.willShow ? "250px" : 0, opacity: this.state?.bindingElement?.willShow ? 1 : 0, top: `30px` }}>
                <div className="datagrid-filter-form-header">
                    <div className="datagrid-filter-form-header-title">Фильтр столбца</div>
                    <div className="datagrid-filter-form-actions">
                        <DGButton icon="CheckSquare" caption="Отметить все" type="acceptHollow" onClickAction={{ func: this.checkAllHandler, params: { data: this.state.data } }} style={{ height: "20px", padding: "0px 8px", fontSize: "12px" }} />
                        <DGButton icon="UncheckSquare" caption="Снять все отметки" type="acceptHollow" onClickAction={{ func: this.uncheckAllHandler, params: { data: this.state.data } }} style={{ height: "20px", padding: "0px 8px", fontSize: "12px" }} />
                    </div>
                </div>
                <div className="datagrid-filter-form-data">
                    {this.state?.data?.map((item, idx) => {
                        return (<div className="datagrid-filter-form-data-item" key={idx}><DGCheckBox value={item.checked} disabled={false} onReturnData={{ func: this.checkFiltersHandler, params: { id: item.id } }} /><span title={item.value}>{item.value}</span></div>);
                    })}
                </div>
                <div className="datagrid-filter-form-buttons">
                    <DGButton caption="Ок" type="acceptHollow" onClickAction={{ func: this.props.onReturnData, params: { filters: this.state.data, columnKey: this.props.columnKey } }} style={{ height: "20px", padding: "2px 10px", fontSize: "13px" }} />
                </div>
            </div>
        )
    }
}













class NonData extends Component {
    render() {
        return (
            <div className="datagrid-nondata-container">
                <div className="datagrid-nondata-icon"><img /></div>
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

        if (executedData == undefined || newChainKeys.length == 0)
            return executedData;
        return this.selectFromDictionary({ data: executedData, chainKeys: newChainKeys });
    }
}

export default DataGrid;