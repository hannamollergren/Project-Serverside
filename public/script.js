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
		getBoats();
	})

	// ADD BOAT
	btnAddBoat.addEventListener('click', async () => {

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
		getBoats();
	})

	// TILLBAKA KNAPP
	btnBack.addEventListener('click', async () => {
		fromProductToBoats();
	})

	// SEARCH
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
			
			let img = document.createElement('img'); 
			img.src = boat.image;
			
			if(boat.image === '')
			{
				img.src = 'https://icon-library.com/images/no-photo-available-icon/no-photo-available-icon-4.jpg';
			}
           
			li.appendChild(img)
			container.appendChild(li)
		})

	})

	// RESET
	btnReset.addEventListener('click', async () => {
		console.log('reset click')

		// POST REQUEST
		const response = await fetch('/reset', {
			method: 'POST',
            headers: {
				'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
		const text = await response.json();
		console.log('reset text', text)
		getBoats();

	})

	
	// GETBOATS 
	async function getBoats(){
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
					getBoats();
					fromProductToBoats();

					// DELETE REQUEST
					const response = await fetch('/boat/' + boat._id, { method: 'DELETE' });
					const object = await response.json(); 
				})
				
				productInfo.appendChild(li);
				productInfo.appendChild(btnDelete)
			})
		}) 
	}

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

	// DATA
	let data = [{
		model: 'Marin',
		year: 2010,
		price: 13400,
		is_sail: 'Yes',
		has_motor: 'No',
		image: "https://d196r9c7cfkkpm.cloudfront.net/fotos/medium/337263-2717bda19872fe230cd4e4f9c9f99a1d.jpg"
	},
	{
		model: 'Aquador',
		year: 2014,
		price: 1888800,
		is_sail: 'Yes',
		has_motor: 'No',
		image: "https://api.boatvertizer.com/fotos/catalog/245097-1-large.jpg"
	},
	{
		model: 'Nimbus',
		year: 2099,
		price: 14000,
		is_sail: 'No',
		has_motor: 'Yes',
		image: "https://d196r9c7cfkkpm.cloudfront.net/fotos/medium/440872-c5e75c1311fa4908ce1056c37beec743.jpg"
	},
	{
		model: 'Black Pearl',
		year: 1890,
		price: 18000,
		is_sail: 'Yes',
		has_motor: 'No',
		image: "https://www.hoom.se/wp-content/uploads/2019/07/Black_Pearl_01.jpg"
	},
	{	
		model: 'Buster',
		year: 1990,
		price: 155550,
		is_sail: 'Yes',
		has_motor: 'No',
		image: "https://d196r9c7cfkkpm.cloudfront.net/fotos/medium/427900-502b6339d8d00547c22ccaf3432a81bc.jpg"
	},
	{
		model: 'Buster X1880',
		year: 2020,
		price: 230000,
		is_sail: 'No',
		has_motor: 'Yes',
		image: "https://d196r9c7cfkkpm.cloudfront.net/fotos/medium/104379-3dfc6ef6504fcdbf643627adc5f864eb.jpg"
	},
	{
		model: 'Sea Ray',
		year: 2020,
		price: 1000000,
		is_sail: 'No',
		has_motor: 'Yes',
		image: "https://d196r9c7cfkkpm.cloudfront.net/fotos/medium/437250-25617c8d36dc0120972e096b0a03f632.jpg"
	},
	{
		model: 'Princess',
		year: 2022,
		price: 17888999,
		is_sail: 'Yes',
		has_motor: 'No',
		image: "https://d196r9c7cfkkpm.cloudfront.net/fotos/medium/447636-6a095b381441190a16ffb28416c42ce3.jpg"
	},
	{
		model: 'X900S',
		year: 1986,
		price: 300000,
		is_sail: 'No',
		has_motor: 'Yes',
		image: "https://d196r9c7cfkkpm.cloudfront.net/fotos/medium/412275-0d344d7620436610e6e714ac0beeb524.jpg"
	},
	{
		model: 'EOS ',
		year: 1997,
		price: 296600,
		is_sail: 'Yes',
		has_motor: 'No',
		image: "https://d196r9c7cfkkpm.cloudfront.net/fotos/medium/396956-e6c900df061f51f07bc16803ec819cda.jpg"
	},
	{
		model: 'Nimbus',
		year: 1999,
		price: 456600,
		is_sail: 'No',
		has_motor: 'Yes',
		image: "https://d196r9c7cfkkpm.cloudfront.net/fotos/medium/446693-7799cea42346b56bb20f85cce2cd92ac.jpg"
	},
	{
		model: 'Star craft',
		year: 2015,
		price: 123456,
		is_sail: 'No',
		has_motor: 'Yes',
		image: "https://d196r9c7cfkkpm.cloudfront.net/fotos/medium/446109-a3a0c4f1245aa44fd87aec129a284402.jpg"
	},
	{
		model: 'Maltese Falcon',
		year: 2019,
		price: 19000,
		is_sail: 'Yes',
		has_motor: 'No',
		image: "https://image.yachtcharterfleet.com/charter-MALTESE-FALCON/MALTESE-FALCON-1.jpg?image_id=600282&k=5dac&w=987&h=477&q=95&o=wc"
	},
	{
		model: 'Yamaha',
		year: 1996,
		price: 160000,
		is_sail: 'No',
		has_motor: 'Yes',
		image: "https://cdn2.yamaha-motor.eu/prod/product-assets/2018/FMT8/2018-Yamaha-FMT8-EU-NA-Action-002-02.jpg"
	},
	{
		model: 'EOS 3000 ',
		year: 1995,
		price: 17600,
		is_sail: 'Yes',
		has_motor: 'No',
		image: "https://najad.se/wp-content/uploads/2018/01/009a4400_2000x1269-1702x1080.jpg"
	},
	{	
		model: 'RMS Titanic ',
		year: 1912,
		price: 290000,
		is_sail: 'No',
		has_motor: 'Yes',
		image: "https://i.ytimg.com/vi/pzu_KXTLS7I/maxresdefault.jpg"
	},
	{
		model: 'HMS Beagle',
		year: 1820,
		price: 1450000,
		is_sail: 'Yes',
		has_motor: 'No',
		image: "https://upload.wikimedia.org/wikipedia/commons/5/54/HMSBeagle.jpg"
	},
	{
		model: 'USS Arizona',
		year: 1915,
		price: 1890000,
		is_sail: 'No',
		has_motor: 'Yes',
		image: "https://1.bp.blogspot.com/-HZkdhufqKK8/VT_vPzV3URI/AAAAAAAAD8Y/Cud-97NVQZ4/s1600/arizona.jpg"
	},
	{
		model: 'Princess',
		year: 2021,
		price: 3900000,
		is_sail: 'No',
		has_motor: 'Yes',
		image: "https://princessyachts.se/wp-content/uploads/2020/07/Princess-S66_on-the-Swedish-west-coast_by-Princess-Yachts-West-Sweden-103.jpg"
	},
	{
		model: 'Sea Ray',
		year: 2013,
		price: 1780000,
		is_sail: 'No',
		has_motor: 'Yes',
		image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/07/a6/fa/a1.jpg"
	},
	{
		model: 'Humber 40',
		year: 1989,
		price: 1100000,
		is_sail: 'No',
		has_motor: 'Yes',
		image: "https://www.humberribs.co.uk/images/feature5.jpg"
	}];
	
}); // load