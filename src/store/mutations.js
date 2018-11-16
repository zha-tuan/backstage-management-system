let mutations = {
	//一级菜单修改
	showPeoople(state, Data) {
		for(let i = 0; i < state.menuData.length; i++) {
			if(state.menuData[i].id == Data.id) {
				state.menuData[i].content = Data.content
				state.menuData[i].icon = Data.icon
				state.menuData[i].path = Data.path
				state.menuData[i].isShow = Data.isShow
			}
		};
	},
	//二级菜单修改
	ChildrenMenuChange(state, Data) {
		for(let i = 0; i < state.menuData.length; i++) {
			if(state.menuData[i].children) {
				for(let j = 0; j < state.menuData[i].children.length; j++) {
					if(state.menuData[i].children[j].id == Data.id) {
						state.menuData[i].children[j].content = Data.content
						state.menuData[i].children[j].path = Data.path
						state.menuData[i].children[j].isShow = Data.isShow
					}
				}
			}
		}
	}
}
export default mutations