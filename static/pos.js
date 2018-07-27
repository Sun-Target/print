document.addEventListener('plusready',function(){
    /*
        params1 要调用的接口方法名
        params2 参数 不需要参数传一个空对象
        params3 回调方法
    */
    function A8(module,params,callback)
    {
        // 公共参数获取集
        var commonreturnarr = ['amount','traceNo','batchNo','referenceNo','cardNo','type','issue','date','time','merchantId','terminalId','merchantName'];
        /* 映射requestCode和需要获取的数据 */
        var func = {
            // 自定义打印
            CustomPrint:{requestCode:1000,key:['reason']},
            // 扫码
            Qrcode:{requestCode:1,key:['return_txt']},
            // 签到
            Sign:{requestCode:0,key:['merchantld','terminalld','merchantName'],transName:'签到'},
            // 签退
            UnSign:{requestCode:0,key:[],transName:'签退'},
            // 微信银行卡结算
            Settle:{requestCode:0,key:['settleJson'],transName:'微信银行卡结算'},
            // 余额查询
            Balance:{requestCode:0,key:[],transName:'余额查询'},
            // 交易查询
            Trating:{requestCode:0,key:['json'],transName:'查询数据'},
            // 终端参数
            Terminal:{requestCode:0,key:['wireless.apn','wireless.username','wireless.password','wireless.apnEnabled','terminalId','merchantId','merchantName'],transName:'终端参数'},
            // 系统管理
            System:{requestCode:0,key:[],transName:'系统管理'},
            // 打印最后一笔
            PrintLast:{requestCode:0,key:commonreturnarr,transName:'打印最后一笔'},
            // 打印任意一笔
            PrintAny:{requestCode:0,key:['anyTransOrderNo','merchantld','terminalld','merchantName'],transName:'打印任意一笔'},
            // 预授权
            PreAuthorization:{requestCode:0,key:commonreturnarr,transName:'预授权'},
            // 预授权撤销
            PreAuthorizationCancle:{requestCode:0,key:commonreturnarr,transName:'预授权撤销'},
            // 预授权完成（请求）
            PreAuthorizationSuccess:{requestCode:0,key:commonreturnarr,transName:'预授权完成（请求）'},
            // 预授权完成撤销
            PreAuthorizationSuccessCancle:{requestCode:0,key:commonreturnarr,transName:'预授权完成撤销'},
            // 消费
            Consumption:{requestCode:101,key:commonreturnarr,transName:'消费'},
            // 消费撤销
            ConsumptionCancle:{requestCode:102,key:commonreturnarr,transName:'消费撤销'},
            ConsumptionLast:{requestCode:103,key:commonreturnarr,transName:'消费末笔查询'},
            ZFBPay:{requestCode:0,key:commonreturnarr,transName:'支付宝消费'},
            ZFBReturn:{requestCode:105,key:commonreturnarr,transName:'支付宝退款'},
            ZFBLast:{requestCode:10004,key:commonreturnarr,transName:'支付宝末笔查询'},
            WechatPay:{requestCode:800,key:commonreturnarr,transName:'微信消费'},
            WechatReturn:{requestCode:801,key:commonreturnarr,transName:'微信退款'},
            WechatLast:{requestCode:805,key:commonreturnarr,transName:'微信末笔查询'},
            OrderNumberSelect:{requestCode:300,key:commonreturnarr,transName:'订单号查询'},
            OnlineSelect:{requestCode:511,key:commonreturnarr},
            OnlinePrintAny:{requestCode:522,key:commonreturnarr},
            // 银行卡支付部分退款
            ReturnGoods:{requestCode:0,key:commonreturnarr,transName:'退货'}
        };
        // 注册是否检测金额
        var amount_rel = ['ZFBPay','ConsumptionCancle','Consumption','WechatPay','ReturnGoods'];
        // 注册添加版本号的方法
        var version_rel = ['ZFBPay','ConsumptionCancle','Consumption','ZFBReturn','ZFBLast','WechatPay','WechatReturn','WechatLast','ConsumptionLast','OrderNumberSelect','OnlineSelect','OnlinePrintAny','ReturnGoods'];
        // 注册是否打印参数
        var isPrintTicket_rel = ['ZFBPay','UnSign','CustomPrint','ZFBReturn','ZFBLast','WechatPay','WechatReturn','WechatLast','ConsumptionLast','OrderNumberSelect','OnlineSelect'];

        // 注册检测凭证号参数
        var oldTrace_rel = ['ZFBReturn','ConsumptionCancle','PrintAny','WechatReturn','OnlineSelect'];
        // 注册添加获取参数->消费参数transactionType
        var transactionType_rel = ['Consumption','ConsumptionCancle','ZFBLast','ZFBPay','ZFBReturn','WechatPay','ConsumptionLast','WechatLast'];
        

        
        if(typeof callback != 'function') callback = function(){};

        if(typeof func[module] == 'undefined'){
            callback(false);
            return;
        }

        if(typeof params != 'object'){
            callback(false);
            return;
        }


        // 初始化
        var main = plus.android.runtimeMainActivity();
        var Intent = plus.android.importClass('android.content.Intent');
        var com = plus.android.importClass('android.content.ComponentName');
        var intent = new Intent();
        var package = 'com.fuyousf.android.fuious';
        var package_new = 'com.fuyousf.android.fuious.MainActivity';

        if(typeof func[module].transName != 'undefined'){
            params.transName = func[module].transName;
        }


        // 区分某些接口要特殊处理的参数
        switch(module){
            // 打印
            case 'CustomPrint':
                package_new = "com.fuyousf.android.fuious.CustomPrinterActivity";
                if(typeof params['data'] == 'undefined' || typeof params['data'] != 'string'){
                    callback({errcode:1,msg:'data不能为空或非字符串类型'});
                    return;
                }
            break;
            // 扫码
            case 'Qrcode':
                package_new = "com.fuyousf.android.fuious.NewSetScanCodeActivity";
                params.flag = "true";
            break;
            // 结算
            case 'Settle':
                if(typeof params['isPrintSettleTicket'] == 'undefined'){
                    params.isPrintSettleTicket = "false";
                }
            break;
            // 打印任意一笔
            case 'PrintAny':
                // if(typeof params.orderNumber == 'undefined'){
                //     callback({errcode:1,msg:'订单号不能为空'});
                //     return;
                // }
            break;
            // 消费撤销
            case 'ConsumptionCancle':
                if(typeof params.isManagePwd == 'undefined'){
                    params.isManagePwd = "false";
                }
                func[module].key.push('oldReferenceNo');
                func[module].key.push('oldOrderNumber');
            break;
            case 'PrintLast':
                func[module].key.push('orderNumber');
                func[module].key.push('zfbOrderNumber');
                func[module].key.push('zfbOldOrderNumber');
                func[module].key.push('tuiOldOrderNumber');
                func[module].key.push('wxOrderNumber');
                func[module].key.push('wxOldOrderNumber');
                func[module].key.push('transactionType');
            break;
            case 'Consumption':

                func[module].key.push('orderNumber');
            break;
            case 'ZFBPay':
                func[module].key.push('zfbOrderNumber');
                if(typeof params.isFrontCamera == 'undefined'){
                    params.isFrontCamera = 'true';
                }
            break;
            case 'ZFBReturn':
                func[module].key.push('zfbOldOrderNumber');
                func[module].key.push('oldTrace');
            break;
            case 'ZFBLast':
                func[module].key.push('zfbMbOldOrderNumber');
            break;
            case 'WechatPay':
                if(typeof params.isFrontCamera == 'undefined'){
                    params.isFrontCamera = 'true';
                }
                func[module].key.push('wxOrderNumber');
            break;
            case 'WechatReturn':
                func[module].key.push('wxOldOrderNumber');
                func[module].key.push('oldTrace');
            break;
            case 'WechatLast':
                func[module].key.push('wxMbOldOrderNumber');
            break;
            case 'ConsumptionLast':
                func[module].key.push('oldReferenceNo');
                func[module].key.push('orderNumber');
            break;
            case 'OrderNumberSelect':
                if(typeof params.orderNumber == 'undefined'){
                    callback({errcode:1,msg:'OrderNumber订单号不能为空'});
                    return;
                }
                func[module].key.push('oldTrace');
                func[module].key.push('orderNo');
                func[module].key.push('referenceNoSuccess');
                func[module].key.push('oldReferenceNoSuccess');
            break;
            case 'OnlineSelect':
                func[module].key.push('oldReferenceNo');
                func[module].key.push('pan');
                func[module].key.push('oldTrace');
                func[module].key.push('orderNo');
                func[module].key.push('orderNumber');
                if(typeof params.transName == 'undefined'){
                    callback({errcode:1,msg:'类型不得为空'});
                    return;
                }
            break;
            case 'OnlinePrintAny':
                if(typeof params.transOrderNo == 'undefined'){
                    callback({errcode:1,msg:'transOrderNo凭证号不能为空'});
                    return;
                }
                if(typeof params.transDate == 'undefined'){
                    callback({errcode:1,msg:'transDate交易时间不能为空'});
                    return;
                }
                if(typeof params.transName == 'undefined'){
                    callback({errcode:1,msg:'交易类型不能为空'});
                    return;
                }else if(params.transName == '联机消费查询'){
                    params.transStatus = 'OC';
                }else if(params.transName == '联机微信查询'){
                    params.transStatus = 'OW';
                }else if(params.transName == '联机支付宝查询'){
                    params.transStatus = 'OZ';
                }
                func[module].key.push('orderNumber');
            break;
            case 'ReturnGoods':
                func[module].key.push('backOldReferenceNo');
                func[module].key.push('tuiOldOrderNumber');
            break;
        }

        // 公共参数金额
        if(amount_rel.indexOf(module) > -1){
            if(typeof params.amount == 'undefined'){
                callback({errcode:1,msg:'金额不能为空'});
                return;
            }
        }        
        // 公共参数版本号
        if(version_rel.indexOf(module) > -1){

            params.version = '1.0.8';
        }
        // 公共参数是否打印
        if(isPrintTicket_rel.indexOf(module) > -1){
            if(typeof params.isPrintTicket == 'undefined'){
                params.isPrintTicket = "true";
            }
        }
        // 公共参数凭证号
        if(oldTrace_rel.indexOf(module) > -1){
            if(typeof params['oldTrace'] == 'undefined' || params['oldTrace'] == ''){
                    callback({errcode:1,msg:'oldTrace不能为空'});
                    return;
                }
        }
        // 有关消费的获取参数
        if(transactionType_rel.indexOf(module) > -1){

            func[module].key.push('transactionType');
        }
        // 有关预授权的获取参数
        if(module == 'PreAuthorization' || module == 'PreAuthorizationCancle' || module == 'PreAuthorizationSuccess' || module == 'PreAuthorizationSuccessCancle' || module == 'OrderNumberSelect' || module == 'OnlineSelect'){

            func[module].key.push('authorizationCode');
        }

        

        // 使用intent设置要调用的静态类
        intent.setComponent(new com(package,package_new));

        // 设置参数
        for(key in params){
            console.log(key + ':' + params[key]);
            intent.putExtra(key,params[key]);
        }

        // 开启新Activity调用
        main.startActivityForResult(intent,func[module].requestCode);

        // 获取Activity返回的数据
        main.onActivityResult = function(requestCode, resultCode, data){
            plus.android.importClass(data);
            
            // 获取返回的数据
            var result = {};
            if(requestCode == func[module].requestCode){
                for(k in func[module].key){
                    var tmp = data.getStringExtra(func[module].key[k]);
                    if(typeof tmp == 'string'){
                        eval('result.' + func[module].key[k].replace('.','_') + " = " + "'" + tmp + "'");
                    }else{
                        eval('result.' + func[module].key[k].replace('.','_') + " = " + tmp);
                    }
                    
                }
            } 

            callback(result);
        };
    }
    window.A8 = A8;
},true);
