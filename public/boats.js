window.addEventListener('load', async () => {
	let container = document.querySelector('.container')
	let input = '';
	let inputModel = document.querySelector('#inputModel');
	let inputYear = document.querySelector('#inputYear');
	let inputPrice = document.querySelector('#inputPrice');
	let inputIsSail = document.querySelector('#inputIsSail');
	let inputHasMotor = document.querySelector('#inputHasMotor');
	let btnAddBoat = document.querySelector('.btn-addboat');
	

	btnAddBoat.addEventListener('click', async () => {
		console.log('btnAddboat click')
		input = {
			id: '',
			model: inputModel.value,
			year: inputYear.value,
			price: inputPrice.value,
			is_sail: inputIsSail.value,
			has_motor: inputHasMotor.value,
			image: ''
		}
		console.log('input båt', input)

		

		const response = await fetch('/boat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        });
        const text = await response.text();
        console.log(text);
	})



	const response = await fetch('/boats', { method: 'GET' });
	const object = await response.json();  

	console.log('Fetch returned:', object);

	object.forEach(boat => {
	let li = document.createElement('li') 
	li.innerHTML = `<span>${boat.model}</span><br>${boat.year}<br>$${boat.price}<br><br>Product information<br>Is sail: ${boat.is_sail}<br>Has motor: ${boat.has_motor}`
	li.setAttribute("id", "productList");
	container.appendChild(li)
	}) 

}); // load