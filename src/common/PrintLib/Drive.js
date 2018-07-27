import Bluetooth from '../Bluetooth/Search'
import SocketConnect from '../SocketConnect/Connect'
import Websql from '../../config/websql'
export default { 
	DrivePrint:function(){
		
		this.receipt_queue = [];
		this.drive_connect = null;

		var self = this;
		// 打印的方法 将打印模板传入进来即可,如果传打印的数据则第二个参数要设置为false
		// 调用方法-》 this.$store.state.DriveObject.print_receipt(r,false);
		this.print_receipt = function(receipt,is_template){
			if(!self.drive_connect){
				self.connect_drive();
				// if(self.drive_connect != 'notdrive'){
				// 	setTimeout(function(){
				// 		self.print_receipt(receipt);
				// 	},5000);
				// }
				return;
			}
			if(receipt){
				self.receipt_queue.push(receipt);
			}
			var that = this;
			function print_job(){
				if(self.receipt_queue.length > 0){
					var r = self.receipt_queue.shift();
					if(!is_template){
						r = self.get_template(r);
					}
					self.drive_connect.print(r);
					setTimeout(function(){
						print_job();
					},2000);
				}
			}
			print_job();
		}

		this.get_template = function(data){
			var template = '';
			return template;
		}

		this.connect_drive = function(){
			// TODO 查询数据库判断当前开启的是什么类型的打印机 然后连接之，如果无法连接则将变量变为notdrive
			// 在设置的页面要再调用一下这个方法，将变量改变 不能再保持notdrive状态 否则全局将会出错
			var where = "where active = 1 AND drive_type = 'print'";
			Websql.get("print",where,'*',function(r){
	      		if(r.rows.length == 0){
	      			mui.toast('没有设置打印机');
	      			return;
	      		}
	      		mui.plusReady(function(){
	      			if(!self.drive_connect){
						if(r.rows.item(0).type == 'network'){
							self.drive_connect = new SocketConnect.ScoketConnect(r.rows.item(0).ip,r.rows.item(0).port);
						}else if(r.rows.item(0).type == 'blue'){
							self.drive_connect = new Bluetooth.BluePrinter(r.rows.item(0).mac_address);
						}
					}
					if(!self.drive_connect.connectstatus){
						self.drive_connect = false;
						mui.toast('无法连接至打印机，请重新设置！');
					}
	      		});
	    	});
		}
	},
	components:{
		Bluetooth,
		SocketConnect,
		Websql
	}
	
}
