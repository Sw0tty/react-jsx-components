import { StrictMode, Component } from 'react';
import AppRoutes from './AppRoutes.jsx';
import Menu from './lib/src/Menu/Menu.jsx';
import { ROOT_PATH } from './AppConts.js';


class App extends Component {
	render() {
		return (
			<>
				<Menu shrinkedWidth={45} fullWidth={250} title="React Comps" currentUserRole={null} iconsPath="./icons/" items={
					[
						{
							id: undefined, name: "BaseComponent", icon: "BaseComponent", to: ROOT_PATH + "/BaseComponent"
						},
						{
							id: "sub1", name: "Buttons", icon: "ButtonClick", to: undefined, childs: [
								{ name: "CustomButton", to: `${ROOT_PATH}/CustomButton` },
								{ name: "ToolButton", accessRoles: [], to: `${ROOT_PATH}/ToolButton` }
							]
						},
						{
							id: undefined, name: "TextBox", icon: "Textbox", to: ROOT_PATH + "/TextBox"
						},
						{
							id: undefined, name: "CheckBox", icon: "CheckCircle", to: ROOT_PATH + "/CheckBox"
						},
						{
							id: undefined, name: "ColorPicker", icon: "Eyedropper", to: ROOT_PATH + "/ColorPicker"
						},
						{
							id: undefined, name: "ComboBox", icon: "ComboBox", to: ROOT_PATH + "/ComboBox"
						},
						{
							id: undefined, name: "Container", icon: "Container", to: ROOT_PATH + "/Container"
						},
						{
							id: undefined, name: "IconItem", icon: "IconItem", to: ROOT_PATH + "/IconItem"
						},
						{
							id: undefined, name: "Loading", icon: "Loading", to: ROOT_PATH + "/Loading"
						},
						{
							id: undefined, name: "Tip", icon: "Tip", to: ROOT_PATH + "/Tip"
						},
						{
							id: undefined, name: "TextArea", icon: "Textarea", to: ROOT_PATH + "/TextArea"
						},
						{
							id: undefined, name: "Splitter", icon: "Splitter", to: ROOT_PATH + "/Splitter"
						},
            			{
							id: undefined, name: "Switcher", icon: "Switcher", to: ROOT_PATH + "/Switcher"
						},
            			{
							id: undefined, name: "ContentHider", icon: "ContentHider", to: ROOT_PATH + "/ContentHider"
						},
						{
							id: undefined, name: "ContextMenu", icon: "ContextMenu", to: ROOT_PATH + "/ContextMenu"
						},
						{
							id: undefined, name: "Gallery", icon: "Gallery", to: ROOT_PATH + "/Gallery"
						},
						{
							id: undefined, name: "DataGrid", icon: "Table", to: ROOT_PATH + "/DataGrid"
						},
						{
							id: undefined, name: "StepsList", icon: "StepsList", to: ROOT_PATH + "/StepsList"
						},
						{
							id: undefined, name: "MultiSelect", icon: "MultiSelect", to: ROOT_PATH + "/MultiSelect"
						},
						{
							id: undefined, name: "ItemSelector", icon: "ItemSelector", to: ROOT_PATH + "/ItemSelector"
						},
						{
							id: undefined, name: "ProgressBar", icon: "Progress", to: ROOT_PATH + "/ProgressBar"
						},
						{
							id: "sub2", name: "Modals", icon: "Modals", to: undefined, childs: [
								{ name: "InfoModal", to: `${ROOT_PATH}/InfoModal` },
								{ name: "ErrorModal", accessRoles: [], to: `${ROOT_PATH}/ErrorModal` }
							]
						},
					]
				} />
				<div id="body-block">
					<div id="body-block-content">
							<StrictMode>
								<AppRoutes />
							</StrictMode>
						</div>
						<div id="body-block-footer">
							<div className="footer-info">
								<div>Version: 1.0.0</div>
								<div>Copyright © Sw0tty, 2025</div>
							</div>
						</div>
				</div>
			</>
		);
	}
}

export default App;
