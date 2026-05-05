import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './flipcard.css';


class FlipCard extends BaseComponent {
    constructor() {
        super();
        this._propsRules = [
            { name: 'width', required: true, type: 'number' },
            { name: 'height', required: true, type: 'number' },
            { name: 'front', type: 'any' },
            { name: 'back', type: 'any' },
            { name: 'frontSurfaceStyles', type: 'Object' },
            { name: 'backSurfaceStyles', type: 'Object' },
            { name: 'selfFlippers', type: 'boolean' }
        ];
    }
    renderComponent() {
        const CSSVariables = {
            '--jsxrc-cardflip-width': `${this.props?.width}px`,
            '--jsxrc-cardflip-height': `${this.props?.height}px`,
            '--jsxrc-cardflip-perspective': `${this.props?.width + 100}px`
        };

        return (
            <div className="jsxrc-flipcard-container">
                <div className="jsxrc-flipcard" style={CSSVariables}>
                    <input name="jsxrc-flipcard-state" id="jsxrc-flipcard-state" type="checkbox"/>
                    <div className="jsxrc-flipcard-inner">
                        <div className="jsxrc-flipcard-front" style={this.props?.frontSurfaceStyles}>
                            {this.props?.selfFlippers ? null : <label className="jsxrc-flipcard-flipper" htmlFor="jsxrc-flipcard-state">Flip</label>}
                            {this.props?.front}
                        </div>
                        <div className="jsxrc-flipcard-back" style={this.props?.backSurfaceStyles}>
                            {this.props?.selfFlippers ? null : <label className="jsxrc-flipcard-flipper" htmlFor="jsxrc-flipcard-state">Flip</label>}
                            {this.props?.back}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default FlipCard;