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
	console.log(data);
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

// 1era Pre entrega

const students_notes = [];

function obtencionDatos() {
	let nombre = prompt("Ingrese el Nombre del Alumno");
	let alumno = {
		name: nombre,
		notes: [],
		average_note: 0,
	};
	cargarNotas(
		alumno,
		parseInt(prompt("Ingrese la Cantidad de Notas de " + nombre))
	);
}

function cargarNotas(alumno, cantidad) {
	let notes = [];
	for (let index = 0; index < cantidad; index++) {
		let nota = Number(prompt("Ingrese la nota"));
		notes.push(nota);
	}
	// Obtener el Valor total de Notas
	let total_notes = notes.reduce((total, actual) => total + actual, 0);

	// Obtener Promedio de Notas
	alumno.average_note = total_notes / cantidad;

	alumno.notes = notes;
	students_notes.push(alumno);
}

// Programa

/* do {
	obtencionDatos();
} while (window.confirm("Desea Cargar otro alumno?"));

let objeto = JSON.stringify(students_notes);
alert(objeto); */

const images = document.getElementById("images");

const productosJson = await axios.get("../Json/productos.json");
const product_data = productosJson.data;

Object.entries(productosJson.data).forEach(([key, producto]) => {
	const img = document.createElement("img");
	img.src = producto.imagen;
	images.appendChild(img);
});

const buttom_find = document.getElementById("buttom_find");

buttom_find.addEventListener("click", (e) => {
	e.preventDefault();
	const array_prod = Object.values(product_data);
	const search = document.querySelector("#input_find").value.toUpperCase();
	const products = array_prod.filter((p) =>
		p.nombre.toUpperCase().includes(search)
	);
	console.log(products);
});
