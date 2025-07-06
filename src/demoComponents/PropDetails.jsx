import { Component } from 'react';
import './propdetails.css';


class PropDetails extends Component {
    render() {
        return (
            
            <div className="propdetails-container">
                <div className="propdetails-propname">
                    <div className="propdetails-title">{this.props.propName}</div>
                </div>
                <div className="propdetails-params-container">
                    {this.props.propParams.map((param, idx) => {
                        return (
                            <div key={idx}>
                                <div className="propdetails-keyname">{param.keyName}</div>
                                <div className="propdetails-description">{param.description}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default PropDetails;