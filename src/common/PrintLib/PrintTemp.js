String.prototype.len = function()             
{   
    return this.replace(/[^\x00-\xff]/g, "xx").length;   
}  
export default { 
	//小票模板
	receiptemp:function(mm,data)
	{

			var all_spacing = 0;
			if(mm == 80){
				all_spacing = 48;
			}else{
				all_spacing = 32;
			}
		
			var ptext = '';
			var str = '';
			// 设置头部信息
			if(typeof data.source != 'undefined'){
				var temp = parseInt((all_spacing - data.shopname.len()) / 2);
				for(var i = 0;i < temp;i++) ptext += ' ';
				ptext += data.source == 'client' ? '扫码点餐客单' : '预点餐客单';
				for(var i = 0;i < temp;i++) ptext += ' ';
				ptext+="\n";
				
			}
			
			
			if(typeof data.shopname != 'undefined'){
				var temp = parseInt((all_spacing - data.shopname.len()) / 2);
				
				for(var i = 0;i < temp;i++) ptext += ' ';
				
				ptext += data.shopname;
				for(var i = 0;i < temp;i++) ptext += ' ';
				ptext += "\n";
			}
			
			if(mm == 80)
			{
				ptext += "------------------------------------------------\n";
			}else{
				ptext += "--------------------------------\n";
			}
			
			
			
			
			if(data.source == "client")
			{
				if(typeof data.table != 'undefined')
				{
					ptext += "桌台:" + data.table + "\r\n";
				}
				
				if(typeof data.customer_count != 'undefined')
				{
					ptext += "就餐人数:" + data.customer_count + "\r\n";
				}
			
				if(typeof data.note != 'undefined')
				{	
					ptext += "备注:" + data.note + "\r\n";
				}
				
			}else{
				
				if(typeof data.brand != 'undefined')
				{
					ptext += "牌号:" + data.brand + "\r\n";
				}
				
				if(typeof data.ordertype != 'undefined')
				{
					ptext += "类型:" + data.ordertype + "\r\n";
				}
				
				if(typeof data.mealtime != 'undefined')
				{	
					ptext += "就餐时间:" + data.mealtime + "\r\n";
				}
				
				if(typeof data.note != 'undefined'){
					ptext += "备注:" + data.note + "\r\n";
				}
			}
			
			if(mm == 80)
			{
				ptext += "------------------------------------------------\r\n";
			}else{
				ptext += "--------------------------------\r\n";
			}
			
			
			if(typeof data.dish == 'undefined') return false;
		
			// 分打印纸尺寸
			if(mm == 80){
				var dish_name_spacing = 38;
				var dish_price_spacing = 8;
				var dish_num_spacing = 18;
				var totalprice_spacing = 18;
				var paidin_spacing = 34;
				var separator = "------------------------------------------------\r\n";
				ptext += "菜品                                数量   价格\n";
				ptext += separator;
				
			}else if(mm == 58){
				var dish_name_spacing = 22;
				var dish_price_spacing = 8;
				var dish_num_spacing = 11;
				var totalprice_spacing = 11;
				var paidin_spacing = 18;
				var separator = "--------------------------------\r\n";
//				ptext += separator;
				ptext += "菜品                 数量   价格\n";
				ptext += separator;
			
			}
			
			// 菜品总数量
			var totalnum = 0;
			var totalprice = 0;
			// 添加菜品信息
			for(var k in data.dish){
				var l = data.dish[k];
				var text = '';
				var price = l.price.toFixed(2) + '';
				var num = l.num + '';
				var alltotal = l.total.toFixed(2) + '';
				text += l.name;
				for(var i = 0;i < dish_name_spacing - l.name.len();i++) text += ' ';
				text += l.qty;
				for(var i = 0;i < dish_price_spacing - price.len();i++) text += ' ';
				var numprice = (l.price*l.qty).toFixed(2);
				text += numprice
//				for(var i = 0;i < dish_num_spacing - num.len() - alltotal.len();i++) text += ' ';
//				text += alltotal;
				totalnum += l.num;
				totalprice += l.price*l.qty;
				ptext += text + "\r\n";
				if(typeof l.Ingredient != 'undefined')
				{
					
					ptext += "("+l.Ingredient+")"+"\r\n";
					
				}
			}
			
			if(mm == 80)
			{
				ptext += "------------------------------------------------\r\n";
			}else{
				ptext += "--------------------------------\r\n";
			}
			
			// 添加合计
			totalnum = totalnum + '';
			totalprice = totalprice.toFixed(2) + '';
			if(mm == 80){
				var he = '合计:                           ' ;
			}else if(mm == 58){
				var he = '合计:                    ';
			}
			var h_ban = '';
			for(var i = 0;i < totalprice_spacing - totalprice.len() - totalnum.len();i++) h_ban += ' ';
			he += h_ban;
			he += totalprice;
			ptext += he + "\r\n";
			ptext += separator;
			
			if(typeof data.account != 'undefined')
			{
				ptext += "服务员:" + data.account + "\r\n";
			}

			
			if(data.source == 'client'){
				if(typeof data.ordersn != 'undefined')
				{
					
					ptext += "订单号:" + data.ordersn + "\r\n";
				}
			}else{

					var time = this.getNowFormatDate();
					ptext += "打印时间:" + time + "\r\n";
					
			}
		
			
			if(typeof data.writer != 'undefined')
			{	
				ptext += "下单人:" + data.writer + "\r\n";
			}
			
			if(typeof data.write_time != 'undefined'){
				ptext += "下单时间:" + data.write_time + "\r\n";
			}
				ptext +="\r\n";
				ptext +="\r\n";
				
			if(typeof data.bottom != 'undefined'){
				var temp = parseInt((all_spacing - data.bottom.len()) / 2);
				for(var i = 0;i < temp;i++) ptext += ' ';
				ptext += data.bottom;
				for(var i = 0;i < temp;i++) ptext += ' ';
				ptext += "\r\n";
			}
			

	        ptext +="\x1D\x56\x42\x00";//切纸命令
		

			return ptext;
		
	
   },
   //排队模板
	queuetemp:function(mm,data)
	{
		var all_spacing = 0;
	    if(mm == 80){
	        all_spacing = 100;
	        var separator = "------------------------------------------------\n";
	    }else{
	        all_spacing = 32;
	         var separator = "--------------------------------\n";
	    }


	    var ptext = '';
	    	ptext += separator;
	    if(typeof data.shopname != 'undefined')
	    {
				var temp = parseInt((all_spacing - data.shopname.len()) / 2);
				for(var i = 0;i < temp;i++) ptext += ' ';
				ptext += data.shopname;
				for(var i = 0;i < temp;i++) ptext += ' ';
				ptext+="\n";
				ptext+="\n";
				
	    }
	    
	    if(typeof data.table != 'undefined')
	    {
	    		
				var temp = parseInt((all_spacing - data.table.len()) / 2);
				for(var i = 0;i < temp;i++) ptext += ' ';
				ptext += data.table;
				for(var i = 0;i < temp;i++) ptext += ' ';
				ptext+="\n";
				ptext+="\n";
				
	    }
	    
	    
	     if(typeof data.describe != 'undefined')
	    {
	    		
				var temp = parseInt((all_spacing - data.describe.len()) / 2);
				for(var i = 0;i < temp;i++) ptext += ' ';
				ptext += data.describe;
				for(var i = 0;i < temp;i++) ptext += ' ';
				ptext+="\n";
				ptext+="\n";
				
	    }
	    
	    
	    if(typeof data.take_time != 'undefined')
	    {
	    		var timestr = data.take_time + "领取"
				var temp = parseInt((all_spacing - timestr.len()) / 2);
				for(var i = 0;i < temp;i++) ptext += ' ';
				ptext += timestr;
				for(var i = 0;i < temp;i++) ptext += ' ';
				ptext+="\n";
				ptext+="\n";
				
	    }
	    ptext+=separator;
	    
	    ptext +="\x1D\x56\x42\x00";
	    return ptext;
	},
	//制作单
	foodtemp:function(mm,data)
	{
		var all_spacing = 0;
        if(data.mm == 80){
            all_spacing = 100;
        }else{
            all_spacing = 32;
        }

        var ptext = '';
        
        // 设置头部信息
      	var title = "制作单"	;
      	     	
        var temp = parseInt((all_spacing - title.len()) / 2);
        for(var i = 0;i < temp;i++) ptext += ' ';
        ptext += title;
        for(var i = 0;i < temp;i++) ptext += ' ';
        ptext += "\n";
        
        ptext += "\n";
        if(data.source == "client")
		{
			if(typeof data.table != 'undefined')
			{
				ptext += "桌号:" + data.table + "\r\n";
			}
			
			if(typeof data.customer_count != 'undefined')
			{
				ptext += "人数:" + data.customer_count + "\r\n";
			}
			
			if(typeof data.note != 'undefined')
			{	
				ptext += "整单备注:" + data.note + "\r\n";
			}
			
		}else{
			
			if(typeof data.brand != 'undefined')
			{
				ptext += "牌号:" + data.brand + "\r\n";
			}
			
			if(typeof data.mealtime != 'undefined')
			{
				ptext += "就餐时间:" + data.mealtime + "\r\n";
			}
			
			if(typeof data.note != 'undefined'){
				ptext += "整单备注:" + data.note + "\r\n";
			}
		}
        
        
        if(typeof data.dish == 'undefined') return false;
		
        // 分打印纸尺寸
        if(mm == 80){
        	
            var dish_name_spacing = 41;
//          var dish_price_spacing = 8;
//          var dish_num_spacing = 18;
//          var totalprice_spacing = 18;
//          var paidin_spacing = 34;
            var separator = "------------------------------------------------\n";
            ptext += separator;
            ptext += "菜品                                    数量\n";
        }else if(mm == 58){
            var dish_name_spacing = 29;
//          var dish_price_spacing = 8;
//          var dish_num_spacing = 11;
//          var totalprice_spacing = 11;
//          var paidin_spacing = 18;
            var separator = "--------------------------------\n";
            ptext += separator;				   
            ptext += "菜品                        数量\n";
           
        
        }
         
        // 菜品总数量
        var totalnum = 0;
        var totalprice = 0;
        // 添加菜品信息
        for(var k in data.dish){
            var l = data.dish[k];
            var text = '';
            var price = l.price.toFixed(2) + '';
            var num = l.num + '';
            var alltotal = l.total.toFixed(2) + '';
            text += l.name;
            for(var i = 0;i < dish_name_spacing - l.name.len();i++) text += ' ';
            text += l.qty+"份";
           
            totalnum += l.num;
            totalprice += l.total;
            ptext += text + "\n";
			
			if(typeof l.Ingredient != 'undefined')
			{
				
				ptext += "("+l.Ingredient+")"+"\r\n";
				
			}
			
           

            

        }
     
        // 添加优惠信息
        ptext += separator;

//      for(var i = 0;i<=5;i++)
//      {
//      	ptext +="\r\n";
//      }
		
		 ptext +="\x1D\x56\x42\x00";//切纸命令
       
        return ptext;
	},
	//结账单模板
	pay_receiptemp:function(mm,data)
	{
			var all_spacing = 0;
			if(mm == 80){
				all_spacing = 48;
			}else{
				all_spacing = 32;
			}
		
			var ptext = '';
			var str = '';
			// 设置头部信息
			if(typeof data.source != 'undefined'){
				var temp = parseInt((all_spacing - data.shopname.len()) / 2);
				for(var i = 0;i < temp;i++) ptext += ' ';
				ptext += data.source == 'client' ? '扫码点结账单' : '预点餐结账单';
				for(var i = 0;i < temp;i++) ptext += ' ';
				ptext+="\n";
				
			}
			
			
			if(typeof data.shopname != 'undefined'){
				var temp = parseInt((all_spacing - data.shopname.len()) / 2);
				
				for(var i = 0;i < temp;i++) ptext += ' ';
				
				ptext += data.shopname;
				for(var i = 0;i < temp;i++) ptext += ' ';
				ptext += "\n";
			}
			
			if(mm == 80)
			{
				ptext += "------------------------------------------------\n";
			}else{
				ptext += "--------------------------------\n";
			}
			
			
			
			
			if(data.source == "client")
			{
				if(typeof data.table != 'undefined')
				{
					ptext += "桌台:" + data.table + "\r\n";
				}
				
				if(typeof data.customer_count != 'undefined')
				{
					ptext += "就餐人数:" + data.customer_count + "\r\n";
				}
			
				if(typeof data.note != 'undefined')
				{	
					ptext += "备注:" + data.note + "\r\n";
				}
				
			}else{
				
				if(typeof data.brand != 'undefined')
				{
					ptext += "牌号:" + data.brand + "\r\n";
				}
				
				if(typeof data.ordertype != 'undefined')
				{
					ptext += "类型:" + data.ordertype + "\r\n";
				}
				
				if(typeof data.mealtime != 'undefined')
				{	
					ptext += "就餐时间:" + data.mealtime + "\r\n";
				}
				
				if(typeof data.note != 'undefined'){
					ptext += "备注:" + data.note + "\r\n";
				}
			}
			
			if(mm == 80)
			{
				ptext += "------------------------------------------------\r\n";
			}else{
				ptext += "--------------------------------\r\n";
			}
			
			
			if(typeof data.dish == 'undefined') return false;
		
			// 分打印纸尺寸
			if(mm == 80){
				var dish_name_spacing = 38;
				var dish_price_spacing = 8;
				var dish_num_spacing = 18;
				var totalprice_spacing = 18;
				var paidin_spacing = 34;
				var separator = "------------------------------------------------\r\n";
				ptext += "菜品                                数量   价格\n";
				ptext += separator;
				
			}else if(mm == 58){
				var dish_name_spacing = 22;
				var dish_price_spacing = 8;
				var dish_num_spacing = 11;
				var totalprice_spacing = 11;
				var paidin_spacing = 18;
				var separator = "--------------------------------\r\n";
//				ptext += separator;
				ptext += "菜品                 数量   价格\n";
				ptext += separator;
			
			}
			
			// 菜品总数量
			var totalnum = 0;
			var totalprice = 0;
			// 添加菜品信息
			for(var k in data.dish){
				var l = data.dish[k];
				var text = '';
				var price = l.price.toFixed(2) + '';
				var num = l.num + '';
				var alltotal = l.total.toFixed(2) + '';
				text += l.name;
				for(var i = 0;i < dish_name_spacing - l.name.len();i++) text += ' ';
				text += l.qty;
				for(var i = 0;i < dish_price_spacing - price.len();i++) text += ' ';
				var numprice = (l.price*l.qty).toFixed(2);
				text += numprice
//				for(var i = 0;i < dish_num_spacing - num.len() - alltotal.len();i++) text += ' ';
//				text += alltotal;
				totalnum += l.num;
				totalprice += l.price*l.qty;
				ptext += text + "\r\n";
				if(typeof l.Ingredient != 'undefined')
				{
					
					ptext += "("+l.Ingredient+")"+"\r\n";
					
				}
			}
			
			if(mm == 80)
			{
				ptext += "------------------------------------------------\r\n";
			}else{
				ptext += "--------------------------------\r\n";
			}
		
		    // 添加优惠信息
//		    var ban = '';
//		    for(var i = 0;i < all_spacing - (data.youhui.toFixed(2).length + '优惠:'.len());i++) ban += ' ';
//			ptext += '优惠:' + ban + data.youhui.toFixed(2) + "\r\n";
		
			// 添加合计
			totalnum = totalnum + '';
			totalprice = totalprice.toFixed(2) + '';
			if(mm == 80){
				var he = '合计:                           ' ;
			}else if(mm == 58){
				var he = '合计:                  ';
			}
			var h_ban = '';
			for(var i = 0;i < totalprice_spacing - totalprice.len() - totalnum.len();i++) h_ban += ' ';
			he += h_ban;
			he += totalprice;
			ptext += he + "\r\n";
			ptext += separator;
			
			
			
			if(typeof data.paytype != 'undefined')
			{
				ptext += data.paytype + ":" + totalprice+"\r\n";
			}
			
			if(typeof data.payresult != 'undefined')
			{
				ptext += "找零:" + data.payresult +"\r\n"; 
			}
			
			ptext +="\r\n";
			
			if(typeof data.amount_receivable !='undefined')
			{
				if(mm == 80){
				    var shi = '                           实收:'+data.amount_receivable.toFixed(2);
				}else if(mm == 58){
					var shi = '                    实收:'+data.amount_receivable.toFixed(2);
				}
				ptext +=shi+"\r\n";
			}
			
			
			ptext  += separator;
			
			ptext += '签字：';
			
			ptext +="\r\n\r\n";
			
			ptext += separator;
			
			if(typeof data.account != 'undefined')
			{
				ptext += "服务员:" + data.account + "\r\n";
			}
			
			
			
			if(data.source == 'client'){
				if(typeof data.ordersn != 'undefined')
				{
					
					ptext += "订单号:" + data.ordersn + "\r\n";
				}
			}else{
					var time = getNowFormatDate();
						ptext += "打印时间:" + time + "\r\n";
					
			}
		
			
			if(typeof data.writer != 'undefined')
			{	
				ptext += "下单人:" + data.writer + "\r\n";
			}
			
			if(typeof data.write_time != 'undefined'){
				ptext += "下单时间:" + data.write_time + "\r\n";
			}
				ptext +="\r\n";
				ptext +="\r\n";
				
			if(typeof data.bottom != 'undefined'){
				var temp = parseInt((all_spacing - data.bottom.len()) / 2);
				for(var i = 0;i < temp;i++) ptext += ' ';
				ptext += data.bottom;
				for(var i = 0;i < temp;i++) ptext += ' ';
				ptext += "\r\n";
			}
			
			
			// 应收
//			var ban = '';
//		    for(var i = 0;i < all_spacing - (data.yingshou.toFixed(2).length + '应收:'.len());i++) ban += ' ';
//			ptext += '应收:' + ban + data.yingshou.toFixed(2) + "\r\n";
//		
			// 实收
//			var paidin_ban = '';
//			var paidin = data.paidin.toFixed(2) + '';
//			var paidin_txt = '实收:     现金';
//			for(var i = 0;i < paidin_spacing - paidin.len();i++) paidin_ban+= ' ';
//			paidin_txt += paidin_ban + paidin;
//			ptext += paidin_txt + "\r\n";
		ptext +="\x1D\x56\x42\x00";
			return ptext;
		
	
    },
    //汇总
    Summary_temp:function(mm,data)
	{
		var all_spacing = 0;
        if(data.mm == 80){
            all_spacing = 100;
        }else{
            all_spacing = 32;
        }

        var ptext = '';
        
        // 设置头部信息
      	var title = "交接班汇总"	;
      	     	
        var temp = parseInt((all_spacing - title.len()) / 2);
        for(var i = 0;i < temp;i++) ptext += ' ';
        ptext += title;
        for(var i = 0;i < temp;i++) ptext += ' ';
        ptext += "\n";
        ptext += "\n";
          
		if(typeof data.shopname != 'undefined')
		{
			ptext += "商户名称:" + data.shopname + "\r\n";
		}
		
		if(typeof data.join_time != 'undefined')
		{
			ptext += "交接时间:" + data.join_time + "\r\n";
		}
		
		if(mm == 80){
        	
            var dish_name_spacing = 30;
            var dish_price_spacing = 20;
//          var dish_num_spacing = 18;
//          var totalprice_spacing = 18;
//          var paidin_spacing = 34;
            var separator = "------------------------------------------------\n";
            ptext += separator;					  1
            ptext += "类型              金额               数量\n";
        }else if(mm == 58){
            var dish_name_spacing = 15;
            var dish_price_spacing = 12;
//          var dish_num_spacing = 11;
//          var totalprice_spacing = 11;
//          var paidin_spacing = 18;
            var separator = "--------------------------------\n";
            ptext += separator;				  
            ptext += "类型           金额         笔数\n";
           
        
        }
		
		ptext += separator;
		
        if(typeof data.summary == 'undefined') return false;
		
        // 分打印纸尺寸
       
         
        // 菜品总数量
        var totalnum = 0;
        var totalprice = 0;
        // 添加菜品信息
        for(var k in data.summary){
            var l = data.summary[k];
            var text = '';
 			
            text += l.paytype+"\r\n";
            
            for(var j in data.summary[k]['detail'])
            {
            	
            	var t = data.summary[k]['detail'][j];
            	
            	text += t.name;
            
            	for(var i = 0;i < dish_name_spacing - t.name.len();i++) text += ' ';
          		text += t.amount_total.toFixed(2);
          		for(var i = 0;i < dish_price_spacing - t.amount_total.toString().len();i++) text += ' ';
          		
            	if(j==2){
            		text += t.sum+"\r\n"+separator;
            	}else{
            		text += t.sum+"\r\n";
            	}
            	
            }
            ptext += text;  
        }
     
        // 添加优惠信息
       
        
        if(typeof data.amount_total != 'undefined')
		{
			ptext += "收款统计:" + data.amount_total.toFixed(2) + "\r\n";
		}
		
		if(typeof data.amount_receivable != 'undefined')
		{
			ptext += "商家收款:" + data.amount_receivable.toFixed(2) + "\r\n";
		}
		
		ptext +="\x1D\x56\x42\x00";
       

       
        return ptext;
	},
	//交接班明细
	outtemplate:function(mm,data)
	{
	    let template = '';
	    let commonname = {
	        Wechat:'微信有效',
	        Alipay:'支付宝有效',
	        Other:'其他有效'
	    }
	    if(mm == 58){
	        var line = "--------------------------------\r\n";
	        var detailline = "  ----------------------------  \r\n";
	        var detailheader = "    时间        类型      金额  \r\n";
	        var type_spacing = 13;
	        var price_spacing = 10;
	        var all_spacing = 32;
	    }else if(mm == 80){
	        var line = "------------------------------------------------\r\n";
	        var detailline = "  --------------------------------------------  \r\n";
	        var detailheader = "       时间        类型         金额      \r\n";
	        var type_spacing = 17;
	        var price_spacing = 13;
	        var all_spacing = 48;
	    }else{
	        return false;
	    }

	    var title = "交接班明细";
      	     	
        var temp = parseInt((all_spacing - title.len()) / 2);
        for(var i = 0;i < temp;i++) ptext += ' ';
        template += title;
        for(var i = 0;i < temp;i++) ptext += ' ';
        template += "\n";
        template += "\n";



	    template += '商户名称：' + data.MerchName + "\r\n";
	    template += '汇总时间：' + data.SumTime + "\r\n";
	    template += line;
	    template += detailheader;
	    template += line;
	    // 拼接详情
	    for (let key in data) {
	        if(key == 'Wechat' || key == 'Alipay' || key == 'Other'){
	            if(key == 'Alipay'){
	                template += '  ' + commonname[key] + '：' + data[key].active.PenNum + '笔  ' + data[key].active.Price.toFixed(2) + "\r\n";
	            }else{
	                template += '  ' + commonname[key] + '：  ' + data[key].active.PenNum + '笔  ' + data[key].active.Price.toFixed(2) + "\r\n";
	            }
	            
	            // 循环list 拼接详情
	            for(let k in data[key].list){
	                template += '  ';
	                // 拼接时间
	                template += data[key].list[k].time;
	                // 拼接空格
	                for(var i = 0; i < type_spacing - data[key].list[k].time.len();i++) template += ' ';
	                // 拼接类型
	                template += data[key].list[k].type;
	                // 拼接空格
	                for(var i = 0; i < price_spacing - data[key].list[k].type.len();i++) template += ' ';
	                // 拼接价格
	                var price = data[key].list[k].price.toFixed(2) + '';
	                template += price + "\r\n";
	
	            }
	            if(key != 'Other'){
	                template += detailline;
	            }
	        }
	    }
	    template += line;
	    template += '收款总计   ' + data.Total.toFixed(2) + "\r\n";
	    template += '商家收款   ' + data.MchTotal.toFixed(2) + "\r\n";
	    template += "\x1D\x56\x42\x00";
	    return template;
	},
	addZero: function (time) {
      if (time <= 9) {
          time = "0" + time;
      }
      return time;
    },
    getNowFormatDate: function (item) 
    {
      let date = new Date();
      let seperator1 = "-";
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      let hour = date.getHours();
      let min = date.getMinutes();
      // this.sce = date.getSeconds();
      month = this.addZero(month);
      strDate = this.addZero(strDate);
      hour = this.addZero(hour);
      min = this.addZero(min);
      let currentdate = year + seperator1 + month + seperator1 + strDate + " " + hour + ":" + min;
      if(typeof(item) != 'undefined' && item.res == 'data'){
        currentdate = year + seperator1 + month + seperator1 + strDate;
      }
      return currentdate;
    },


	


	
}
