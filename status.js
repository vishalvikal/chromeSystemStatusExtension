var cpuInfo = document.querySelector("#cpu-info");
var memoryInfo= document.querySelector('#memory-info');
var displayInfo = document.querySelector('#display-info');
var storageInfo = document.querySelector('#storage-info');
console.log(cpuInfo)
var infoObj = {
}
infoObj.cpu = data =>{
  var mainDiv = document.createElement('div');
  mainDiv.classList.add('info-section-cpu');
  var h2 = document.createElement('h2');
  h2.innerText = `Cpu Model Name: ${data.modelName}`;
  mainDiv.appendChild(h2);
  var h3 = document.createElement('h3');
  h3.innerText = `Cpu Arch: ${data.archName}`;
  mainDiv.appendChild(h3);
  var numOfProcessors = document.createElement('h3');
  numOfProcessors.innerText = `Num Of Processors: ${data.numOfProcessors}`
  mainDiv.appendChild(numOfProcessors);
  var features = document.createElement('h4');
  features.innerText = `Features:`;
  mainDiv.appendChild(features)
  var ul = document.createElement('ul');
  for(var i =0; i<data.features.length; i++){
    var li = document.createElement('li');
    li.innerText = data.features[i]+`${(i<data.features.length-1?',':'')}`;
    ul.appendChild(li)
  }
  mainDiv.appendChild(ul);
  cpuInfo.append(mainDiv);
}

infoObj.memory= data=>{
  var mainDiv = document.createElement('div');
  mainDiv.classList.add('info-section-memory');
  var total = document.createElement('h2');
  total.innerText = `Total: ${parseInt((data.availableCapacity+data.capacity)/(1000*1024*1024))} GB`;
  mainDiv.appendChild(total);
  var cap = document.createElement('h2');
  cap.innerText = `Capacity: ${parseInt(data.capacity / (1000 * 1024 * 1024))} GB`;
  mainDiv.appendChild(cap);
  var avC = document.createElement('h2');
  avC.innerText = `Available Capacity: ${parseInt(data.availableCapacity / (1000 * 1024 * 1024))} GB`
  mainDiv.appendChild(avC);
  
  memoryInfo.appendChild(mainDiv);
};
infoObj.display = data=>{
    var mainDiv = document.createElement('div');
    mainDiv.classList.add('info-section-display');
    for(var i=0; i<data.length; i++){
      var secondaryDiv = document.createElement('div');
      secondaryDiv.classList.add('displays')
      var display = document.createElement('h1');
      display.textContent = `Display: ${i + 1}`;
      secondaryDiv.appendChild(display);
      var name = document.createElement('h2');
      name.textContent = `Name: ${data[i].name}`;
      secondaryDiv.appendChild(name);
      var resolution = document.createElement('h2');
      resolution.textContent = `Resolution: ${data[i].bounds.height}x${data[i].bounds.width}`;
      secondaryDiv.appendChild(resolution);
      var id = document.createElement('h2');
      id.textContent = `Id: ${data[i].id}`;
      secondaryDiv.appendChild(id);
      mainDiv.appendChild(secondaryDiv);
    }
    displayInfo.appendChild(mainDiv)
}
infoObj.storage = data=>{
  var mainDiv = document.createElement('div');
  mainDiv.classList.add('info-section-storage');
  for(var i=0; i<data.length; i++){
    var secondaryDiv= document.createElement('div');
    secondaryDiv.classList.add('storages');
    var name = document.createElement('h1');
    name.textContent = `Storage ${i+1}`;
    secondaryDiv.appendChild(name);
    var cap = document.createElement('h2');
    cap.textContent = `Capacity: ${parseInt(data[i].capacity/(1000*1024*1024))} GB`;
    secondaryDiv.appendChild(cap);
    var id = document.createElement('h2');
    id.textContent= `Id: ${data[i].id}`;
    secondaryDiv.appendChild(id);
    mainDiv.appendChild(secondaryDiv);
  }
  storageInfo.appendChild(mainDiv);
}
chrome.runtime.sendMessage({request:"GetSystemStatus"}, res=>{
  infoObj.cpu(res.cpuInfo)
  infoObj.memory(res.memoryInfo);
  infoObj.display(res.displayInfo);
  infoObj.storage(res.storageInfo);
})

