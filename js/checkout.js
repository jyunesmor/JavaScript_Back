/* Local Storage data */
let localDataStorage = JSON.parse(localStorage.getItem("productos"));
console.log(localDataStorage);

let quantity;

function showCart(product) {
	let main_checkout = document.getElementById("main_checkout");

	product.forEach((p) => {
		quantity = p.quantity;
		let productCart = document.createElement("div");
		productCart.className = "product";
		productCart.innerHTML = `
      <img src="${p.imagen}">
      <p>$ ${p.precio}</p>
      <p>${p.nombre} ${p.marca}</p>
      <p>${p.capacidad}</p>
      <div class="quantity">
        <span id="minus" class="fa-solid fa-minus"></span>
        <p id="quantity">${quantity}</p>
        <span id="plus" class="fa-solid fa-plus"></span>            
      </div>
      <button class="addProduct" id="${p.id}"><i class="fa fa-trash" aria-hidden="true"></i></button>
  `;
		main_checkout.appendChild(productCart);
	});
	let minusButton = document.getElementById("minus");
	let plusButton = document.getElementById("plus");
	let quantityElement = document.getElementById("quantity");

	minusButton.addEventListener("click", () => {
		if (quantity > 1) {
			quantity--;
			quantityElement.textContent = quantity;
			product.quantity = quantity;
		}
	});

	plusButton.addEventListener("click", () => {
		quantity++;
		quantityElement.textContent = quantity;
		product.quantity = quantity;
	});
}

showCart(localDataStorage);
