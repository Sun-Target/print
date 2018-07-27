
//当主线程发来信息后，触发该message事件
onmessage = function(event){
    var obj = event.data;
    console.log('子线程');
    console.log(obj);
    var da = obj.name.readLine();
    postMessage(da);
    //向主线程发送event.data.name信息
    postMessage(event.data.name);
};
