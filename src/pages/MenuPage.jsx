import BaseMethods from "../demoComponents/BaseMethods.jsx";
import TextBox from "../lib/src/TextBox/TextBox.jsx";
import Playground from "../demoComponents/Playground.jsx";
import ColorPicker from "../lib/src/ColorPicker/ColorPicker.jsx";
import Menu from "../lib/src/Menu/Menu.jsx";


class MenuPage extends BaseMethods {
    constructor() {
        super();
        this.state = {
            title: "Demo menu",
            fullWidth: 250,
            shrinkedWidth: 45,
            mainColor: '#5f89dd',
            secondColor: '#6dceee',
            hoverColor: '#bff1fd',
            titleColor: '#ffd894',
            logo: 'BaseComponent',
            items: [{ name: "Demo page", short: true }, { name: "Security", short: true }, { id: "aboutBlock", name: "About", childs: [{ name: "Contacts" }, { name: "Vacancies" }, { name: "Company" }] }, { name: "Blog", path: "./icons/", icon: "Menu"}]
        }
    }
    render() {
        return(<Playground title="Menu"
                pComponent={
                    <div style={{background: "#e2e2e2", width: "400px", height: "300px", overflow: "hidden", borderRadius: "8px", border: "1px solid #acacac" }}>
                        <Menu title={this.state.title} shrinked logo={this.state.logo} iconsPath="./icons/" fullWidth={this.state.fullWidth} shrinkedWidth={this.state.shrinkedWidth} mainColor={this.state.mainColor} secondColor={this.state.secondColor} hoverColor={this.state.hoverColor} titleColor={this.state.titleColor} items={this.state.items} />
                    </div>
                }
                componentProps={<>
                    <TextBox caption="Title :" value={this.state.title} width={200} maxLength={200} onReturnData={{ func: this.setData, params: { propName: "title" } }} />
                    <TextBox caption="Full  width :" inputType="number" required value={this.state.fullWidth} width={200} maxLength={200} onReturnData={{ func: this.setData, params: { propName: "fullWidth" } }} />
                    <TextBox caption="Shrinked width :" inputType="number" required value={this.state.shrinkedWidth} width={200} maxLength={200} onReturnData={{ func: this.setData, params: { propName: "shrinkedWidth" } }} />
                    <ColorPicker caption="Main color :" value={this.state.mainColor} onReturnData={{ func: this.setData, params: { propName: "mainColor" } }} />
                    <ColorPicker caption="Second color :" value={this.state.secondColor} onReturnData={{ func: this.setData, params: { propName: "secondColor" } }} />
                    <ColorPicker caption="Hover color :" value={this.state.hoverColor} onReturnData={{ func: this.setData, params: { propName: "hoverColor" } }} />
                    <ColorPicker caption="Title color :" value={this.state.titleColor} onReturnData={{ func: this.setData, params: { propName: "titleColor" } }} />
                </>}
                componentDocumentation={[
                    {name: "title", required: false, dataType: "string", description: "Menu title."},
                    {name: "shrinked", required: false, dataType: "boolean", description: "Sets shrinked state on render."},
                    {name: "fullWidth", required: true, dataType: "number", description: "Sets full width on page."},
                    {name: "shrinkedWidth", required: true, dataType: "number", description: "Sets minimum width on page."},
                    {name: "mainColor", required: false, dataType: "string", description: "Sets menu background."},
                    {name: "secondColor", required: false, dataType: "string", description: "Sets text and icons color of items."},
                    {name: "hoverColor", required: false, dataType: "string", description: "Sets color on hover items."},
                    {name: "titleColor", required: false, dataType: "string", description: "Sets color of title."},
                    {name: "iconsPath", required: false, dataType: "string", description: "Sets path for storage of icons."},
                    {name: "shrinkCaption", required: false, dataType: "string", description: "Sets alt caption of shrink button. Default is 'Shrink'."},
                    {name: "shrinkIconPath", required: false, dataType: "string", description: "Sets path to alt icon of shrink button."},
                    {name: "items", required: false, dataType: "ArrayOfObjects", description: ""}
                ]}
                example={`<Menu title="${this.state.title}" shrinked iconsPath="./icons/" logo="${this.state.logo}" fullWidth={${this.state.fullWidth}} shrinkedWidth={${this.state.shrinkedWidth}} mainColor="${this.state.mainColor}" secondColor="${this.state.secondColor}" hoverColor="${this.state.hoverColor}" titleColor="${this.state.titleColor}" items={[${this.state.items.map(el => { return `{ ${Object.keys(el).map(key => { return `${key}: ${typeof(el[key]) === "boolean" ? el[key] : `"${el[key]}"`}` }).join(', ')} }` }).join(',')}]} />`}
        />);
    }
}

export default MenuPage;