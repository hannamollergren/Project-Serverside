window.addEventListener('load', async () => {
	let container = document.querySelector('.container')
	let startpageContainer = document.querySelector('.startpage-container');
	let boatsContainer = document.querySelector('.boats-container');
	let productItem = document.querySelector('.productList')
	let productInfo = document.querySelector('.product-container');
	let input = '';
	let message = document.querySelector('.message');
	let inputModel = document.querySelector('#inputModel');
	let inputYear = document.querySelector('#inputYear');
	let inputPrice = document.querySelector('#inputPrice');
	let inputIsSail = document.querySelectorAll('input[name="is_sail"]');
	let inputHasMotor = document.querySelectorAll('input[name="has_motor"]');
	let btnAddBoat = document.querySelector('.btn-addboat');
	let btnGetBoats = document.querySelector('.btn-getBoats');
	let btnBack = document.querySelector('.btn-back')

	// DISPLAY
	function displayBoats() {
		if(startpageContainer === "none"){
			startpageContainer.style.display = "block";
			boatsContainer.style.display = "none";
		}
		else{
			startpageContainer.style.display = "none";
			boatsContainer.style.display = "block";
		}
		
	}
	function displayProductInfo() {
		if(boatsContainer === 'none'){
			boatsContainer.style.display = "block";
			productInfo.style.display = 'none';
		}
		else{
			boatsContainer.style.display = "none";
			productInfo.style.display = "block";
		}
	}
	
	// GET BOATS
	btnGetBoats.addEventListener('click', async () => {
	
		displayBoats();
	

		console.log('Click hämta båtar')
		const response = await fetch('/boats', { method: 'GET' });
		const object = await response.json();  

		console.log('Fetch All boats returned:', object);

		container.innerHTML = ""; // Tömmer sidan på båtobjekt när man trycker på knappen igen
		object.forEach(boat => {
			let li = document.createElement('li') 
			li.innerHTML = `<span>${boat.model}</span><br>${boat.year}<br>$${boat.price}<br><br>Product information<br>Is sail: ${boat.is_sail}<br>Has motor: ${boat.has_motor}`
			li.setAttribute("class", "productList");
		
			container.appendChild(li)

			// GET BOAT
			li.addEventListener('click', async () => {
				displayProductInfo()
				
				const response = await fetch('/boat?id=' + boat._id, { method: 'GET' });
				console.log('get boat request response', response)
				const object = await response.text(); 
				console.log('Fetch Get boat returned', object)

				let li = document.createElement('li') 

				li.innerHTML = `<span>${boat.model}</span><br>${boat.year}<br>$${boat.price}<br><br>Product information<br>Is sail: ${boat.is_sail}<br>Has motor: ${boat.has_motor}<br><br>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minus, quibusdam soluta labore consectetur architecto omnis delectus aspernatur atque minima doloremque, molestiae eveniet animi totam quae incidunt iusto adipisci ex.`
				
				productInfo.appendChild(li);


				// delete knapp
				// edit knapp - x.contentEditable="true"; 
				

			})
		}) 
	})
	
	// ADD BOAT
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

		input = {
			model: inputModel.value,
			year: Number(inputYear.value), 
			price: Number(inputPrice.value),
			is_sail: inputIsSail[i].value,
			has_motor: inputHasMotor[j].value,
			image: ''
		}
		console.log('input båt', input)
		message.innerHTML = 'Boat added successfully!';

		
		const response = await fetch('/boat?', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        });
        const text = await response.text();
		console.log(text);
	})

		// TILLBAKA KNAPP
		btnBack.addEventListener('click', async => {
			if(productInfo === 'none'){
				productInfo.style.display = 'block';
				boatsContainer.style.display = "none";
			}
			else{
				productInfo.style.display = "none";
				boatsContainer.style.display = "block";
			}
		})

	

}); // load