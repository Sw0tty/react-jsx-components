import { Component } from 'react';
import './basecomponent.css';


class BaseComponent extends Component {
    checkRequiredProps_NEW(requiredProps) {
        if (!requiredProps || requiredProps.length == 0) {
            return;
        }

        if (!Array.isArray(requiredProps)) {
            return <div className="basecomponent-error-container"><span>ERROR! RequiredProps object must be typeof 'Array'</span></div>; 
        }

        for (let prop of requiredProps) {
            if (!(prop.constructor == Object)) {
                return <div className="basecomponent-error-container"><span>ERROR! Prop must be typeof 'Object'</span></div>;
            }

            if (!(prop?.name) || prop.name.trim().length == 0) {
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
    checkRequiredProps(requiredProps) {
        if (!requiredProps)
            return;

        for (let prop of requiredProps) {
            if (!(prop in this.props)) {
                return <div className="basecomponent-error-container"><span>{`ERROR! Prop '${prop}' is required`}</span></div>;
            }
        }
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
    getRequiredSign() {
        return <span className="basecomponent-required-sign">*</span>;
    }
    render() {
        return this?.renderComponent ?
            this.checkRequiredProps_NEW(this?.requiredProps) ?? this.renderComponent() :
            <div className="basecomponent-error-container"><span>{`ERROR! Required method 'renderComponent' is not defined`}</span></div>;
    }
}

export default BaseComponent;