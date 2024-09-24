const mainPedidos = document.getElementById("main_pedidos");

const localDataStoragePedidos = JSON.parse(localStorage.getItem("pedidos"));

function crearTarjetasProductosInicio(localDataStoragePedidos) {
	if (localDataStoragePedidos) {
		console.log(localDataStoragePedidos);
		localDataStoragePedidos.forEach((pedido) => {
			console.log(pedido);
			const tarjetaId = document.createElement("div");
			tarjetaId.classList.add("pedido");
			tarjetaId.innerHTML = `
					<h1>Pedido N°:  ${pedido[0]}</h1>
					<h1>Valor Total: $  ${pedido[1]}</h1>
				`;
			mainPedidos.appendChild(tarjetaId);
			let pedidoFilterObject = pedido.filter((p) => typeof p === "object");
			console.log(pedidoFilterObject);
			pedidoFilterObject.forEach((p) => {
				const tarjeta = document.createElement("div");
				tarjeta.classList.add("listaPedidos");
				tarjeta.innerHTML = `
					<img src="${p.imagen}" alt="${p.nombre}">
					<h3>${p.nombre} ${p.marca} ${p.tipo}</h3>
					<p>$ ${p.precio}</p>
					<p>Cantidad: ${p.quantity}</p>
				`;
				mainPedidos.appendChild(tarjeta);
			});
		});
	} else {
		const emptyList = document.createElement("div");
		emptyList.innerHTML = `
			<h4>No hay Pedidos Realizados</h4>`;
		mainPedidos.appendChild(emptyList);
	}
}

crearTarjetasProductosInicio(localDataStoragePedidos);
