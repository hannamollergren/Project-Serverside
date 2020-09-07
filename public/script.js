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
	let imgURL = document.querySelectorAll('#imgURL');
	let btnAddBoat = document.querySelector('.btn-addboat');
	let btnGetBoats = document.querySelector('.btn-getBoats');
	let btnBack = document.querySelector('.btn-back')
	let inputSearch = document.querySelector('#inputSearch')
	let searchCategory = document.querySelector('#categories'); 
	let btnSearch = document.querySelector('#btn-search');
	let btnReset = document.querySelector('#btn-reset')

	
	// GET BOATS
	
	btnGetBoats.addEventListener('click', async () => {
		displayBoats();
		// ANROPA GETBOATS FUNC

		// LÄGG I FUNKTION getBoats
		const response = await fetch('/boats', { method: 'GET' });
		const object = await response.json();  
		container.innerHTML = ""; 

		object.forEach(boat => {
			let li = document.createElement('li') 
			li.innerHTML = `<span>${boat.model}</span><br>${boat.year}<br>$${boat.price}<br><br>Product information<br>Is sail: ${boat.is_sail}<br>Has motor: ${boat.has_motor}`
			li.setAttribute("class", "productList");

			let img = document.createElement('img'); 
			img.src = boat.image;
			
			if(boat.image === '')
			{
				img.src = 'https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-4.jpg';
			}
           
			li.appendChild(img)
			container.appendChild(li)

			// GET BOAT
			li.addEventListener('click', async () => {
				displayProductInfo()
				
				
				const response = await fetch('/boat/' + boat._id, { method: 'GET' });
				const object = await response.text(); 

				let li = document.createElement('li') 

				li.innerHTML = `<span>${boat.model}</span><br>${boat.year}<br>$${boat.price}<br><br>Product information<br>Is sail: ${boat.is_sail}<br>Has motor: ${boat.has_motor}<br><br>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minus, quibusdam soluta labore consectetur architecto omnis delectus aspernatur atque minima doloremque, molestiae eveniet animi totam quae incidunt iusto adipisci ex.`

				// DELETE BOAT
				let btnDelete = document.createElement('button')
				btnDelete.setAttribute("class", "deleteButton");
				btnDelete.innerHTML = 'Delete';
				btnDelete.addEventListener('click', async () => {
					// ANROPA GETBOATS

					fromProductToBoats();

					// DELETE REQUEST
					const response = await fetch('/boat/' + boat._id, { method: 'DELETE' });
					const object = await response.json(); 
				})
				
				productInfo.appendChild(li);
				productInfo.appendChild(btnDelete)
			})
		}) // 
	})

	/* async function getBoats(){
		const response = await fetch('/boats', { method: 'GET' });
		const object = await response.json();  
		container.innerHTML = ""; 

		object.forEach(boat => {
			let li = document.createElement('li') 
			li.innerHTML = `<span>${boat.model}</span><br>${boat.year}<br>$${boat.price}<br><br>Product information<br>Is sail: ${boat.is_sail}<br>Has motor: ${boat.has_motor}`
			li.setAttribute("class", "productList");

			let img = document.createElement('img'); 
			img.src = boat.image;
			
			if(boat.image === '')
			{
				img.src = 'https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-4.jpg';
			}
           
			li.appendChild(img)
			container.appendChild(li)

			// GET BOAT
			li.addEventListener('click', async () => {
				displayProductInfo()
				
				
				const response = await fetch('/boat/' + boat._id, { method: 'GET' });
				const object = await response.text(); 

				let li = document.createElement('li') 

				li.innerHTML = `<span>${boat.model}</span><br>${boat.year}<br>$${boat.price}<br><br>Product information<br>Is sail: ${boat.is_sail}<br>Has motor: ${boat.has_motor}<br><br>Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minus, quibusdam soluta labore consectetur architecto omnis delectus aspernatur atque minima doloremque, molestiae eveniet animi totam quae incidunt iusto adipisci ex.`

				// DELETE BOAT
				let btnDelete = document.createElement('button')
				btnDelete.setAttribute("class", "deleteButton");
				btnDelete.innerHTML = 'Delete';
				btnDelete.addEventListener('click', async () => {
					// ANROPA GETBOATS

					fromProductToBoats();

					// DELETE REQUEST
					const response = await fetch('/boat/' + boat._id, { method: 'DELETE' });
					const object = await response.json(); 
				})
				
				productInfo.appendChild(li);
				productInfo.appendChild(btnDelete)
			})
		}) // 
	} */

	// ADD BOAT
	btnAddBoat.addEventListener('click', async () => {

		// ANROPA GETBOATS

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
			image: imgURL[0].value
		}
		message.innerHTML = 'Boat added successfully!';
		
		const response = await fetch('/boat?', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        });
        const text = await response.text();
	})

	// TILLBAKA KNAPP
	btnBack.addEventListener('click', async () => {
		fromProductToBoats();
	})

	// SEARCH
	// MÅSTE FIXA ATT DEN TAR BÅDA SMÅ OCH STORA BOKSTÄVER 
	btnSearch.addEventListener('click', async () => {
		let search = '';
		let query = '';
		
		if (searchCategory.value === 'maxprice'){
			query = 'maxprice';
		}
		else if (searchCategory.value === 'madebefore'){
			query = 'madebefore';
		}
		else if (searchCategory.value === 'madeafter'){
			query = 'madeafter';
		}
		else{
			query = 'word';
		}
		
		search = inputSearch.value;
		
		// GET REQUEST
		const response = await fetch('/search?' + query + '=' + search, { method: 'GET' }); 
		const object = await response.json(); 
		container.innerHTML = '';
		object.forEach(boat => {
			let li = document.createElement('li') 
			li.innerHTML = `<span>${boat.model}</span><br>${boat.year}<br>$${boat.price}<br><br>Product information<br>Is sail: ${boat.is_sail}<br>Has motor: ${boat.has_motor}`
			li.setAttribute("class", "productList");
			container.appendChild(li)
		})

	})

	// RESET
	btnReset.addEventListener('click', async () => {
		console.log('reset click')

		// POST REQUEST
		/* const response = await fetch('/boat?', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const text = await response.text(); */

	})

	// DATA


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
	function fromProductToBoats() {
		if(productInfo === 'none'){
			productInfo.style.display = 'block';
			boatsContainer.style.display = "none";
		}
		else{
			productInfo.style.display = "none";
			boatsContainer.style.display = "block";
		}
	}



}); // load