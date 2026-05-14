import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './splitter.css';


class Splitter extends BaseComponent {
    constructor(props) {
        super();
        this._propsRules = [
            { name: 'splitRule', required: true, constStrings: ['vertical', 'horizontal'] },
            { name: 'reverse', type: 'boolean' },
            { name: 'addResize', type: 'boolean' },
            { name: 'removeResizeBlock', type: 'boolean' },
            { name: 'mainBlockWidth', type: 'string' },
            { name: 'containerStyles', type: 'Object' }
        ];
        this.state = {
            mainBlockWidth: props?.mainBlockWidth ?? "200px",
        }
    }
    resizeBlock = (event) => {
        event.preventDefault();

        const resizedBlock = event.target.parentElement.getElementsByClassName(`jsxrc-splitter-${this.props.splitRule}-first`)[0];
        const resizedBlockWidth = this.props.splitRule === "vertical" ? resizedBlock.offsetWidth : resizedBlock.offsetHeight;
        this.setState({
            resizeState: {
                pageDirection: this.props.splitRule === "vertical" ? event.pageX : event.pageY,
                currentBlock: resizedBlock,
                currentBlockWidth: resizedBlockWidth,
            }
        });
        const mMove = (event) => {
            if (this.state.resizeState.currentBlock) {
                var different = (this.props.splitRule === "vertical" ? event.pageX : event.pageY) - this.state.resizeState.pageDirection;
                let currentBlock = this.state.resizeState.currentBlock;

                if (this.props.splitRule === "vertical") {
                    currentBlock.style.width = (this.state.resizeState.currentBlockWidth + (this.props?.reverse ? -different : different)) + 'px';
                } else {
                    currentBlock.style.height = (this.state.resizeState.currentBlockWidth + (this.props?.reverse ? -different : different)) + 'px';
                }
                

                this.setState(prevState => ({
                    resizeState: {
                        ...prevState.resizeState,
                        currentBlock: currentBlock,
                    }
                }));
            }
        }
        const mUp = () => {
            this.setState({
                resizeState: {
                    pageDirection: undefined,
                    currentBlock: undefined,
                    currentBlockWidth: undefined,
                }
            });
            document.removeEventListener('mousemove', mMove);
            document.removeEventListener('mouseup', mUp);
        }
        document.addEventListener('mousemove', mMove);
        document.addEventListener('mouseup', mUp);
    }
    renderComponent() {
        return (
            <div className="jsxrc-splitter-container" style={this.props?.containerStyles}>
                {
                    this.props.splitRule === "vertical" ?
                        <div className={`jsxrc-splitter-vertical ${this.props?.reverse ? 'jsxrc-splitter-vertical-reversed' : 'jsxrc-splitter-vertical-row'}`}>
                            <div className="jsxrc-splitter-vertical-first" style={{ width: this.state.mainBlockWidth, ...this.props?.style?.firstBlock }}>
                                {this.props?.firstBlockContent}
                            </div>
                            {this.props?.removeResizeBlock ? null : <div className={`jsxrc-splitter-vertical-resizer${this.props?.addResize ? ' jsxrc-splitter-verticalresize-active' : ''}`} onMouseDown={(event) => { if (this.props?.addResize) { this.resizeBlock(event) } }}></div>}
                            <div className="jsxrc-splitter-vertical-second" style={{ ...this.props?.style?.secondBlock }}>
                                {this.props?.secondBlockContent}
                            </div>
                        </div>
                    : this.props.splitRule === "horizontal" ? 
                        <div className={`jsxrc-splitter-horizontal ${this.props?.reverse ? 'jsxrc-splitter-horizontal-reversed' : 'jsxrc-splitter-horizontal-column'}`}>
                            <div className="jsxrc-splitter-horizontal-first" style={{ height: this.state.mainBlockWidth, ...this.props?.style?.firstBlock }}>
                                {this.props?.firstBlockContent}
                                </div>
                                {this.props?.removeResizeBlock ? null : <div className={`jsxrc-splitter-horizontal-resizer${this.props?.addResize ? ' jsxrc-splitter-horizontalresize-active' : ''}`} onMouseDown={(event) => { if (this.props?.addResize) { this.resizeBlock(event) } }}></div>}
                            <div className="jsxrc-splitter-horizontal-second" style={{ ...this.props?.style?.secondBlock }}>
                                {this.props?.secondBlockContent}
                            </div>
                        </div>
                    : null
                }
            </div>
        );
    }
}

export default Splitter;