/**
 * 图片懒加载
 * @param {Object}   obj       DOMElement
 * @param {Function} callback  加载完成回调函数
 * 
 * @author fanrong33
 * @version 1.1.0 build 20160107
 */

function lazyload(obj, callback){
	mui.plusReady(function(){
        var debug = false; // 默认打印调试日志
	    if(obj.getAttribute('data-loaded')){
	       return; 
	    }

	    var image_url = obj.getAttribute('data-lazyload');
	    debug && console.log(image_url);


	    // 1. 转换网络图片地址为本地缓存图片路径，判断该图片是否存在本地缓存
	    // http://...jpg -> md5
	    // 缓存目录 _downloads/image/(md5).jpg
	    var image_md5           = md5(image_url);
	    var local_image_url     = '_downloads/image/'+image_md5+'.jpg'; // 缓存本地图片url
		var absolute_image_path = plus.io.convertLocalFileSystemURL(local_image_url); // 平台绝对路径
	   

	    // alert(absolute_image_path);
	    // alert(local_image_url);
	    // alert(image_md5);
	    // new temp_img 用于判断图片文件是否存在
	    var temp_img = new Image();
	    temp_img.src = absolute_image_path;
	    temp_img.onload = function(){
	        debug && console.log('存在本地缓存图片文件'+local_image_url+'，直接显示');

	        // 1.1 存在，则直接显示（本地已缓存，不需要淡入动画）
	        obj.setAttribute('src', absolute_image_path);
	        obj.setAttribute('data-loaded', true);
	        obj.classList.add('img-lazyload');

	        callback && callback();
	        return;
	    }
	    temp_img.onerror = function(){
	        debug && console.log('不存在本地缓存图片文件');

	        // 1.2 下载图片缓存到本地
	        debug && console.log('开始下载图片'+image_url+' 缓存到本地: '+local_image_url);
	        function download_img(){
	            var download_task = plus.downloader.createDownload(image_url, {
	                filename: local_image_url // filename:下载任务在本地保存的文件路径
	            }, function(download, status) {
	                if(status != 200){
	                    // 下载失败,删除本地临时文件
	                    debug && console.log('下载失败,status'+status);
	                    if(local_image_url != null){
	                        plus.io.resolveLocalFileSystemURL(local_image_url, function(entry) {
	                            entry.remove(function(entry) {
	                                debug && console.log("临时文件删除成功" + local_image_url);
	                                // 重新下载图片
	                                download_img();
	                            }, function(e) {
	                                debug && console.log("临时文件删除失败" + local_image_url);
	                            });
	                        });
	                    }
	                }else{
	                    // 把下载成功的图片显示
	                    // 将本地URL路径转换成平台绝对路径
	                    obj.setAttribute('src', plus.io.convertLocalFileSystemURL(local_image_url));
	                    obj.setAttribute('data-loaded', true);
	                    obj.classList.add('img-lazyload');

	                    callback && callback();
	                }
	            });
	            download_task.start();
	        }
	        download_img();
	    }
    });
}