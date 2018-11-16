class Cookie {
	//cookie  设置
	setCookie(cname, cvalue, exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + "; " + expires;
	}
	//cookie  获取
	getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i].trim();
			if(c.indexOf(name) == 0) return c.substring(name.length, c.length);
		}
		return "";
	}
	//cookie  检测
	checkCookie() {
		var UserName = this.getCookie("UserName");
		var UserPassword = this.getCookie("UserPassword");
		if (UserName && UserPassword && UserName != undefined && UserName != '' && UserPassword != undefined && UserPassword != '') {
			return true
		} else {
			return false
		}
	}
	//cookie  清除
	clearCookie(cname) {
		this.setCookie(cname, "", -1);
	}
}
export default new Cookie()