module.exports = (temp, data) => {
	let output = temp.replace(/{%TITLE%}/gi, data.productName);
	output = output.replace(/{%ID%}/gi, data.id);
	output = output.replace(/{%FROM%}/gi, data.from);
	output = output.replace(/{%NUTRIENTS%}/gi, data.nutrients);
	output = output.replace(/{%DISCRIPTION%}/gi, data.description);

	output = output.replace(/{%QUANTITY%}/gi, data.quantity);
	output = output.replace(/{%IMAGE%}/gi, data.image);
	output = output.replace(/{%PRICE%}/gi, data.price);

	if (data.organic) output = output.replace(/{%ORGANIC%}/gi, "not-organic");
	return output;
};
