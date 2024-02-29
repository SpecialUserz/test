export const chartData = (A_Array, B_Array) => ({
	type: 'line',
	data: {
		labels: A_Array.map((x, i) => i),
		datasets: [
			{
				label: 'Bälle A',
				data: A_Array,
				pointRadius: 8,
				pointHoverRadius: 15,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
				]
			},
			{
				label: 'Bälle B',
				data: B_Array,
				pointRadius: 8,
				pointHoverRadius: 15,
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)'
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)'
				]
			}
		]
	},
	options: {
		responsive: true,
		scales: {
			y: {
				beginAtZero: true,
				title: {
					display: true,
					text: 'Anzahl Bälle',
					color: '#051937',
					font: {
						size: 16,
						weight: 'bold'
					}
				}
			},
			x: {
				title: {
					display: true,
					text: 'Zeit in min',
					color: '#051937',
					font: {
						size: 16,
						weight: 'bold'
					}
				}
			}
		},
		plugins: {
			legend: {
				position: 'top'
			},
			title: {
				display: true,
				text: 'Bälle - Punktdiagram'
			}
		}
	}
});
