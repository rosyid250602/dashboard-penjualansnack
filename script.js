// Fetch data from the JSON file
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        // Prepare data for Line Chart
        const months = data.map(item => item.month);
        const pedasData = data.map(item => item.Pedas);
        const asinData = data.map(item => item.Asin);
        const manisData = data.map(item => item.Manis);

        const lineChartData = {
            labels: months,
            datasets: [
                {
                    label: 'Pedas',
                    data: pedasData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Asin',
                    data: asinData,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Manis',
                    data: manisData,
                    backgroundColor: 'rgba(255, 159, 64, 0.2)',
                    borderColor: 'rgba(255, 159, 64, 1)',
                    borderWidth: 1
                }
            ]
        };

        // Line Chart
        const ctxLine = document.getElementById('salesLineChart').getContext('2d');
        const salesLineChart = new Chart(ctxLine, {
            type: 'line',
            data: lineChartData,
            options: {
                scales: {
                    y: { beginAtZero: true }
                }
            }
        });

        // Prepare data for Pie Chart
        const pieChartData = {
            labels: ['Pedas', 'Asin', 'Manis'],
            datasets: [{
                data: [
                    pedasData.reduce((a, b) => a + b, 0),
                    asinData.reduce((a, b) => a + b, 0),
                    manisData.reduce((a, b) => a + b, 0)
                ],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 159, 64, 0.2)']
            }]
        };

        // Pie Chart
        const ctxPie = document.getElementById('salesPieChart').getContext('2d');
        const salesPieChart = new Chart(ctxPie, {
            type: 'pie',
            data: pieChartData
        });
    })
    .catch(error => console.log('Error fetching the data:', error));
