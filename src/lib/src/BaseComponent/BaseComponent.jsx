import { Component } from 'react';
import './basecomponent.css';


class BaseComponent extends Component {
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
            this.checkRequiredProps(this?.requiredProps) ?? this.renderComponent() :
            <div className="basecomponent-error-container"><span>{`ERROR! Required method 'renderComponent' is not defined`}</span></div>;
    }
}

export default BaseComponent;