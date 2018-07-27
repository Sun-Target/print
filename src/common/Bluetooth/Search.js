export default {
    install(Vue,options)
    {
        // 蓝牙搜索方法
        Vue.prototype.SearchBluetooth = function () {

            /*plus变量定义*/
            var main, BluetoothAdapter, BAdapter, IntentFilter, BluetoothDevice, receiver;

            /*其他定义*/
            var isSearchDevices = false, //是否处于搜索状态
                debug = false; //调试模式


            main = plus.android.runtimeMainActivity(),
            BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter"),
            IntentFilter = plus.android.importClass('android.content.IntentFilter'),
            BluetoothDevice = plus.android.importClass("android.bluetooth.BluetoothDevice"),
            BAdapter = new BluetoothAdapter.getDefaultAdapter();


            return {
                // 检查蓝牙是否开启
                CheckBluetoothState:function(){
                    return BAdapter.isEnabled();
                },
                // 开启蓝牙
                StartBluetooth:function(CallBack){
                    var self = this; 
                    if(!BAdapter.isEnabled()) {  // isEnabled判断蓝牙状态
                        plus.nativeUI.confirm("蓝牙处于关闭状态，是否打开？", function(e) {
                            if(e.index == 0) {
                                var enable = BAdapter.enable(); // 请求开启蓝牙
                                console.log(enable);                             
                                CallBack(true);
                            }else{
                                CallBack(false);
                            }
                        });
                    }
                },
                // 开始搜索设备
                StartSeatch:function(CallBack,errcallback){
                    try {
                        var self = this;
                        isSearchDevices = true;
                        var filter = new IntentFilter(),
                            bdevice = new BluetoothDevice();

                        BAdapter.startDiscovery(); //开启搜索

                        receiver = plus.android.implements('io.dcloud.android.content.BroadcastReceiver', {
                            onReceive: onReceiveFn
                        });
                        filter.addAction(bdevice.ACTION_FOUND);
                        filter.addAction(BAdapter.ACTION_DISCOVERY_STARTED);
                        filter.addAction(BAdapter.ACTION_DISCOVERY_FINISHED);
                        filter.addAction(BAdapter.ACTION_STATE_CHANGED);
                        main.registerReceiver(receiver, filter); //注册监听事件

                        //监听回调函数  回调函数会在搜索期间 持续调用
                        function onReceiveFn(context, intent) {
                            plus.android.importClass(intent); //通过intent实例引入intent类，方便以后的‘.’操作

                            //开始搜索改变状态
                            intent.getAction() === "android.bluetooth.device.action.FOUND" && (isSearchDevices = true);

                            //判断是否搜索结束
                            if(intent.getAction() === 'android.bluetooth.adapter.action.DISCOVERY_FINISHED') {
                                main.unregisterReceiver(receiver); //取消监听
                                isSearchDevices = false;
                                errcallback();
                                return;
                            }

                            var BleDevice = intent.getParcelableExtra(BluetoothDevice.EXTRA_DEVICE), // 设备对象
                                bleName = BleDevice.getName(), //设备名称
                                bleId = BleDevice.getAddress(); //设备mac地址
                                console.dir(JSON.stringify(BleDevice));

                            if(!bleName || !bleId) {
                                CallBack(false);
                            }

                            //判断是否配对
                            if(BleDevice.getBondState() === bdevice.BOND_BONDED) { // 已配对的蓝牙设备

                                CallBack({
                                    BleDevice:BleDevice,
                                    bleName:bleName, // 设备名称
                                    bleId:bleId, // 设备id
                                    isPaired:true,
                                    is_active:false
                                });
                            } else { // 未配对的蓝牙设备
                                CallBack({
                                    BleDevice:BleDevice,
                                    bleName:bleName, // 设备名称
                                    bleId:bleId, // 设备id
                                    isPaired:false
                                });
                            }
                        }
                    }
                    catch(err) {
                        errcallback();
                    }   
                },
                // 配对蓝牙设备
                Bluepairing:function(BleDevice,bleId,CallBack,ErrCallBack){
                    try {
                        var self = this,
                        bdevice = new BluetoothDevice(), // new java android.bluetooth.BluetoothDevice对象
                        BleDeviceItem = BleDevice; // 赋值设备
                        if(BleDeviceItem.getAddress() === bleId){
                            BleDeviceItem.createBond(); // 设备进行配对
                            var timeout = setInterval(function(){ // 创建定时器轮询配对结果
                                if(BleDeviceItem.getBondState() === bdevice.BOND_BONDED) { // 配对成功
                                    window.clearInterval(timeout);
                                    CallBack({
                                        status:true,
                                        errmsg:'配对成功'
                                    });
                                } else if(BleDeviceItem.getBondState() === bdevice.BOND_NONE) { // 配对失败
                                    window.clearInterval(timeout);
                                    ErrCallBack({
                                        status:false,
                                        errmsg:'配对失败,请尝试重新配对'
                                    });
                                }
                            },1000);
                        }else{
                            ErrCallBack({
                                status:false,
                                errmsg:'设备有误'
                            });
                        }
                    }
                    catch(err) {
                        ErrCallBack({
                            status:false,
                            errmsg:'异常错误'
                        });
                    } 
                },
                CancelSearch:function(){ // 取消搜索

                    main.unregisterReceiver(receiver); //取消监听
                },
            }
        };

        // 打印机连接方法
        Vue.prototype.ConnectPrinter = {
            // 首次new这个类会创建进行连接
            BluePrinter:function(bleId){ // 蓝牙打印机连接
                var plusMain = plus.android.runtimeMainActivity(),
                    BluetoothAdapter = plus.android.importClass("android.bluetooth.BluetoothAdapter"),
                    UUID = plus.android.importClass("java.util.UUID"),
                    uuid = UUID.fromString("00001101-0000-1000-8000-00805F9B34FB"),
                    BAdapter = BluetoothAdapter.getDefaultAdapter(),
                    device = BAdapter.getRemoteDevice(bleId);

                plus.android.importClass(device);

                var bluetoothSocket = device.createInsecureRfcommSocketToServiceRecord(uuid);
                plus.android.importClass(bluetoothSocket);
                if(!bluetoothSocket.isConnected()) {
                    try {
                        bluetoothSocket.connect();
                    } catch (e) {
                        console.log(e);
                    }                   
                }
                // 判断是否连接 没有连接则连接
                this.Print = function(byteStr){ // 打印的方法
                    var outputStream = bluetoothSocket.getOutputStream();
                    plus.android.importClass(outputStream);
                    var bytes = plus.android.invoke(byteStr, 'getBytes', 'gbk');
                    try {
                        outputStream.write(bytes);
                    } catch (e) {
                        mui.toast('打印失败！');
                    }                    
                    outputStream.flush();
                    device = null;
                    // bluetoothSocket.close();
                     console.log(2);
                };
                // 检查是否连接
                this.ConnectStatus = function(){
                    return bluetoothSocket.isConnected();
                };
                // 关闭连接
                this.CloseConnect = function(){
                    bluetoothSocket.close();
                };
                // 连接方法
                this.ConnectDevice = function(){
                    try{
                        bluetoothSocket = device.createInsecureRfcommSocketToServiceRecord(uuid);
                        bluetoothSocket.connect();
                    }
                    catch(err){
                        console.log(err.message);
                        return false;
                    }
                    
                };
                // 保存当前连接的bleId 用于判断使用单例模式
                this.BleId = bleId;
            }
        };
    }
  
}
