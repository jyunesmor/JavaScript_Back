export default class Counter extends HTMLElement {
	template = () => `
    <div class="counter_div">
      <i class="fa-sharp fa-solid fa-minus"></i>
      <span id='quantity'>0</span>
      <i class="fa-sharp fa-solid fa-plus"></i>
    </div>
  `;

	connectedCallback() {
		this.innerHTML = this.template();
		this.querySelector("i.fa-plus").addEventListener("click", () => {
			let count = parseInt(this.querySelector("#quantity").textContent);
			this.querySelector("#quantity").textContent = ++count;
		});
		this.querySelector("i.fa-minus").addEventListener("click", () => {
			let count = parseInt(this.querySelector("#quantity").textContent);
			if (count > 0) {
				this.querySelector("#quantity").textContent = --count;
			} else {
				count = 0;
			}
		});
	}

	// Agrego un método para obtener el valor actual del contador
	getValue() {
		return parseInt(this.querySelector("#quantity").textContent);
	}

	// Agrego un método para establecer un valor inicial para el contador
	setValue(value) {
		this.querySelector("#quantity").textContent = value;
	}
}
