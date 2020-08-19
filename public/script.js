window.addEventListener('load', () => {
	let buttonGetBoats = document.querySelector('#btn-allboats');
	let productList = document.querySelector('#product-list')

	buttonGetBoats.addEventListener('click', async () => {

		console.log('Click works, buttonGetBoats')


		const response = await fetch('/boats', { method: 'GET' });
        const object = await response.json();  // motsvarar JSON.parse

		console.log('Fetch returned:', object);
		// 1 byt url till /boats/
		// 2 hämta data

       /*  object.forEach(boat => {
			let ul = document.createElement('ul') 
			il.setAttribute("id", "productList");

			  
            let li = document.createElement('li');
			li.innerHTML = `Model: ${boat.model}<br>Year: ${boat.year}<br>`
            productList.appendChild(li)
        }) */
	})
})