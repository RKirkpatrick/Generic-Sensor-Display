/* eslint-disable */

// turn into class structure long term so you can just call methods(functions) on these setting long term
//  !!!!!!!!!!!!!!!! 
// Need to use classes so revenue and data can be used at the same time on same page
// !!!!!!!!!!!!!!!!!!!!!
///////////////////////////////////////////////////////////////////////////////////////////////////////////

class revenue_graph
{
    constructor()
    {
        this.moneyData = []; // amount occupied array
        this.data_amount = 5; // the latest x amount of points
        this.moneyTime =[]; // time stamp
        this.moneyReadTime = []; // human readable timestamp
        this.graph_type = "area"; // line, area, or scatter
        this.organization = "PSU"; // specific data set for grabbing
        this.data_level ="Revenue"; // first level after oragnization (takes place of park-structure)
        this.data_level2 = "money"; // second level in database to grab from takes place of floor
        this.temp = null;
            console.log("ORG:"+ this.organization);
            console.log("data_level: " + this.data_level);
            console.log("data_level2: " + this.data_level2);
    }
    
   async getRev(test) 
    {
        var i =0;
//        console.log("made it in getData in rev");
//        console.log("ORG:"+ this.organization);
//            console.log("data_level: " + this.data_level);
//            console.log("data_level2: " + this.data_level2);
             //var test = this;
             // console.log("Test var: " + test.data_amount);
        firebase.auth().onAuthStateChanged(function(user) {
    // var scope issue with vars after this ^^^^^^ 
           
        if(user) {
            //console.log("made it in user if");
             console.log("Test var: " + test.data_amount);
         database.collection(test.organization).doc(test.data_level).collection(test.data_level2).orderBy("Time","desc").limit(test.data_amount).get().then(async function(querySnapshot) {
                querySnapshot.forEach(async function(doc)
                {
                   console.log(doc.data()["amount"]);
                    test.moneyData.push(doc.data()["amount"]);
                   var temp2 =  doc.data()["time"].toDate();
                   // Testing output below
                
                   console.log(temp2.getTime());
                   console.log(temp2);
                   console.log(test.moneyTime[i]);
                
                   test.moneyReadTime.push(temp2);
                  test.moneyTime.push(temp2.getTime());
                  if(i >= (test.data_amount-1))
                  {
                    await test.temp.render(); /// got to figure out temp scope/ order we need to render
                  }
                    //location.reload();
                    //  console.log(doc.data()["Time"].toDate());
                    i++;

                });
            }).catch(function(error) {
                alert("Error getting documents: " + error);
            });
        }else{
            signOut();
        }
    });
    generatemoneyData(test);
}


}

// async function  
// add function below into class above and modify vars to fit
async function generatemoneyData(myChart){
//     var temp;
console.log("made it in generatemoneyData");
  var options = {
      chart: {
          height: 400,
          type: myChart.graph_type,
      },
      dataLabels: {
          enabled: false
      },
      stroke: {
          curve: 'smooth',
      },
      series: [{
          name: 'Revenue',
          data:  await myChart.moneyData,
          //await
      }],
      xaxis: {
          type: 'datetime',
          categories: myChart.moneyTime,
      },
      /*
      yaxis: {
          labels: {
            style: {
              color: 'black'
            }
          }
      },*/
      tooltip: {
          x: {
              format: 'dd/MM/yy HH:mm'
          }
      },
      title: {
          text: "Revenue Overtime",
          style: {
              color: "black"
          }
      },
  }
    var chart = new ApexCharts(document.querySelector("#chartprediction"),await options);
    myChart.temp = chart;
    //chart.render();

//    await myChart.temp.render(); /// got to figure out temp scope/ order we need to render
                 

}
// Testing outputs below

//console.log("Occupancy data",occupancyData);
//console.log("occupancyTime", occupancyTime);
//console.log("occupancy read time",occupanceReadTime)
//console.log(options.series);
async function test_graph()
{
    var myChart = new revenue_graph;
    console.log("TEST MYCHART:" + myChart.organization)
    await myChart.getRev(myChart);
}