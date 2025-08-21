import { Component } from 'react';
import { Link } from 'react-router-dom';
import './menu.css';

// --- Component guide ---
// - constructor: menuItems guide -
// id - only for items with childs.
// to (for parent) - only for items without childs.
// For add new parent (without childs), simply add dictionary like '{ name: "Some Name", icon: "MyIcon", to: "/MyGallery" }' in menuItems Array
// For add new parent (with childs), simply add dictionary like '{ id: "ONLYUniqueId", name: "Some Name", icon: "MyIcon", childs: [{ name: "Child1", to: "/Some1"}, { name: "Child2", to: "/Some2"}] }' in menuItems Array

class Menu extends Component {
	constructor(props) {
		super();
		this.menuItemHeight = 45;
		this.state = {
			shrinked: false,
			isWaiting: false,
			position: 'relative',
			selectedItemId: null,
			menuItems: props?.items ?? []
		}
	}
	shrinkMenu() {
		let itemsCopy = JSON.parse(JSON.stringify(this.state.menuItems));

		itemsCopy.map((item) => {
			item.childShrinked = !this.state.shrinked;
			item.topPos = undefined;
		});

		if (this.state.position === "relative") {
			setTimeout(() => {
				this.setState({
					position: "absolute",
				});
			}, 300);
		} else {
			this.setState({
				position: "relative",
			});
		}

		this.setState({
			shrinked: !this.state.shrinked,
			menuItems: itemsCopy
		});
	}
	hideSub(subId) {
		let itemsCopy = JSON.parse(JSON.stringify(this.state.menuItems));

		itemsCopy.map(item => {
			if (item.id === subId) {
				item.childShrinked = !item.childShrinked;
			}
		});

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
				this.hideSubOnshrinked(event.target, parentId);
			}, 100);
		}
	}
	showSubOnShrinked(target, subId) {
		this.setState({
			isWaiting: true,
			waitId: subId
		});

		setTimeout(() => {
			if (this.state.isWaiting && this.state.waitId === subId) {
				let itemsCopy = JSON.parse(JSON.stringify(this.state.menuItems));
				itemsCopy.map(item => {
					if (item.id === subId) {
						item.isHover = true;
						item.topPos = item?.childShrinked ? target.getBoundingClientRect().top : undefined;
					} else {
						setTimeout(() => {
							item.isHover = false;
							item.topPos = undefined;
						}, 300);
					}
				});

				this.setState({
					menuItems: itemsCopy,
					isWaiting: false
				});
			}
		}, 300);
	}
	hideSubOnshrinked(target, subId) {
		if (subId !== this.state.hoverParentId) {
			let itemsCopy = JSON.parse(JSON.stringify(this.state.menuItems));

			itemsCopy.map(item => {
				if (item.id === subId) {
					item.isHover = false;
				}
			});

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
			this.hideSubOnshrinked(event.target, parentId)
		}, 100);
	}
	setSelectedItem(itemId) {
		this.setState({
			selectedItemId: itemId
		});
	}
	render() {
		return (
			<div id="menu-block" style={{ width: this.state.shrinked ? `45px` : `${this.props.fullWidth}px` }}>
				<Link className="menu-logo-block" to="/">
					<div className="menu-item-icon-block">
						<img alt="" style={{ WebkitMaskImage: `url(${this.props?.iconsPath ?? './src/assets/'}StackLayers.svg)`, maskImage: `url(${this.props?.iconsPath ?? './src/assets/'}StackLayers.svg)` }} />
					</div>
					<div className="menu-item-text menu-logo-text" >
						{this.props?.title}
					</div>
				</Link>
				<div className="menu-items-block">
					{this.state.menuItems.map((parent, parentIdx) => {
						if (!this.props?.currentUserRole || parent.accessRoles.length === 0 || parent.accessRoles.includes(this.props?.currentUserRole)) {
							return (
								<div key={parentIdx}>
									<Link key={parentIdx} className="menu-item" to={parent?.to} title={parent?.name} onClick={() => parent?.id && !this.state.shrinked ? this.hideSub(parent?.id) : this.setSelectedItem(parentIdx)} onMouseEnter={(event) => parent?.id && this.state.shrinked ? this.showSubOnShrinked(event.target, parent?.id) : null} onMouseLeave={(event) => parent?.id && this.state.shrinked ? this.isLeave(event, parent?.id) : null}>
										<div className="menu-item-icon-block">
											<img style={{ WebkitMaskImage: `url(${this.props?.iconsPath ?? './src/assets/'}${parent?.icon}.svg)`, maskImage: `url(${this.props?.iconsPath ?? './src/assets/'}${parent?.icon}.svg)`, backgroundColor: parentIdx === this.state.selectedItemId ? "white" : null }} />
										</div>
										<div className={`menu-item-text${parentIdx == this.state.selectedItemId ? ' menu-item-selected-caption' : ''}`}>
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
														<div className={`menu-item-text${`ch-${childIdx}` == this.state.selectedItemId ? ' menu-item-selected-caption' : ''}`}>
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
						<img alt="" style={{ transition: 'all .3s ease', transform: this.state.shrinked ? 'rotate(0deg)' : 'rotate(-180deg)' }} />
					</div>
					<div className="menu-item-text">
						{this.props?.shrinkCaption ?? 'Shrink'}
					</div>
				</div>
			</div>
		);
	}
}

export default Menu;