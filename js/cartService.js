/* API Json */
const productosJson = await axios.get("../Json/productos.json");

export function addToCart(product) {
	//Reviso si el producto está en el carrito.
	let cartStorage = JSON.parse(localStorage.getItem("productsCart"));
	let quantityProduct;

	//Si no hay localstorage lo creo
	if (!cartStorage || cartStorage.length === 0) {
		const nuevoProducto = addQuantityToProduct(product);
		localStorage.setItem("productsCart", JSON.stringify([nuevoProducto]));
		quantityProduct = 1;
	} else {
		//Si hay localstorage me fijo si el artículo ya está ahí
		const indexProd = cartStorage.findIndex((p) => p.id === product.id);
		const newCartStorage = cartStorage;
		//Si el producto no está en el carrito lo agrego
		if (indexProd === -1) {
			const nuevoProducto = addQuantityToProduct(product);
			newCartStorage.push(nuevoProducto);
			quantityProduct = 1;
		} else {
			//Si el producto está en el carrito le agrego 1 a la cantidad.
			newCartStorage[indexProd].quantity++;
			quantityProduct = newCartStorage[indexProd].quantity;
		}
		localStorage.setItem("productsCart", JSON.stringify(newCartStorage));
		return quantityProduct;
	}
}

function addQuantityToProduct(product) {
	const newProduct = product;
	newProduct.quantity = 1;
	return newProduct;
}

export function subtractToCart(product) {
	//Reviso si el producto está en el carrito.
	let cartStorage = JSON.parse(localStorage.getItem("productsCart"));
	//Si hay localstorage me fijo si el artículo ya está ahí
	const indexProd = cartStorage.findIndex((p) => p.id === product.id);
	let quantityProduct = 0;
	cartStorage[indexProd].quantity--;
	if (cartStorage[indexProd].quantity === 0) {
		cartStorage.splice(indexProd, 1);
	}
	localStorage.setItem("productsCart", JSON.stringify(cartStorage));
	return quantityProduct;
}
