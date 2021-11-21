
//Grapphique en bar
var ctx = document.getElementById('chartBar');
var numFemale = ctx.dataset.female;
var numMale = ctx.dataset.male;

var chartBar = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ["Femmes", "Hommes"],
        datasets: [{
            label: "",
            data: [numFemale , numMale ],
            backgroundColor: [
                '#FDA7DF', '#0652DD' 
            ],            
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
    }
});

//Grapphique en doughnut
var ctx = document.getElementById("doughnut");
var read = ctx.dataset.read;
var unread = ctx.dataset.unread;

var doughnut = new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: ["Messages Lus", "Messages Non Lus"],
        datasets: [{
            label: "",
            data: [read , unread],
            backgroundColor: [
                '#A3CB38', '#EA2027' 
            ], 
            hoverOffset: 4           
        }]
    },
    
});

//Grapphique en pie
var ctx = document.getElementById("chartpie");
var expedier = ctx.dataset.expedier;
var nonExpedier = ctx.dataset.nonExpedier;

var chartpie = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ["Commandes expédiées", "Commandes non expédiées"],
        datasets: [{
            label: "",
            data: [read , unread],
            backgroundColor: [
                '#006266', '#F79F1F' 
            ], 
            hoverOffset: 4           
        }]
    },
    
});

//Grapphique en line
var ctx = document.getElementById('linechart');

var data = JSON.parse(ctx.dataset.chartviz)

var userCountByMonthLabels = []
var userCountByMonthDataResults = []

for(var i=0;i<data.length;i++){
  var date = new Date((data[i]._id.year), (data[i]._id.month - 1), 1)
  var month = date.toLocaleString('default', {month: 'long'})
  userCountByMonthLabels.push(month)
  userCountByMonthDataResults.push(data[i].CA)
}

var linechart = new Chart(ctx, {
  type: 'line',
  data: {
      labels: [userCountByMonthLabels],
      datasets: [{
          data: [userCountByMonthDataResults],
          backgroundColor: '#f8c291',
          borderColor: '#e55039'
      }]
  },
  options: {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true
              }
          }]
      },
      legend: {
          display: false,
      }
  }
});
