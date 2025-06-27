import { Component } from "react";


class BaseMethods extends Component {
    setData = (data, params) => {
        this.setState({
            [params.propName]: data
        }); 
    }
}

export default BaseMethods;