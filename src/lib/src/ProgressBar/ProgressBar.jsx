import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './progressbar.css';


class ProgressBar extends BaseComponent {
    constructor() {
        super();
        this._propsRules = [
            { name: 'reverseCaption', type: 'boolean' },
            { name: 'width', type: 'string' },
            { name: 'progress', type: 'number', interval: [0, 100] },
            { name: 'width', type: 'string' },
            { name: 'length', type: 'string' },
            { name: 'color', type: 'string' },
            { name: 'vertical', type: 'boolean' }
        ];
    }
    renderComponent() {
        return (
            <div className="progressbar-container" style={{ flexDirection: this.props?.reverseCaption ? 'column-reverse' : 'column', ...this.props?.style }}>
                { this.props?.caption ? <div className="progressbar-caption">{this.props.caption}</div> : null }
                <div className={this.props?.vertical ? 'progressbar-bar-vertical' : 'progressbar-bar'} style={{ width: this.props?.vertical ? (this.props?.width ?? '20px') : (this.props?.length ?? ''), height: this.props?.vertical ? (this.props?.length ?? '') : (this.props?.width ?? '20px') }}>
                    <div className="progressbar-bar-progress-mask" style={{ width: this.props?.vertical ? '100%' : `${100 - this.props.progress}%`, height: this.props?.vertical ? `${100 - this.props.progress}%` : '100%'}}></div>
                    <div className="progressbar-bar-progress" style={{ background: this.props?.color ?? '#42d642' }}>
                        {(100 - this.props.progress) !== 0 ? <div className={this.props?.vertical ? 'progressbar-bar-progress-vertical-flow' : 'progressbar-bar-progress-flow'}></div> : null}
                    </div>
                </div>
            </div>
        );
    }
}

export default ProgressBar;