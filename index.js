const fs = require("fs");
const http = require("http");
const url = require("url");
const replaceTemp = require("./modules/replaceTemp.js");
// #####################################################################################
//     ----  file system  ----

// Read the file with bloocking method as it is a synchronous method

// const textin = fs.readFileSync("./txt/input.txt", "UTF-8");
// console.log(textin);
// const textOut = `This is what we know about the avocado: ${textin}.\nCreated on ${Date.now()}`;
// fs.writeFileSync("./txt/output.txt", textOut);
// console.log("File written successfully");

// Read the file with non-bloocking method as it is a Asynchronous method

// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
// 	if (err) return console.log(err);

// 	fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data1) => {
// 		if (err) return console.log(err);

// 		fs.readFile("./txt/append.txt", "utf-8", (err, data2) => {
// 			if (err) return console.log(err);

// 			console.log(`this is data 1 : \n${data1}\nthis is the data 2 : ${data2}`);
// 		});
// 	});
// });

// #####################################################################################
//     ----  Server  ----

const overview = fs.readFileSync(`${__dirname}/templates/overview.html`, "utf-8");
const product = fs.readFileSync(`${__dirname}/templates/product.html`, "utf-8");
const card = fs.readFileSync(`${__dirname}/templates/card.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8");
const productData = JSON.parse(data);

const server = http.createServer((req, res) => {
	const { query, pathname } = url.parse(req.url, true);

	if (pathname === "/") {
		res.end("Hello, World");
	} else if (pathname === "/overview") {
		res.writeHead(200, { "content-type": "text/html" });

		const cardHtml = productData.map((el) => replaceTemp(card, el));

		// console.log(cardHtml);

		const output = overview.replace(/{%CARDHOLDER%}/, cardHtml);

		res.end(output);
	} else if (pathname === "/product") {
		res.writeHead(200, {
			"Content-type": "text/html"
		});
		const currentData = productData[query.id];
		const output = replaceTemp(product, currentData);
		res.end(output);
	} else if (pathname === "/api") {
		res.writeHead(200, {
			"Content-type": "application/json"
		});
		res.end(data);
	} else {
		res.writeHead(404, {
			customHeader: "this is the custom header"
		});
		res.end("This is page not found err");
	}
});

server.listen(8000, "127.0.0.1", () => {
	console.log("Server is Running on port 8000");
});
