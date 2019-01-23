
      !(function(){
        var uniAppViewReadyCallback = function(){
          setCssToHead([".",[1],"qrcard-container { padding: 20% 5%; background-color:dimgrey; }\n",],undefined,{path:"./pages/user/qrcard.wxss"})();
document.dispatchEvent(new CustomEvent("generateFuncReady", { detail: { generateFunc: $gwx('./pages/user/qrcard.wxml') } }));
        }
        if(window.__uniAppViewReady__){
          uniAppViewReadyCallback()
        }else{
          document.addEventListener('uniAppViewReady',uniAppViewReadyCallback)
        }
      })();
      