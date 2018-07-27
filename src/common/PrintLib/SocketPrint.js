String.prototype.len = function()
{
    return this.replace(/[^\x00-\xff]/g, "xx").length;
}
import temp from './PrintTemp'
export default {
	sockets:false,
	connectstatus:false,
	printIns:'',
	socketconnect:function(ip,port)
	{
	  try{
		  	if(plus.os.name=='Android')
		  	{
		  		var res = this.androidconnect(ip,port);
		  		return res;
		  	}

		  	if(plus.os.name == 'iOS')
		  	{

		  	}


	  }catch(e){

	  	mui.toast("连接错误");
	  	return false;
	  }
	},
	print:function(sign,data,mm)
	{
		if(!this.sockets || this.printIn == '')
		{
			// mui.toast("没发现打印机");
			return;
		}
		let datastr = '';

		if(sign=="receipt")
		{
			 datastr = temp.receiptemp(mm,data);

		}
		if(sign=="food")
		{
			datastr = temp.foodtemp(mm,data);
		}

		if(sign == "queuetemp")
		{
			datastr = temp.queuetemp(mm,data);
		}

		if(sign == 'pay_receiptemp')
		{
			datastr = temp.pay_receiptemp(mm,data);
		}

		if(sign == "outtemplate"){
			datastr = temp.outtemplate(mm,data)
		}

		if(sign == "Summary_temp")
		{
			datastr = temp.Summary_temp(mm,data);
		}



		if(datastr == '')
		{
			mui.toast('打印失败');
			return false;
		}

		this.printIns.println(datastr);
//		this.printIns.printIn("\x1D\x56\x42\x00");


		this.sockets.close();


	},
	androidconnect:function(ip,port)
	{
		if(this.sockets)
		{
			if(this.sockets.isConnected() && !this.sockets.isClosed()){

			}else{
			    var res = this.connectsockte(ip,port);
			    return res;
			}

		}else{


			var res = this.connectsockte(ip,port);
			return res;

		}
	},
	connectsockte(ip,port)
	{
		try{
				var Socket = plus.android.importClass("java.net.Socket");
		        var PrintWriter = plus.android.importClass("java.io.PrintWriter");
		        var BufferedWriter = plus.android.importClass("java.io.BufferedWriter");
		        var OutputStreamWriter = plus.android.importClass("java.io.OutputStreamWriter");
		        var BufferedReader = plus.android.importClass("java.io.BufferedReader");
		        var InputStreamReader = plus.android.importClass("java.io.InputStreamReader");
				var SocketAddress = plus.android.importClass("java.net.InetSocketAddress");
		        //测试改良
		        var StrictMode = plus.android.importClass("android.os.StrictMode");
		        var Build = plus.android.importClass("android.os.Build");
		        if (Build.VERSION.SDK_INT > 9) {
		            var policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
		            StrictMode.setThreadPolicy(policy);
		        }


	        	var socket = new Socket();
	        	var socketAddr = new SocketAddress(ip,port);
				socket.connect(socketAddr,2000);
			   	var outputStreamWriter = new OutputStreamWriter(socket.getOutputStream(),'gbk');
		        var bufferWriter = new BufferedWriter(outputStreamWriter);
		        var out = new PrintWriter(bufferWriter, true);

				this.sockets = socket;
				this.printIns = out;



        		mui.toast("连接成功");

        		return true;
	        }catch(e){

	        	mui.toast("连接打印机失败");
	        	return false;
	        }


	},
	socketclose:function()
	{
		this.sockets.close();

	}



}
