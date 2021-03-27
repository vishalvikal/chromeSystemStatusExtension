chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  if(request.request === 'GetSystemStatus'){
      chrome.system.cpu.getInfo(cpuInfo=>{
        chrome.system.display.getInfo(displayInfo=>{
          chrome.system.memory.getInfo(memoryInfo=>{
            chrome.system.storage.getInfo(storageInfo=>{
              sendResponse({cpuInfo, displayInfo, memoryInfo, storageInfo})
            })
          })
        })
      })
  }
  console.log(chrome);
  return true;
})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
  console.log(sender.tab?"From a content script:"+sender.tab.url:"From the exntension");
  if(request.greeting === 'hello'){
   chrome.system.memory.getInfo(info=>{
     console.log(info);
      sendResponse(info);
    })
  }
  return true;
})
