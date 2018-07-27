var mui_old_back = mui.back; 
var mui_is_switch = 1;
mui.back = function(){
	var arr = location.href.split('#');
	if(arr[1] == '/home'){
		if(mui_is_switch == 1){
			mui.toast("再按一次退出应用");
			mui_is_switch = 2;
		}else{
			plus.runtime.quit();
		}	
	}else{
		mui_old_back();
	}
}
