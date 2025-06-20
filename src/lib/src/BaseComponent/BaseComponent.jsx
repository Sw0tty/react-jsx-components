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