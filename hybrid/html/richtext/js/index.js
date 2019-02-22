const app = {};

const changeStyle = data => {
	const {command, value=null} = data;
    const result = document.execCommand(command, false, value);
	// console.log(result, command, value);
	setTimeout(() => document.getElementById("text-area").focus());
}

// const textChange = () => {
// 	const text = document.getElementById('text-area').innerHTML;
// 	uni && uni.postMessage && uni.postMessage({data:text});
// }
// 

function fileUpload(e) {
	console.log(e);
	return handleImage(e);
	const reads= new FileReader();
    const file=document.getElementById('fileupload').files[0];
    reads.readAsDataURL(file);
    reads.onload= function () {
		const src = this.result;
		changeStyle({command:"insertImage", value:src});
    };
}

function save() {
	const {id, token, url, fieldName="text"} = app.query;
	if (!id || !token|| !url) return;
	const text = document.getElementById('text-area').innerHTML;
	axios({
		method:"post",
		url,
		data: {
			id, 
			[fieldName]:text,
		},
		headers: {
			"Authorization": "Bearer " + token,
			"Content-Type": "application/json",
		},
	}).then(()=> {
		console.log("保存成功");
	});
}
document.addEventListener('UniAppJSBridgeReady', function() {
	window.clickBackBtn = function() {
		uni.switchTab({
			url: '/pages/index/index'
		});
	}
    uni.getEnv(function(res) {  
		if (res.plus) {
			document.getElementById("page-container").style.top = "20px";
		} else if (res["h5"]) {
			//document.getElementById("page-container").style.top = "20px";
		}
        console.log('当前环境：' + JSON.stringify(res));  
    });  
});

window.onload = function() {
	app.query = url("?", window.location.href) || {};
	const editor = document.getElementById("text-area");
	setTimeout(() => document.getElementById("text-area").focus());
	document.getElementById('text-area').innerHTML = app.query.text || "";
}

