if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition(ShowLocation);
}

const date = new Date();
const monthText = [
	"Enero",
	"Febrero",
	"Marzo",
	"Abril",
	"Mayo",
	"Junio",
	"Julio",
	"Agosto",
	"Septiembre",
	"Octubre",
	"Noviembre",
	"Diciembre",
];

function convertMonth(monthNumber) {
	return monthText.filter((month, i) => i === monthNumber);
}

async function ShowLocation(position) {
	let response = await fetch(
		`https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
	);
	let data = await response.json();
	document.getElementById("place").innerHTML = ` Ciudad de ${
		data.address.city
	}, ${date.getDate()} de ${convertMonth(
		date.getMonth()
	)} del ${date.getFullYear()} `;
}

let dateFooter = document.getElementById("date");
setInterval(function () {
	var data = new Date();
	dateFooter.innerHTML = data.toLocaleTimeString();
}, 1000);

/* API Json */

const productosJson = await axios.get("../Json/productos.json");

/* Local Storage data */
let localDataStorage = JSON.parse(localStorage.getItem("productos"));
console.log(localDataStorage);

/* Variables */
let product = [];
let products = [];
let cartProducts = [];
let quantity = 0;

/* DOM */
let showBtn = document.querySelectorAll(".btn_show");
let addBtn = document.querySelectorAll(".addProduct");

/* Functions */

function showProducts(products) {
	let images = document.getElementById("images");
	Object.entries(products.data).forEach(([key, producto]) => {
		const img = document.createElement("img");
		img.src = producto.imagen;
		images.appendChild(img);
	});
}

showProducts(productosJson);

function filterProduct(productsArray, search) {
	return productsArray.filter((p) => p.nombre.toUpperCase().includes(search));
}

function showProductFiltered(products) {
	const images_result = document.getElementById("show_products");
	images_result.innerHTML = "";
	products.forEach((p) => {
		const column = document.createElement("div");
		column.className = "column";
		column.innerHTML = `
			<img src="${p.imagen}">
			<p>$ ${p.precio}</p>
			<p>${p.nombre} ${p.marca}</p>
	    <p>${p.capacidad}</p>
			<button class="btn_show" id="${p.id}">Ver Producto</button>
		`;
		images_result.appendChild(column);
	});
	btnShowProducts(products);
}

function showProduct(product) {
	document.getElementById("show_products").style.display = "none";
	const images_result = document.getElementById("show_product");
	images_result.innerHTML = "";
	const productContainer = document.createElement("div");
	productContainer.classList.add("containerProduct");
	const columnRight = document.createElement("div");
	const columnLeft = document.createElement("div");
	columnRight.classList.add("columnRigth");
	columnLeft.classList.add("columnLeft");
	columnRight.innerHTML = `
			<img src="${product.imagen}">
		`;
	columnLeft.innerHTML = `
			<p>$ ${product.precio}</p>
			<p>${product.nombre} ${product.marca}</p>
	    <p>${product.capacidad}</p>
    <div class="quantity">
      <span id="minus" class="fa-solid fa-minus"></span>
      <p id="quantity">${quantity}</p>
      <span id="plus" class="fa-solid fa-plus"></span>            
    </div>
			<button class="addProduct" id="${product.id}">Agregar a Carrito</button>
		`;
	productContainer.appendChild(columnRight);
	productContainer.appendChild(columnLeft);
	images_result.appendChild(productContainer);

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

	btnAddProduct(product);
}

function addCart(product) {
	if (localDataStorage) {
		localDataStorage.push(product);
		localStorage.setItem("productos", JSON.stringify(localDataStorage));
	} else {
		localStorage.setItem("productos", JSON.stringify(cartProducts));
	}
}

function btnShowProducts(products) {
	showBtn = document.querySelectorAll(".btn_show");
	showBtn.forEach((boton) => {
		boton.addEventListener("click", (e) => {
			let id_btn = e.target.id;
			let product = products.find((p) => p.id === parseInt(id_btn));
			showProduct(product);
		});
	});
}

function btnAddProduct(product) {
	addBtn = document.querySelectorAll(".addProduct");
	addBtn.forEach((boton) => {
		boton.addEventListener("click", (e) => {
			let id_btn = e.target.id;
			let product = products.find((p) => p.id === parseInt(id_btn));
			addCart(product);
		});
	});
}

/* Events */

document.getElementById("input_find").addEventListener("change", (e) => {
	e.preventDefault();

	const array_prod = Object.values(productosJson.data);
	const search = document.querySelector("#input_find").value.toUpperCase();

	products = filterProduct(array_prod, search);

	if (products.length >= 1) {
		document.querySelector(".img_container").style.display = "none";
		document.querySelector(".img_container_result").style.display = "block";
		showProductFiltered(products);
	} else {
		document.querySelector(".img_container").style.display = "block";
	}
});
