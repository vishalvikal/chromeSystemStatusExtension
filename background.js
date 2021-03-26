// console.log("Bacground is running");
// chrome.browserAction.onClicked.addListener(buttonClicked);

// function buttonClicked(tab){
//   console.log(chrome.extension.getURL('ct.png'));
//   chrome.system.cpu.getInfo((info, info1) => console.log(info, info1));
//   chrome.system.storage.getInfo(info=>console.log(info));
//   chrome.system.memory.getInfo(info=>console.log(info));
//   chrome.system.display.getInfo(info=>console.log(info));
//   let msg ={
//     txt:"hello"
//   }
//   chrome.tabs.sendMessage(tab.id, msg);
// }

// window.addEventListener('message', function(event){
//   console.log(event);
// })

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
