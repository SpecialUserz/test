export async function POST({ request, params, url, cookies }) {
	try {
		const { A, B, AB, BA } = await request.json();

		if (A > 10000 || B > 10000 || AB > 10000 || BA > 10000) {
			return new Response(JSON.stringify({ message: 'Error' }), {
				status: 500
			});
		}

		let A_Array = [A];
		let B_Array = [B];
		let AB_Array = [A * (AB / 100)];
		let BA_Array = [B * (BA / 100)];

		for (let i = 1; AB_Array[i - 1] != BA_Array[i - 1] && i < 10000; i++) {
			A_Array[i] = Math.round(A_Array[i - 1] - AB_Array[i - 1] + BA_Array[i - 1]);
			B_Array[i] = Math.round(B_Array[i - 1] + AB_Array[i - 1] - BA_Array[i - 1]);
			AB_Array[i] = Math.round(A_Array[i] * (AB / 100));
			BA_Array[i] = Math.round(B_Array[i] * (BA / 100));
		}

		return new Response(JSON.stringify({ A: A_Array, AB: AB_Array, B: B_Array, BA: BA_Array }), {
			status: 200
		});
	} catch (err) {
		return new Response(JSON.stringify({ message: 'Error' }), {
			status: 500
		});
	}
}
