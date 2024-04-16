export async function POST({ request, params, url, cookies }) {
	const { license_key, device_id, hardware_id } = await request.json();

	const response = await fetch('http://49.13.51.162:3000/verify_license', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ license_key, device_id, hardware_id })
	});

	const { valid } = await response.json();

	if (valid) {
		return new Response(
			JSON.stringify({
				valid: true,
				message: 'Gültiger Lizenzschlüssel.'
			}),
			{
				status: 200
			}
		);
	} else {
		return new Response(
			JSON.stringify({
				valid: false,
				message: 'Ungültiger Lizenzschlüssel.'
			}),
			{
				status: 200
			}
		);
	}
}
