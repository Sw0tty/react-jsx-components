import { Component } from 'react';
import Container from '../lib/src/Container/Container.jsx';
import IconItem from '../lib/src/IconItem/IconItem.jsx';
import './playground.css';


class Playground extends Component {
    render() {
        const requiredIcon = <IconItem iconPath="./icons/CheckCircle" iconColor="#4ce317" shadowColor="#54f71b" addGlow={true} shadowStrong="5px" size="18px" />;
        const optionalIcon = <IconItem iconPath="./icons/CrossCircle" iconColor="#e33a17" shadowColor="#d12d0b" addGlow={true} shadowStrong="5px" size="18px" />;

        return (
            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", rowGap: "40px" }}>
                {this.props?.title ? <h1 className="playground-main-title">{this.props.title}</h1> : null}
                <div style={{ display: "flex", flexDirection: "column", rowGap: "80px" }}>
                    <div style={{ display: "flex" }}>
                        <div style={{ width: "50%" }} className="playground-play-block">
                            <h3 className="playground-play-block-title">Props Interaction</h3>
                            <Container boxStyles={{ margin: "10px", width: "auto", flex: "1 0 0%" }} bodyStyles={{ display: "flex", flexDirection: "column", rowGap: "5px" }}>
                                {this.props?.componentProps}
                            </Container>
                        </div>
                        <div style={{ width: "50%" }} className="playground-play-block">
                            <>
                                <h3 className="playground-play-block-title">Playground</h3>
                                <Container boxStyles={{ margin: "10px", width: "auto", flex: "1 0 0%" }} bodyStyles={{ display: "flex", alignItems: "center", justifyContent: "center", ...this.props?.pComponentStyle }}>
                                    {this.props?.pComponent}
                                </Container>
                            </>
                            {
                                this.props?.returnedData ? 
                                    <>
                                        <h3 className="playground-play-block-title">Returned Data</h3>
                                        <Container boxStyles={{ margin: "10px", width: "auto", flex: "1 0 0%" }}>
                                            {this.props.returnedData}
                                        </Container>
                                    </>
                                : null
                            }
                        </div>
                    </div>
                    {
                        this.props?.example ?
                            <div>
                                <h3 className="playground-play-block-title">Example In The Code</h3>
                                <Container boxStyles={{ margin: "10px", padding: "15px", width: "auto" }}>
                                    <div style={{ fontFamily: "monospace" }}>{this.props.example}</div>
                                </Container>
                            </div>
                        : null
                    }
                    {
                        this.props?.componentDocumentation ?
                            <div>
                                <h3 className="playground-play-block-title">Props Documentation</h3>
                                <Container boxStyles={{ margin: "10px", padding: "15px", width: "auto" }}>
                                    <table id="playground-docprops">
                                        <tbody>
                                            <tr>
                                                <td>
                                                    Name
                                                </td>
                                                <td>
                                                    Required
                                                </td>
                                                <td>
                                                    DataType
                                                </td>
                                                <td>
                                                    Description
                                                </td>
                                            </tr>
                                            {this.props?.componentDocumentation?.map((propData, idx) => {
                                                return (
                                                    <tr key={idx}>
                                                        <td>{propData.name}</td>
                                                        <td>{propData.required ? requiredIcon : optionalIcon}</td>
                                                        <td>{propData.dataType}</td>
                                                        <td>{propData.description}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </Container>
                            </div>
                        : null
                    }
                    
                </div>
            </div>
        );
    }
}

export default Playground;