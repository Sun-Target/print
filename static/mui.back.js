var mui_old_back = mui.back; 
var mui_is_switch = 1;
mui.back = function(){
	var arr = location.href.split('#');
	if(arr[1] == '/home' || arr[1] == '/login'){
		if(mui_is_switch == 1){
			mui.toast("再按一次退出应用");
			mui_is_switch = 2;
			setTimeout(function(){
				mui_is_switch = 1;
			},3000);
		}else{
			plus.runtime.quit();
		}	
	}else{
		mui_old_back();
	}
}
