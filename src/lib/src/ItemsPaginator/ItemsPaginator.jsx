import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import './itemspaginator.css';


class ItemsPaginator extends BaseComponent {
    constructor(props) {
        super();
        this._propsRules = [{ name: 'items', type: 'ArrayOfObjects' }, { name: 'itemsOnPage', type: 'number' }];
        this.state = {
            itemsOnPage: props?.itemsOnPage ?? 50,
            pages: this.calcPages(props?.items?.length ?? 0, props?.itemsOnPage ?? 50),
            selectedPage: 1
        }
    }
    calcPages = (itemsCount, itemsOnPage) => {
        if (itemsCount === 0) {
            return 0;
        }
        const hasRemainder = (itemsCount <= itemsOnPage) || (itemsCount % itemsOnPage === 0) ? false : true;

        return Math.floor(itemsCount / itemsOnPage) + (hasRemainder ? 1 : 0);
    }
    getItemsForPage = (items) => {
        return items?.slice((this.state.itemsOnPage * (this.state.selectedPage - 1)), (this.state.itemsOnPage * this.state.selectedPage));
    }
    getPagesButtons = () => {
        
        <div></div>
    }
    renderComponent() {
        console.log(this.props?.items?.length, this.props?.itemsOnPage ?? 50, Math.floor(undefined / (this.props?.itemsOnPage ?? 50)), this.state);
        return (
            <div className="itemspaginator-container" style={{ height: this.props?.height }}>
                <div className="itemspaginator-items-container">
                    {this.getItemsForPage(this.props?.items)?.map(el => { return el })}
                    {/* {this.props?.items?.map(el => { return el })} */}
                </div>
                <div className="itemspaginator-paginator">
                    <div className="itemspaginator-paginator-button-last" onClick={() => this.setState({ selectedPage: 1 })}>
                        <img alt="" />
                    </div>
                    <div className="itemspaginator-paginator-button-next"  onClick={() => this.setState({ selectedPage: this.state.selectedPage === 1 ? this.state.selectedPage : this.state.selectedPage - 1 })}>
                        <img alt="" />
                    </div>
                    {/*  */}
                    <div className="itemspaginator-paginator-button-next" style={{ transform: "rotate(180deg)" }} onClick={() => this.setState({ selectedPage: this.state.selectedPage === this.state.pages ? this.state.selectedPage : this.state.selectedPage + 1 })}>
                        <img alt="" />
                    </div>
                    <div className="itemspaginator-paginator-button-last" style={{ transform: "rotate(180deg)" }} onClick={() => this.setState({ selectedPage: this.state.pages })}>
                        <img alt="" />
                    </div>
                </div>
            </div>
        );
    }
}

export default ItemsPaginator;