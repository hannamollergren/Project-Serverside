window.addEventListener('load', async () => {
	let container = document.querySelector('.container')

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