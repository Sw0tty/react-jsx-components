import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './stepslist.css';


class StepsList extends BaseComponent {
    constructor() {
        super();
        this._propsRules = [{ name: 'steps', type: 'Array' }];
        this.stepsCount = this.props?.steps.length;
        this.baseColor = "#0a70cb";
    }
    renderComponent() {
        const STEPS_COUNT = this.props?.steps?.length;
        return (
            <div className="stepslist-container" style={{ width: this.props?.width, ...this.props?.style }}>
                {this.props.steps.map((step, idx) => {
                    return (
                        <div key={idx} className="stepslist-step-container">
                            <div className="stepslist-step-header" style={{ flexDirection: this.props?.reverse ? "row-reverse" : null }}>
                                <div className="stepslist-step-num" style={{ color: this.props?.stepsColor ?? this.baseColor, borderColor: this.props?.stepsColor ?? this.baseColor }}>
                                    {!this.props?.stayNum && idx + 1 === STEPS_COUNT ? "✔" : idx + 1}
                                </div>
                                <div className="stepslist-step-title">{step.title}</div>
                            </div>
                            {
                                idx + 1 === STEPS_COUNT && !step?.description ? null :
                                    <div className="stepslist-step-body" style={{ flexDirection: this.props?.reverse ? "row-reverse" : null }}>
                                        <div className="stepslist-step-body-line-container">
                                            {idx + 1 === STEPS_COUNT ? null : <div className="stepslist-step-body-line"></div>}
                                        </div>
                                        <div className="stepslist-step-body-description">
                                            {step.description}
                                        </div>
                                    </div>
                            }
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default StepsList;