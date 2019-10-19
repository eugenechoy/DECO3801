var ctx = document.getElementById('myChart').getContext('2d');
var count;
var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
        //x axis here, should be days.
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Peoples Interest',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            //y axis here, should be frequency of each day
            data: [0, 10, 5, 2, 20, 30, 45]
        }]
    },
    

    // Configuration options go here
    options: {}
});

