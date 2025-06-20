import { StrictMode, useState, Component } from 'react';
import AppRoutes from './AppRoutes.jsx';
import Menu from './lib/src/Menu/Menu.jsx';


const rootSite = '/react-jsx-components';

class App extends Component {
	render() {
		return (
			<>
				<Menu shrinkedWidth={45} fullWidth={250} title="React Comps" currentUserRole={null} items={
					[
						{
							id: "sub1", name: "Buttons", icon: "", to: undefined, childs: [
								{ name: "CustomButton", to: `${rootSite}/CustomButton` },
								{ name: "ToolButton", accessRoles: [], to: `${rootSite}/ToolButton` }
							]
						},
						{
							id: undefined, name: "InputText", icon: "Information", to: `${rootSite}/InputText`
						},
						{
							id: undefined, name: "CheckBox", icon: "", to: "/"
						},
						{
							id: undefined, name: "ColorPicker", icon: "", to: "/"
						},
						{
							id: undefined, name: "ComboBox", icon: "", to: "/"
						},
						{
							id: undefined, name: "Container", icon: "", to: "/"
						},
						{
							id: undefined, name: "IconItem", icon: "", to: "/IconItem"
						},
						{
							id: undefined, name: "Loading", icon: "", to: "/Loading"
						},
						{
							id: undefined, name: "Tip", icon: "Tip", to: `${rootSite}/Tip`
						},
						{
							id: undefined, name: "TextArea", icon: "", to: "/TextArea"
						},
						{
							id: undefined, name: "Splitter", icon: "", to: "/Splitter"
						}
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
							<div>Copyright © Sw0tty, 2024-2025</div>
						</div>
					</div>
				</div>
			</>
		);
	}
}

export default App;
