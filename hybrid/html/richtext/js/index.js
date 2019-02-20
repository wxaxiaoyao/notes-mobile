
const changeStyle = data => {
	const {command, value=null} = data;
    const result = document.execCommand(command, false, value);
	console.log(result, command, value);
	setTimeout(() => document.getElementById("text-area").focus());
}

const setStyle = (cmd, value = null) => {
	document.execCommand(cmd, false, value);
}

document.addEventListener('UniAppJSBridgeReady', function() {
	window.clickBackBtn = function() {
		const text = document.getElementById('text-area').innerHTML;
		//console.log(text);
		//uni.postMessage({data:text});
		uni.navigateBack({
			delta:1,
		});
	}
    uni.getEnv(function(res) {  
        console.log('当前环境：' + JSON.stringify(res));  
    });  
});

window.onload = function() {
	const editor = document.getElementById("text-area");
	setTimeout(() => document.getElementById("text-area").focus());
}

