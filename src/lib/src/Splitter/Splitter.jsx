import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './splitter.css';


class Splitter extends BaseComponent {
    constructor(props) {
        super();
        this.requiredProps = [{ name: 'splitRule', constValue: ['vertical', 'horizontal'] }];
        this.state = {
            mainBlockWidth: props?.mainBlockWidth ?? "200px",
        }
    }
    resizeBlock = (event) => {
        event.preventDefault();

        const resizedBlock = event.target.parentElement.getElementsByClassName(`splitter-${this.props.splitRule}-first`)[0];
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
            <div className="splitter-container" style={{ width: "100%", height: "100%" }}>
                {
                    this.props.splitRule === "vertical" ?
                        <div className="splitter-vertical" style={{ flexDirection: this.props?.reverse ? "row-reverse" : null }}>
                            <div className="splitter-vertical-first" style={{ width: this.state.mainBlockWidth, ...this.props?.style?.firstBlock }}>
                                {this.props?.firstBlockContent}
                            </div>
                            {this.props?.removeResizeBlock ? null : <div className={`splitter-vertical-resizer${this.props?.addResize ? ' splitter-verticalresize-active' : ''}`} onMouseDown={(event) => { if (this.props?.addResize) { this.resizeBlock(event) } }}></div>}
                            <div className="splitter-vertical-second" style={{ ...this.props?.style?.secondBlock }}>
                                {this.props?.secondBlockContent}
                            </div>
                        </div>
                    : this.props.splitRule === "horizontal" ? 
                        <div className="splitter-horizontal" style={{ flexDirection: this.props?.reverse ? "column-reverse" : "column" }}>
                            <div className="splitter-horizontal-first" style={{ height: this.state.mainBlockWidth, ...this.props?.style?.firstBlock }}>
                                {this.props?.firstBlockContent}
                                </div>
                                {this.props?.removeResizeBlock ? null : <div className={`splitter-horizontal-resizer${this.props?.addResize ? ' splitter-horizontalresize-active' : ''}`} onMouseDown={(event) => { if (this.props?.addResize) { this.resizeBlock(event) } }}></div>}
                            <div className="splitter-horizontal-second" style={{ ...this.props?.style?.secondBlock }}>
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