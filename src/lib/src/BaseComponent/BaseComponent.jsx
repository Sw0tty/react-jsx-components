import { Component } from 'react';
import './basecomponent.css';


class BaseComponent extends Component {
    constructor() {
        super();
        this._baseActionColorBorder = "#52aaca";
        this._baseActionColorShadow = "#b3e6f8";
    }
    _checkPropsRules(propsRules) {
        if (!propsRules || propsRules.length === 0) {
            return;
        }

        if (!Array.isArray(propsRules)) {
            return this._getErrorBlock(`PropsRules object must be type of 'Array'`);
        }

        for (let prop of propsRules) {
            if (!(prop.constructor === Object)) {
                return this._getErrorBlock(`ERROR! Prop must be type of 'Object'`);
            }

            if (!(prop?.name) || prop.name.trim().length === 0) {
                return this._getErrorBlock(`ERROR! Prop key 'name' must be a not empty string`);
            }
            
            let propError;

            if ('required' in prop) {
                if (typeof(prop.required) !== 'boolean') {
                    return this._getErrorBlock(`ERROR! Rule of 'required' must be type of 'boolean'.`);
                }

                if (!(prop.name in this.props) || this.props[prop.name] === undefined) {
                    return this._getErrorBlock(`ERROR! Prop '${prop.name}' is required and can't be undefined.`);
                }
            }

            if ('type' in prop) {
                propError = this._checkSingleDataTypeProp(prop);
            }

            if ('constStrings' in prop) {
                propError = this._checkSingleConstStringsProp(prop);
            }

            if ('interval' in prop) {
                propError = this._checkIntervalProp(prop);
            }

            if (propError) {
                return propError;
            }
        }
        return;
    }
    _checkSingleDataTypeProp(prop) {
        if (!(prop?.type) || prop.type.trim().length === 0) {
            return this._getErrorBlock(`Prop key 'type' must be a not empty string`);
        }

        if (prop.name in this.props) {
            switch (prop.type) {
                case 'string':
                    if (typeof(this.props[prop.name]) !== prop.type) {
                        return this._getErrorBlock(`Value of prop '${prop.name}' not equal to required type of '${prop.type}'`);
                    }
                    if (this.props[prop.name].trim().length === 0) {
                        return this._getErrorBlock(`For type 'string' prop must be not empty`);
                    }
                    break;
                case 'number':
                case 'boolean':
                    if (typeof(this.props[prop.name]) !== prop.type) {
                        return this._getErrorBlock(`ERROR! Unexpected value '${this.props[prop.name]}' of prop '${prop.name}'. Value type not equal to required type of '${prop.type}'`);
                    }
                    break;
                case 'Array':
                    if (!Array.isArray(this.props[prop.name])) {
                        return this._getErrorBlock(`Value of prop '${prop.name}' not equal to required type of '${prop.type}'`);
                    }
                    break;
                case 'ArrayOfStrings':
                    if (!Array.isArray(this.props[prop.name])) {
                        return this._getErrorBlock(`Value of prop '${prop.name}' not equal to required type of '${prop.type}'`);
                    }
                    for (let i of this.props[prop.name]) {
                        if (typeof(i) !== 'string') {
                            return this._getErrorBlock(`Values of Array prop '${prop.name}' not equal to required type of 'string'`);
                        }
                    }
                    break;
                case 'ArrayOfObjects':
                    if (!Array.isArray(this.props[prop.name])) {
                        return this._getErrorBlock(`Value of prop '${prop.name}' not equal to required type of '${prop.type}'`);
                    }
                    for (let i of this.props[prop.name]) {
                        if (typeof(i) !== 'object') {
                            return this._getErrorBlock(`Values of Array prop '${prop.name}' not equal to required type of 'object'`);
                        }
                    }
                    break;
                case 'Object':
                    if (this.props[prop.name].constructor !== Object) {
                        return this._getErrorBlock(`Prop '${prop.name}' must be type of 'Object'.`);
                    }
                    break;
                case 'function':
                    if (typeof(this.props[prop.name]) !== 'function') {
                        return this._getErrorBlock(`Prop '${prop.name}' must be type of 'function'.`);
                    }
                    break;
                case 'CallbackObject':
                    if ((this.props[prop.name].constructor !== Object) || !('func' in this.props[prop.name]) || (typeof(this.props[prop.name].func) !== 'function')) {
                        return this._getErrorBlock(`Prop with type of 'CallbackObject' must be Object with required key 'func' and value type of 'function'.`);
                    }
                    break;
                default:
                    return this._getErrorBlock(`ERROR! Unexpected type '${prop.type}' for rule 'type'.`);
            }
        }

        return;
    }
    _checkSingleConstStringsProp(prop) {
        if (!(prop?.constStrings) || !Array.isArray(prop.constStrings) || prop.constStrings.length < 2) {
            return this._getErrorBlock(`ERROR! Rule of 'constStrings' must be a Array and having more than one item.`);
        }

        if (prop.name in this.props && !prop.constStrings.includes(this.props[prop.name])) {
            return this._getErrorBlock(`Prop '${prop.name}' must be one of the items of the - ${prop.constStrings.map(el => el).join(', ')}`);
        }

        return;
    }
    _checkIntervalProp(prop) {
        if (!Array.isArray(prop.interval)) {
            return this._getErrorBlock(`Interval object must be type of 'Array'`);
        }

        if (prop.interval.length !== 2) {
            return this._getErrorBlock(`Interval must have two items, where first is min value and second is max value`);
        }

        if (typeof(prop.interval[0]) !== 'number' || typeof(prop.interval[1]) !== 'number') {
            return this._getErrorBlock(`Interval items must be a type of 'number'`);
        }

        if (prop.interval[0] >= prop.interval[1]) {
            return this._getErrorBlock(`First item must be less, than second item.`);
        }

        if (prop.name in this.props && (this.props[prop.name] < prop.interval[0] || this.props[prop.name] > prop.interval[1])) {
            return this._getErrorBlock(`Prop '${prop.name}' not in interval from ${prop.interval[0]} to ${prop.interval[1]}.`);
        }

        return;
    }
    setComponentData(stateKey, newValue) {
        this.setState({
            [stateKey]: newValue
        });

        if (this.props?.onReturnData) {
            const { func, params } = this.props.onReturnData;

            if (typeof(func) === "function") {
                return func(newValue, params ?? undefined);
            }
            console.error("TypeError: 'onReturnData' not include 'func' param or 'func' is not a function");
        }
    }
    updateValueState = (params) => {
        const { stateKey, newValue, lastStateValue } = params;

        if (newValue !== lastStateValue) {
            this.setState({
                [stateKey]: newValue,
            });
        }
    }
    _getErrorBlock(message) {
        return <div className="basecomponent-error-container"><span>{message ?? 'ERROR'}</span></div>;;
    }
    _getRequiredSign() {
        return <span className="basecomponent-required-sign">*</span>;
    }
    render() {
        return this?.renderComponent ?
            this._checkPropsRules(this?._propsRules) ?? this.renderComponent()
            :
            this._getErrorBlock(`ERROR! Required method 'renderComponent' is not defined`);
    }
}

export default BaseComponent;