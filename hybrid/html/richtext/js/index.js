const app = {};

const changeStyle = data => {
	const {command, value=null} = data;
    const result = document.execCommand(command, false, value);
	// console.log(result, command, value);
	setTimeout(() => document.getElementById("text-area").focus());
}

const textChange = () => {
	const text = document.getElementById('text-area').innerHTML;
	if (app.text == text) return;
	document.getElementById("save").className = "btn iconfont icon-edit";
	
	clearTimeout(app.timer);
	app.timer = setTimeout(()=> {
		window.localStorage.setItem("__richtext_text__", text);
	}, 3000);
}


function fileUpload(e) {
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
	document.getElementById("save").className = "btn iconfont icon-save";
	const text = document.getElementById('text-area').innerHTML;
	const innerText = document.getElementById('text-area').innerHTML;
	// const filename = document.getElementById("filename").value
	if (app.text == text) return;
	app.text = text;
	window.localStorage.setItem("__richtext_text__", text);
	
	const {id, token} = app.query;
	if (!token) return;
	axios({
		method:id ? "put" : "post",
		url: "http://api.wxaxiaoyao.cn/api/v0/documents",
		data: {
			id, 
			// filename, 
			text,
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
		uni.navigateBack({
			delta:2,
		});
// 		uni.switchTab({
// 			url: '/pages/index/index'
// 		});
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
	const editor = document.getElementById("text-area");
	const text = window.localStorage.getItem("__richtext_text__");
	
	app.query = url("?", window.location.href) || {};
	app.text = app.query.text || text || "";
	document.getElementById('text-area').innerHTML = app.text;
	// document.getElementById('filename').value = app.query.filename || "";
		
	setTimeout(() => document.getElementById("text-area").focus());
}

