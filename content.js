var chart = document.querySelector("#chart")
var cnt = 0;
var initial = true;
setInterval(()=>{
  
    chrome.runtime.sendMessage({ greeting: "hello" }, (res) => {
      var Y = (res.capacity - res.availableCapacity) / res.capacity*100
      if (initial) {

      Plotly.plot("chart", [{
        y: [Y],
        type: 'line',
        title:"Usage %",
        line:{
          color:'#4285f4',
          width:3
        }
      }])
        initial = false;
    }else{

        Plotly.extendTraces(chart, { y: [[Y]] }, [0])
        cnt++
        if (cnt > 60) {
          Plotly.relayout(chart, {
            xaxis: {
              title:"second",
              range: [cnt - 60, cnt]
            }
          })
        }
    }
    
    })
  }, 1000);








