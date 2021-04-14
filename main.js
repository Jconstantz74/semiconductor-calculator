document.addEventListener("DOMContentLoaded", function (e) {
	const item_rows = document.querySelectorAll(".calculator .row:not(.total)")

	item_rows.forEach(function (row) {

		const qty_field = row.querySelector("input");
		qty_field.addEventListener("change", item_input_listener);
		qty_field.addEventListener("keyup", item_input_listener);
	});
}); //end DOM ready

function item_input_listener(e) {
	const this_input = e.target; //the input field that emitted the event
	const row = this_input.closest(".row"); // the row that contains the input field that emitted the event
	const qty = this_input.value; //the quantity

	const shops = row.querySelectorAll(".peapod, .freshdirect")

	shops.forEach(function (shop) {
		let price = shop.dataset.price;

		price = parseFloat(price);

		const total = qty * price;

		shop.querySelector("span").innerHTML = round_number(total);
	});

	row.classList.add("active");
	calculate_totals();
}

function calculate_totals() {
	const item_rows = document.querySelectorAll(".calculator .row:not(.total)");

	let peapod = 0;
	let freshdirect = 0;

	item_rows.forEach(function (row) {
		const qty_field = row.querySelector("input");
		let qty = qty_field.value;

		qty = parseFloat(qty);

		const shops = row.querySelectorAll(".freshdirect, .peapod");
		shops.forEach(function (shop) {
			//this shop's price
			let price = shop.dataset.price;
			price = parseFloat(price);
			const total = qty * price;
			if (shop.classList.contains("freshdirect")) {
				freshdirect = freshdirect + total;
			}
			if (shop.classList.contains("peapod")) {
				peapod = peapod + total;
			}
		});
	});

	const total_row = document.querySelector(".row.total");

	total_row.classList.add("active");

	total_row.querySelector(".peapod span").innerHTML = round_number(peapod);
	total_row.querySelector(".freshdirect span").innerHTML = round_number(freshdirect);

	let cheapest = false;

	if (peapod < freshdirect) {
		cheapest = "peapod";
	}
	if (freshdirect < peapod) {
		cheapest = "freshdirect";
	}

	const cheapest_item = total_row.querySelector(".cheapest");

	if (cheapest_item) {
		cheapest_item.classList.remove("cheapest");
	}

	if (cheapest !== false) {
		total_row.querySelector(`.${cheapest}`).classList.add("cheapest")
	}

}

function round_number(num) {
	//first, move the decimal two places
	num = num * 100;

	//then, round the number to the nearest integer
	num = Math.round(num);

	//then move the decimal back two places
	num = num / 100;

	// handle trailing zeroes
	num = num.toFixed(2);

	return num;
}