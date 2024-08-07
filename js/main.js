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
	};
	cargarNotas(
		alumno,
		parseInt(prompt("Ingrese la Cantidad de Notas de " + nombre))
	);
}

function cargarNotas(alumno, cantidad) {
	let notas = [];
	for (let index = 0; index < cantidad; index++) {
		let nota = prompt("Ingrese la nota");
		notas.push(nota);
	}
	alumno.notas = notas;
	students_notes.push(alumno);
}

// Programa

do {
	obtencionDatos();
} while (window.confirm("Desea Cargar otro alumno?"));

console.table(students_notes);
