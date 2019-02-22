
//对图片旋转处理，这一部分直接复制就好，

function rotateImg(img, direction,canvas) { 
    //最小与最大旋转方向，图片旋转4次后回到原方向  
    var min_step = 0;  
    var max_step = 3;  
    if (img == null)return;  
    //img的高度和宽度不能在img元素隐藏后获取，否则会出错  
    var height = img.height;  
    var width = img.width;  
    var step = 2;  
    if (step == null) {  
		step = min_step;  
    }  
    if (direction == 'right') {  
		step++;  
		//旋转到原位置，即超过最大值  
		step > max_step && (step = min_step);  
    } else {  
		step--;  
		step < min_step && (step = max_step);  
	}  
    //旋转角度以弧度值为参数  
    var degree = step * 90 * Math.PI / 180;  
    var ctx = canvas.getContext('2d');  
    switch (step) {  
		case 0:  
			canvas.width = width;  
			canvas.height = height;  
			ctx.drawImage(img, 0, 0);  
			break;  
		case 1:  
			canvas.width = height;  
			canvas.height = width;  
			ctx.rotate(degree);  
			ctx.drawImage(img, 0, -height);  
			break;  
		case 2:  
			canvas.width = width;  
			canvas.height = height;  
			ctx.rotate(degree);  
			ctx.drawImage(img, -width, -height);  
			break;  
		case 3:  
			canvas.width = height;  
			canvas.height = width;  
			ctx.rotate(degree);  
			ctx.drawImage(img, -width, 0);  
			break;  
	}
}
  
window.handleImage = function(fileObj) {
	const file = fileObj.files['0']; //这里拿到的文件是blob类型
	if(file==null||file==undefined) {
		return;
	}
	
	var pictype = file.type;
	var type = pictype.split("/")[1];//判断是否图片类型
	if(type=="bmp"||type=="tiff"||type=="gif"||type=="jpeg"||type=="exif"||type=="png"||type=="raw"||type=="jpg") {
		if(file.size>10*1024*1024) {
			alert("请上传一张小于10M的照片哦！");//这里是页面得提示语，自行做一个弹框
			return;
		}	
	} else {
		alert("暂不支持该格式！");
		return;
	}

	//图片方向角 added by lzk 
	var Orientation = null;
	if (file) {
		// var URL = URL || webkitURL;
		//获取照片方向角属性，用户旋转控制
		EXIF.getData(file, function() {
			EXIF.getAllTags(this);  
			Orientation = EXIF.getTag(this, 'Orientation');//这个Orientation 就是我们判断需不需要旋转的值了，有1、3、6、8
		});

		var oReader = new FileReader();
		oReader.onload = function(e) {
			var image = new Image();
			image.src = e.target.result;
			image.onload = function() {
				var expectWidth = this.naturalWidth;
				var expectHeight = this.naturalHeight;
				if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
				  expectWidth = 800;
				  expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
				} else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
				  expectHeight = 1200;
				  expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
				}

				var canvas = document.createElement("canvas");
				var ctx = canvas.getContext("2d");
				canvas.width = expectWidth;
				canvas.height = expectHeight;
				ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
				//如果方向角不为1，都需要进行旋转
				if(Orientation != "" && Orientation != 1){
					//alert('旋转处理');
					switch(Orientation){
						case 6://需要顺时针（向左）90度旋转
							//alert('（向左）90度旋转');
							rotateImg(this,'left',canvas);
							break;
						case 8://需要逆时针（向右）90度旋转
							//alert('向右）90度旋转');
							rotateImg(this,'right',canvas);
						break;
					  case 3://需要180度旋转
							//alert('需要180度旋转');
							rotateImg(this,'right',canvas);//转两次
							rotateImg(this,'right',canvas);
							break;
					}     
				}  
				base64 = canvas.toDataURL("image/jpeg", 0.8);
				//$('#showImage').css('background-image','url('+base64+')');//这里就是你放图片的地方啦
				changeStyle({command:"insertImage", value:base64});
			};
		};
		oReader.readAsDataURL(file);//注意一旦file不是blob类型这里是会报错的
	}
}