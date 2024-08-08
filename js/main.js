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
	return monthText.filter((month, i) => i === monthNumber - 1);
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

// 1era Pre entrega

const students_notes = [];

function obtencionDatos() {
	let nombre = prompt("Ingrese el Nombre del Alumno");
	let alumno = {
		nombre: nombre,
		notas: [],
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

	alumno.notas = notes;
	students_notes.push(alumno);
}

// Programa

do {
	obtencionDatos();
} while (window.confirm("Desea Cargar otro alumno?"));

let objeto = JSON.stringify(students_notes);
alert(objeto);
console.log(objeto);
