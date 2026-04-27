import BaseComponent from '../BaseComponent/BaseComponent.jsx';
import { Link } from 'react-router-dom';
import './menu.css';

// --- Component guide ---
// - constructor: menuItems guide -
// id - only for items with childs.
// to (for parent) - only for items without childs.
// For add new parent (without childs), simply add dictionary like '{ name: "Some Name", icon: "MyIcon", to: "/MyGallery" }' in menuItems Array
// For add new parent (with childs), simply add dictionary like '{ id: "ONLYUniqueId", name: "Some Name", icon: "MyIcon", childs: [{ name: "Child1", to: "/Some1"}, { name: "Child2", to: "/Some2"}] }' in menuItems Array

class Menu extends BaseComponent {
	constructor(props) {
		super();
		this._propsRules = [
			{ name: 'fullWidth', type: 'number', minimum: 45, required: true },
			{ name: 'shrinkedWidth', type: 'number', minimum: 45, required: true },
			{ name: 'title', type: 'string' },
			{ name: 'logo', type: 'string' },
			{ name: 'shrinkCaption', type: 'string' },
			{ name: 'iconsPath', type: 'string' },
			{ name: 'shrinkIconPath', type: 'string' },
			{ name: 'items', type: 'ArrayOfObjects' },
			{ name: 'shrinked', type: 'boolean' },
			// { name: 'pageAlignment', type: 'string', constStrings: ['left', 'right'] },
			{ name: 'mainColor', type: 'string' },
			{ name: 'secondColor', type: 'string' },
			{ name: 'hoverColor', type: 'string' },
			{ name: 'titleColor', type: 'string' }
        ];
		this.baseMainColor = "#B12C28";
		this.baseSecondColor = "#F5A8A5";
		this.baseHoverColor = "#ffffff";
		this.baseTitleColor = "#ffffff";
		this.menuItemHeight = 45;
		this.state = {
			shrinked: props?.shrinked ?? false,
			pageAlignment: props?.pageAlignment ?? 'left',
			isWaiting: false,
			position: props?.shrinked ? 'absolute' : 'relative',
			childsDisplay: props?.shrinked ? 'flex' : 'block',
			selectedItemId: null,
			menuItems: props?.items ?? []
		}
	}
	shrinkMenu() {
		let itemsCopy = JSON.parse(JSON.stringify(this.state.menuItems));

		for (let item of itemsCopy) {
			item.childShrinked = !this.state.shrinked;
			//item.topPos = undefined;
		}

		if (this.state.position === "relative") {
			setTimeout(() => {
				this.setState({
					position: "absolute",
					childsDisplay: "flex"
				});
			}, 300);
		} else {
			this.setState({
				position: "relative",
				childsDisplay: "block"
			});
		}

		this.setState({
			shrinked: !this.state.shrinked,
			menuItems: itemsCopy
		});
	}
	hideSub(subId) {
		let itemsCopy = JSON.parse(JSON.stringify(this.state.menuItems));

		for (let item of itemsCopy) {
			if (item.id === subId) {
				item.childShrinked = !item.childShrinked;
			}
		}

		this.setState({
			menuItems: itemsCopy
		});
	}
	isLeave(event, parentId) {
		if (this.state.isWaiting) {
			this.setState({
				waitId: parentId,
				isWaiting: false
			});
		} else {
			setTimeout(() => {
				this.hideSubOnShrink(event.target, parentId);
			}, 100);
		}
	}
	showSubOnShrink(target, subId) {
		this.setState({
			isWaiting: true,
			waitId: subId
		});

		setTimeout(() => {
			if (this.state.isWaiting && this.state.waitId === subId) {
				let itemsCopy = JSON.parse(JSON.stringify(this.state.menuItems));
				
				for (let item of itemsCopy) {
					if (item.id === subId) {
						item.isHover = true;
						//item.topPos = item?.childShrinked ? target.getBoundingClientRect().top : undefined;
					} else {
						setTimeout(() => {
							item.isHover = false;
							//item.topPos = undefined;
						}, 300);
					}
				}

				this.setState({
					menuItems: itemsCopy,
					isWaiting: false
				});
			}
		}, 300);
	}
	hideSubOnShrink(target, subId) {
		if (subId !== this.state.hoverParentId) {
			let itemsCopy = JSON.parse(JSON.stringify(this.state.menuItems));

			for (let item of itemsCopy) {
				if (item.id === subId) {
					item.isHover = false;
				}
			}

			this.setState({
				menuItems: itemsCopy
			});
		}
	}
	clearHoverId(event, parentId) {
		this.setState({
			hoverParentId: undefined
		});
		setTimeout(() => {
			this.hideSubOnShrink(event.target, parentId)
		}, 100);
	}
	setSelectedItem(itemId) {
		this.setState({
			selectedItemId: itemId
		});
	}
	renderComponent() {
		const CSSVariables = {
			'--JSXRC-menu-main-color': this.props?.mainColor ?? this.baseMainColor,
			'--JSXRC-menu-second-color': this.props?.secondColor ?? this.baseSecondColor,
			'--JSXRC-menu-hover-color': this.props?.hoverColor ?? this.baseHoverColor,
			'--JSXRC-menu-title-color': this.props?.titleColor ?? this.baseTitleColor,
			width: this.state.shrinked ? `${this.props.shrinkedWidth}px` : `${this.props.fullWidth}px`
		};
		return (
			<div className="menu-component" style={CSSVariables}>
				<Link className="menu-logo-block" to="/">
					<div className="menu-item-icon-block">
						<img alt="" style={{ WebkitMaskImage: `url(${this.props?.iconsPath ?? './src/assets/'}${this.props?.logo}.svg)`, maskImage: `url(${this.props?.iconsPath ?? './src/assets/'}${this.props?.logo}.svg)` }} />
					</div>
					<div className="menu-item-text menu-logo-text" >
						{this.props?.title}
					</div>
				</Link>
				<div className="menu-items-block">
					{this.state.menuItems.map((parent, parentIdx) => {
						if (!this.props?.currentUserRole || parent.accessRoles.length === 0 || parent.accessRoles.includes(this.props?.currentUserRole)) {
							return (
								<div style={( parent?.id && parent?.childs ? {display: this.state.childsDisplay } : null)} key={parentIdx}>
									<Link key={parentIdx} className="menu-item" to={parent?.to} title={parent?.name} onClick={() => parent?.id && !this.state.shrinked ? this.hideSub(parent?.id) : this.setSelectedItem(parentIdx)} onMouseEnter={(event) => parent?.id && this.state.shrinked ? this.showSubOnShrink(event.target, parent?.id) : null} onMouseLeave={(event) => parent?.id && this.state.shrinked ? this.isLeave(event, parent?.id) : null}>
										<div className="menu-item-icon-block">
											{ parent?.short ?
												<span className={`${parentIdx === this.state.selectedItemId ? "menu-item-selected-caption" : ''}`}>{parent?.name?.[0]}</span>
											:
												<img alt="" className={`${parentIdx === this.state.selectedItemId ? "menu-item-selected" : ''}`} style={{ WebkitMaskImage: `url(${this.props?.iconsPath ?? './src/assets/'}${parent?.icon}.svg)`, maskImage: `url(${this.props?.iconsPath ?? './src/assets/'}${parent?.icon}.svg)`, backgroundColor: parentIdx === this.state.selectedItemId ? "var(--JSXRC-menu-hover-color)" : null }} />
											}	
										</div>
										<div className={`menu-item-text${parentIdx === this.state.selectedItemId ? ' menu-item-selected-caption' : ''}`}>
											{parent?.name}
										</div>
									</Link>
									{parent?.id && parent?.childs ?
										<div className="menu-sub-items-container" onMouseEnter={() => parent?.id && this.state.shrinked ? this.setState({ hoverParentId: parent?.id }) : null} onMouseLeave={(event) => parent?.id && this.state.shrinked ? this.clearHoverId(event, parent?.id) : null} style={{ position: this.state?.position, left: this.state?.position === "absolute" ? '45px' : null, top: parent?.topPos, height: !this.state.shrinked ? (parent?.childShrinked ? '0px' : `${(this.props?.currentUserRole ? parent?.childs?.filter(el => el.accessRoles.length === 0 || el.accessRoles.includes(this.props?.currentUserRole)) : parent?.childs)?.length * this.menuItemHeight}px`) : (parent?.isHover ? `${(this.props?.currentUserRole ? parent?.childs?.filter(el => el.accessRoles.length === 0 || el.accessRoles.includes(this.props?.currentUserRole)) : parent?.childs)?.length * this.menuItemHeight}px` : '0px') }}>
											{(this.props?.currentUserRole ? parent?.childs?.filter(el => el.accessRoles.length === 0 || el.accessRoles.includes(this.props?.currentUserRole)) : parent?.childs)?.map((child, childIdx) => {
												return (
													<Link key={`ch-${childIdx}`} className="menu-item" title={child?.name} to={child?.to} onClick={() => this.setSelectedItem(`ch-${childIdx}`)}>
														<div className="menu-item-icon-block-daughter">
															<img alt="" />
														</div>
														<div className={`menu-item-text${`ch-${childIdx}` === this.state.selectedItemId ? ' menu-item-selected-caption' : ''}`}>
															{child?.name}
														</div>
													</Link>
												)
											})}
										</div>
										: null}
								</div>
							)
						}
					})}
				</div>
				<div className="menu-shrink-button" onClick={() => this.shrinkMenu()}>
					<div className="menu-item-icon-block">
						<img alt="" style={{ WebkitMaskImage: this.props?.shrinkIconPath ? `url(${this.props.shrinkIconPath}.svg)` : "", maskImage: this.props?.shrinkIconPath ? `url(${this.props.shrinkIconPath}.svg)` : "", transform: this.state.shrinked ? 'rotate(0deg)' : 'rotate(-180deg)' }} />
					</div>
					<div className="menu-item-text">
						{this.props?.shrinkCaption ?? "Shrink"}
					</div>
				</div>
			</div>
		);
	}
}

export default Menu;