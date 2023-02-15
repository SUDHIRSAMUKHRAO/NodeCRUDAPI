const express = require('express')
const app = express();
const connection = require('./config/db')

app.use(express.json())//convert binary chunks into json
app.use(express.urlencoded({
	extended: true
}))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
});


app.get("/", (req, res) => {
	res.send("api running")
})

// Retrieve all product
app.get('/ProductInfo', function (req, res) {
	connection.query('SELECT * FROM productinfo', function (error, results, fields) {
		if (error) throw error;
		return res.send({ error: false, data: results, message: 'All information of ProductInfo .' });
	});
});



// Retrieve all product page
app.get('/ProductInfo', function (req, res) {
	let pageNo = req.query.pageNo || 1;
	let recordcount = pageNo - 1 *10;
	connection.query('SELECT * FROM productinfo LIMIT 5', recordcount,function (error, results, fields) {
		if (error) throw error;
		return res.send({ error: false, data: results, message: 'All information of ProductInfo .' });
	});
});

// Add a new productinfo
app.post('/ProductInfo', function (req, res) {
	console.log(req.body);

	connection.query("INSERT INTO  ProductInfo SET ? ", req.body, function (error, results, fields)=> {
		if (error) {
			console.log(error)

			throw error;
		}
		console.log(results)
		return res.send({ error: false, message: 'New product has been created successfully.' });
	});
});





// Retrieve product with id
app.get('/ProductInfo/:id', function (req, res) {
	let ProductId = req.params.id;
	if (!ProductId) {
		return res.status(400).send({ error: true, message: 'Please provide ProductId' });
	}
	connection.query('SELECT * FROM ProductInfo where ProductId =?', ProductId, function (error, results, fields) {
		if (error) throw error;
		return res.send({ error: false, message: results[0] ? 'PRODUCTID.' : 'NOT FOUND',data:results[0] });
	});
});




//  Update product info with id
app.put('/ProductInfo', function (req, res) {
	let ProductId = req.body.ProductId;
	let ProductInfo = req.body;
	if (!ProductId || !ProductInfo) {
		return res.status(400).send({ error: ProductInfo, message: 'Please provide product info' });
	}
	connection.query("UPDATE ProductInfo SET  ? WHERE ProductId = ?", [req.body, ProductId], function (error, results, fields) {
		if (error) throw error;
		return res.send({ error: false, message: 'productinfo has been updated successfully.' });
	});
});



//  Delete product
app.delete('/ProductInfo/:id', function (req, res) {
	let ProductId = req.params.id;
	if (!ProductId) {
		return res.status(400).send({ error: true, message: 'Please provide ProductId' });
	}
	connection.query('DELETE FROM ProductInfo WHERE ProductId = ?', [ProductId], function (error, results, fields) {
		if (error) throw error;
		return res.send({ error: false, message: 'ProductInfo has been updated successfully.' });
	});
});


app.listen(3001);
