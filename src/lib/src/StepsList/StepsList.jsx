import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './stepslist.css';


class StepsList extends BaseComponent {
    constructor(props) {
        super();
        this._propsRules = [{ name: 'steps', type: 'Array' }];
        this.stepsCount = props?.steps.length;
        this.baseColor = '#0a70cb';
    }
    renderComponent() {
        const STEPS_COUNT = this.props?.steps?.length;
        return (
            <div className="jsxrc-stepslist-container" style={{ width: this.props?.width, ...this.props?.style }}>
                {this.props.steps.map((step, idx) => {
                    return (
                        <div key={idx} className="jsxrc-stepslist-step-container">
                            <div className="jsxrc-stepslist-step-header" style={{ flexDirection: this.props?.reverse ? "row-reverse" : null }}>
                                <div className="jsxrc-stepslist-step-num" style={{ color: this.props?.stepsColor ?? this.baseColor, borderColor: this.props?.stepsColor ?? this.baseColor }}>
                                    {!this.props?.stayNum && idx + 1 === STEPS_COUNT ? "✔" : idx + 1}
                                </div>
                                <div className="jsxrc-stepslist-step-title">{step.title}</div>
                            </div>
                            {
                                idx + 1 === STEPS_COUNT && !step?.description ? null :
                                    <div className="jsxrc-stepslist-step-body" style={{ flexDirection: this.props?.reverse ? "row-reverse" : null }}>
                                        <div className="jsxrc-stepslist-step-body-line-container">
                                            {idx + 1 === STEPS_COUNT ? null : <div className="jsxrc-stepslist-step-body-line"></div>}
                                        </div>
                                        <div className="jsxrc-stepslist-step-body-description">
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