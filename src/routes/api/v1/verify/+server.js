export async function POST({ request, params, url, cookies }) {
	const { license_key, device_id, hardware_id } = await request.json();

	const response = await fetch('http://49.13.51.162:3000/verify_license', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ license_key, device_id, hardware_id })
	});

	if (response.status == 200) {
		return new Response(
			JSON.stringify({
				worked: true
			}),
			{
				status: 200
			}
		);
	}
}
