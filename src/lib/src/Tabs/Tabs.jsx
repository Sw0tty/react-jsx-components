import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './tabs.css';


class Tabs extends BaseComponent {
    constructor(props) {
        super();
        this._propsRules = [{ name: 'panels', type: 'ArrayOfObjects', required: true }, { name: 'style', type: 'Object' }];
        this.state = {
            panels: props?.panels,
            activeIdx: 0
        }
    }
    renderComponent() {
        return (
            <div className="tabs-container" style={this.props?.style}>
                <ul className="tabs">
                    {this.props?.panels?.map((panel, idx) => {
                        return (
                            <li key={idx} title={panel.name} className={`${idx === this.state.activeIdx ? "active" : ''}`} onClick={() => this.setState({ activeIdx: idx })}>
                                <div style={{ '--tabs-actionColor-baseColor': panel?.color ?? '#959595', background: panel?.color ? `${panel.color}20` : '' }}>
                                    <span>{panel.name}</span>
                                </div>
                            </li>
                        );
                    })}
                </ul>
                <div style={{ position: "relative", overflow: "hidden", height: "100%", display: "flex" }}>
                    <>
                        {this.props?.panels?.map((panel, idx) => {
                            return (
                                <div className={`tabs-content`} style={{ borderColor: panel?.useColorTab ? panel.color : '#959595',  display: idx === this.state.activeIdx ? "block" : 'none' }}>
                                <div key={idx} className={`tabs-panel`} style={{ background: panel?.color && panel?.useColorTab ? `${panel.color}20` : '' }}>
                                    {panel.data}
                                </div>
                                </div>
                            );
                        })}
                    </>
                </div>
            </div>
        );
    }
}

export default Tabs;