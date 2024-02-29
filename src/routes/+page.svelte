<script>
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import { chartData } from '$lib/ChartSettings.js';
	import { Toaster, toast } from 'svelte-sonner';

	let ctx;
	let myChart;
	let A = 200,
		B = 0,
		AB = 10,
		BA = 20;

	let A_Array = [A];
	let B_Array = [B];
	let AB_Array = [A * (AB / 100)];
	let BA_Array = [B * (BA / 100)];

	async function pullData() {
		const response = await fetch('/api/v1/dataCalc', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ A, B, AB, BA })
		});

		const data = await response.json();

		return data;
	}

	async function updateData() {
		toast('Chemie-Rechner - Kaufen', {
			description:
				'Gefällt Ihnen die gratis Version des Chemie-Rechners? Kaufen Sie die Vollversion!',
			duration: Number.POSITIVE_INFINITY,
			style: 'font-size: 30px;'
		});
		const data = await pullData();
		A_Array = data.A;
		AB_Array = data.AB;
		B_Array = data.B;
		BA_Array = data.BA;

		if (Chart.getChart('myChart')) {
			myChart.destroy();
		}

		myChart = new Chart(ctx, chartData(A_Array, B_Array));
	}

	onMount(async () => {
		updateData();
	});
</script>

<div class="container">
	<Toaster position="bottom-right" richColors closeButton />
	<h1 class="title">Chemie-Rechner | Free Version</h1>

	<div class="input-container">
		<form on:submit={updateData}>
			<div class="inputForm">
				<input
					name="message"
					min="0"
					max="10000"
					type="number"
					required
					placeholder=" "
					bind:value={A}
				/>
				<label for="country-selector" class="label">Bälle Anzahl A</label>

				<div class="underline"></div>
			</div>

			<div class="inputForm">
				<input
					name="message"
					min="0"
					max="10000"
					type="number"
					required
					placeholder=" "
					bind:value={B}
				/>
				<label for="country-selector" class="label">Bälle Anzahl B</label>

				<div class="underline"></div>
			</div>

			<div class="inputForm">
				<input
					name="message"
					min="0"
					max="10000"
					type="number"
					required
					placeholder=" "
					bind:value={AB}
				/>
				<label for="country-selector" class="label">Prozent AB</label>

				<div class="underline"></div>
			</div>

			<div class="inputForm">
				<input
					name="message"
					min="0"
					max="10000"
					type="number"
					required
					placeholder=" "
					bind:value={BA}
				/>
				<label for="country-selector" class="label">Prozent BA</label>

				<div class="underline"></div>
			</div>
			<button class="button" type="submit">Aktualisieren</button>
		</form>
	</div>

	<div class="table-container">
		<table class="table">
			<thead>
				<tr>
					<th>Zeit in Min</th>
					<th>A</th>
					<th>B</th>
					<th>AB</th>
					<th>BA</th>
				</tr>
			</thead>
			<tbody>
				{#each A_Array as value, index}
					<tr>
						<td>{index}</td>
						<td>{value}</td>
						<td>{B_Array[index]}</td>
						<td>{AB_Array[index]}</td>
						<td>{BA_Array[index]}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="chart-container">
		<canvas id="myChart" height="min-height" bind:this={ctx} />
	</div>
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 20px;
		padding: 20px;
		background-color: #f5f5f5;
	}

	.title {
		grid-column: span 2;
		text-align: center;
		color: #333;
	}

	.chart-container {
		grid-column: span 2;
	}

	.input-container {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.inputForm {
		position: relative;
		display: flex;
		flex-direction: column;
		padding: 0 15px;
		margin-bottom: 10px;
		align-items: center;
	}

	.inputForm input {
		align-items: center;
		width: 100%;
		justify-content: center;
		color: black;
		font-size: 18px;
		margin-top: 10px;
		padding: 10px;
		border: none;
		outline: none;
		transition: 0.5s;
		align-self: flex-end;
	}

	.inputForm input {
		align-items: center;
		width: 100%;
		justify-content: center;
		color: black;
		font-size: 18px;
		margin-top: 10px;
		padding: 10px;
		border: none;
		outline: none;
		transition: 0.5s;
		align-self: flex-end;
	}

	.underline {
		position: absolute;
		bottom: 0;
		width: 97%;
		height: 2px;
	}

	.underline:before {
		position: absolute;
		background: #06e9e9;
		content: '';
		height: 2px;
		width: 100%;
		left: -10px;
		transition: transform 0.3s ease;
		transform: scaleX(0);
		transform-origin: center;
	}

	input:focus ~ .underline:before,
	input:valid ~ .underline:before {
		transform: scale(1);
	}

	input:invalid:placeholder-shown ~ .underline:before {
		transform: scale(1);
		background: #cccfcf;
	}

	label {
		position: absolute;
		pointer-events: none;
		bottom: 10px;
		left: 5px;
		font-size: 16px;
		transition: all 0.3s ease;
		display: inline-block;
	}

	input:valid ~ label,
	input:focus ~ label {
		transform: translateY(-25px);
		font-size: 14px;
		color: #06e9e9;
	}

	.button {
		width: 200px;
		padding: 10px;
		color: white;
		font-size: 20px;
		background: linear-gradient(to right, #ff966d, #fa538d, #89379c);
		border: none;
		border-radius: 25px;
		cursor: pointer;
		margin-top: 10px;
		transition: 0.5s;
	}

	.button:hover {
		scale: 1.05;
		animation: authButtonHover 0.5s ease-in-out;
		animation-fill-mode: forwards;
	}

	@keyframes authButtonHover {
		from {
			box-shadow: 0 0 1px 1px #f37c81ba;
		}
		to {
			box-shadow: 0 0 5px 5px #f37c82ba;
		}
	}

	input::placeholder {
		color: transparent;
	}

	.table {
		width: 100%;
		border-collapse: collapse;
	}

	.table th,
	.table td {
		padding: 8px;
		border: 1px solid #ddd;
		text-align: center;
	}

	.table th {
		background-color: #f2f2f2;
	}

	@media (max-width: 1400px) {
		.input-container {
			grid-column: span 2;
		}

		.table-container {
			grid-column: span 2;
		}
	}
</style>
