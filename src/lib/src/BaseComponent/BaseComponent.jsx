import { Component } from 'react';
import './basecomponent.css';


class BaseComponent extends Component {
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
                case 'Object':
                    //
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






    _checkRequiredProps(requiredProps) {
        if (!requiredProps || requiredProps.length === 0) {
            return;
        }

        const BASE_PROP_NAME = '_requiredProps';

        if (!Array.isArray(requiredProps)) {
            return this._getErrorBlock(`[${BASE_PROP_NAME}] RequiredProps object must be type of 'Array'`);
        }

        for (let prop of requiredProps) {

            // if (!(prop in this.props)) {
            //     return this._getErrorBlock(`[${BASE_PROP_NAME}] Prop '${prop.name}' is required`);
            // }
            // continue;

            if (!(prop.constructor === Object)) {
                return <div className="basecomponent-error-container"><span>ERROR! Prop must be typeof 'Object'</span></div>;
            }

            if (!(prop?.name) || prop.name.trim().length === 0) {
                return <div className="basecomponent-error-container"><span>ERROR! Prop key 'name' must be a string</span></div>
            }

            if (!(prop.name in this.props)) {
                return <div className="basecomponent-error-container"><span>{`ERROR! Prop '${prop.name}' is required`}</span></div>;
            }

            if (prop?.type) {
                if (!['string', 'boolean', 'number', 'object', 'Array'].includes(prop.type.trim())) {
                    return <div className="basecomponent-error-container"><span>ERROR! Prop key 'type' must be a 'string', 'boolean', 'number' or 'object'</span></div>;
                }

                if (prop.type === 'string') {
                    if (this.props[prop.name].trim().length === 0) {
                        return <div className="basecomponent-error-container"><span>ERROR! For type 'string' prop must be not empty</span></div>;
                    }
                    continue;
                }
                if (prop.type === 'Array') {
                    if (!Array.isArray(this.props[prop.name])) {
                        return <div className="basecomponent-error-container"><span>{`ERROR! Value of prop '${prop.name}' not equal to required type of '${prop.type}'`}</span></div>;
                    }
                    continue;
                }
                if (typeof(this.props[prop.name]) !== prop.type) {
                    return <div className="basecomponent-error-container"><span>{`ERROR! Value of prop '${prop.name}' not equal to required type of '${prop.type}'`}</span></div>;
                }
            }

            if (prop?.constValue) {
                if (!Array.isArray(prop.constValue)) {
                    return <div className="basecomponent-error-container"><span>ERROR! Prop key 'constValue' must be type of Array</span></div>;
                }

                if (!prop.constValue.includes(this.props[prop.name.trim()])) {
                    return <div className="basecomponent-error-container"><span>{`ERROR! Prop '${prop.name}' must be one of: ${prop.constValue.join(', ')}`}</span></div>;
                }
            }
        }
    }
    _checkDataTypeProps(checkingProps) {
        if (!checkingProps || checkingProps.length === 0) {
            return;
        }

        const BASE_PROP_NAME = '_checkingProps';

        if (!Array.isArray(checkingProps)) {
            return this._getErrorBlock(`[${BASE_PROP_NAME}] CheckingProps object must be typeof 'Array'`);
        }
        
        for (let prop of checkingProps) {
            if (!(prop.constructor === Object)) {
                return this._getErrorBlock(`[${BASE_PROP_NAME}] Prop must be type of 'Object'`);
            }

            if (!(prop?.name) || prop.name.trim().length === 0) {
                return this._getErrorBlock(`[${BASE_PROP_NAME}] Prop key 'name' must be a string`);
            }

            if (!(prop?.type) || prop.type.trim().length === 0) {
                return this._getErrorBlock(`[${BASE_PROP_NAME}] Prop key 'type' must be a string`);
            }

            if (prop.name in this.props) {
                switch (prop.type) {
                    case 'string':
                        if (typeof(this.props[prop.name]) !== prop.type) {
                            return this._getErrorBlock(`[${BASE_PROP_NAME}] Value of prop '${prop.name}' not equal to required type of '${prop.type}'`);
                        }
                        if (this.props[prop.name].trim().length === 0) {
                            return this._getErrorBlock(`[${BASE_PROP_NAME}] For type 'string' prop must be not empty`);
                        }
                        break;
                    case 'number':
                    case 'boolean':
                        if (typeof(this.props[prop.name]) !== prop.type) {
                            return <div className="basecomponent-error-container"><span>{`[] ERROR! Value of prop '${prop.name}' not equal to required type of '${prop.type}'`}</span></div>;
                        }
                        break;
                    case 'Array':
                        if (!Array.isArray(this.props[prop.name])) {
                            return this._getErrorBlock(`[${BASE_PROP_NAME}] Value of prop '${prop.name}' not equal to required type of '${prop.type}'`);
                        }
                        break;
                    case 'Object':
                        //
                        break;
                    default:
                        return this._getErrorBlock();
                }
            }
        }

        return;
    }
    _checkConstProps(constProps) {
        if (!constProps || constProps.length === 0) {
            return;
        }
        const BASE_PROP_NAME = '_constProps';

        if (!Array.isArray(constProps)) {
            return this._getErrorBlock(`[${BASE_PROP_NAME}] ConstProps object must be typeof 'Array'`);
        }
        
        for (let prop of constProps) {
            if (!(prop.constructor === Object)) {
                return this._getErrorBlock(`[${BASE_PROP_NAME}] Prop must be type of 'Object'`);
            }

            if (!(prop?.name) || prop.name.trim().length === 0) {
                return this._getErrorBlock(`[${BASE_PROP_NAME}] Prop key 'name' must be a string`);
            }

            if (!(prop?.consts) || !Array.isArray(prop.consts) || prop.consts.length === 0) {
                return this._getErrorBlock(`[${BASE_PROP_NAME}] Prop key 'consts' must be a Array and having more than one item`);
            }

            if (prop.name in this.props && !prop.consts.includes(this.props[prop.name])) {
                return this._getErrorBlock(`[${BASE_PROP_NAME}] Prop '${prop.name}' must be one of the items of the - ${prop.consts.map(el => el).join(', ')}`);
            }
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
            this._checkPropsRules(this?._propsRules)
            //?? this._checkRequiredProps(this?._requiredProps) ?? this._checkDataTypeProps(this?._datatypeProps) ?? this._checkConstProps(this?._constProps)
            ?? this.renderComponent()
            :
            this._getErrorBlock(`ERROR! Required method 'renderComponent' is not defined`);
    }
}

export default BaseComponent;