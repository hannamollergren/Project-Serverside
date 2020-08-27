window.addEventListener('load', async () => {
	let container = document.querySelector('.container')
	let input = '';
	let inputModel = document.querySelector('#inputModel');
	let inputYear = document.querySelector('#inputYear');
	let inputPrice = document.querySelector('#inputPrice');
	let inputIsSail = document.querySelectorAll('input[name="is_sail"]');
	let inputHasMotor = document.querySelectorAll('input[name="has_motor"]');
	let btnAddBoat = document.querySelector('.btn-addboat');

	// change händelse - sätter värdet i en variabel. 
	




	btnAddBoat.addEventListener('click', async () => {
		console.log('btnAddboat click')

		for (var i = 0, length = inputIsSail.length; i < length; i++) {
    		if (inputIsSail[i].checked) {
        	break;
   			}
		}

		for (var j = 0, length = inputHasMotor.length; j < length; j++) {
    		if (inputHasMotor[j].checked) {
        	break;
   			}
		}

		console.log('is sail: ', inputIsSail[i].value)
		input = {
			id: '',
			model: inputModel.value,
			year: Number(inputYear.value), // omvandlar inputvärdet till number
			price: Number(inputPrice.value),
			is_sail: inputIsSail[i].value,
			has_motor: inputHasMotor[j].value,
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
		
		// gör en ny get request - hämta alla båtar(lägg get request i funktion anropa här)?
	})

	// Lägg i en funktion
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