export default {

	ScoketConnect:function(ip,port){
		try{
		 	if (plus.os.name == "Android") {
		        var Socket = plus.android.importClass("java.net.Socket");
		        var PrintWriter = plus.android.importClass("java.io.PrintWriter");
		        var BufferedWriter = plus.android.importClass("java.io.BufferedWriter");
		        var OutputStreamWriter = plus.android.importClass("java.io.OutputStreamWriter");
		        var BufferedReader = plus.android.importClass("java.io.BufferedReader");
		        var InputStreamReader = plus.android.importClass("java.io.InputStreamReader");


		        var StrictMode = plus.android.importClass("android.os.StrictMode");
		        var Build = plus.android.importClass("android.os.Build");
		        if (Build.VERSION.SDK_INT > 9) {
		            var policy = new StrictMode.ThreadPolicy.Builder().permitAll().build();
		            StrictMode.setThreadPolicy(policy);
		        }

		        // var socket = new Socket("39.106.149.165", 80);
		        try{
		        	var socket = new Socket(ip, port);
			        var outputStreamWriter = new OutputStreamWriter(socket.getOutputStream());
			        var bufferWriter = new BufferedWriter(outputStreamWriter);
			        var out = new PrintWriter(bufferWriter, true);
			      
			        var inputStreamReader = new InputStreamReader(socket.getInputStream());
			        var br = new BufferedReader(inputStreamReader);
			        
			        this.connectstatus = true;
		        }
		        catch(e){
		        	// mui.toast('socket连接失败');
		        	this.connectstatus = false;
		        }
		        var self = this;
		        this.print = function(msg){
		        	try{
			        	var status = out.println(msg);
			        	console.log(status);
		        	}
		        	catch(e){
		        		console.log('服务器断开');
		        		this.connectstatus = false;
		        	}
		        }
		        // 该方法暂时无法实现
		        this.read = function(callback){

		   //      	var worker = new Worker('./read.js');
		   //      	worker.postMessage({name: br});
		   //      	worker.onmessage = function(even){
		   //      		var msg = even.data;
		   //      		callback(msg);
		   //      		worker.terminate();
		   //      	};
		   //      	worker.onerror = function(e){
					//     //打印出错消息
					//     console.log('打印出错消息');
					//     console.log(e);
					//     //中断与子线程的联系
					//     worker.terminate();
					// }
		        	//while(true)
			        
		            // if(msg != null)
		            // {
		                // return msg;
		            // }
			            //msg = br.readLine();      
			        
		        }
		    }
	    }catch(e){
        	// mui.toast('socket连接失败');
        	this.connectstatus = false;
        }
	}
	
}
