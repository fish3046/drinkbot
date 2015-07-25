/* GET /_anything_ */
exports.getAllGeneric = function(Model)
{
	return function(req, res)
	{
		Model.find({}, function (err, records){
			if (err || !records) {
				res.status(400);
				res.json({error: err});
			} else {
				res.json(records);
			}
		});
	}
};

/* GET /_anything_ */
exports.getGeneric = function(Model)
{
	return function(req, res)
	{
		Model.findById(req.params.id, function (err, record){
			if (err || !record) {
				res.status(400);
				res.json({error: err});
			} else if (record) {
				res.json(record);
			} else {
				// If we are finding by ID, assuming that if we don't have 1 record, none are found
				res.status(404);
			}
		});
	}
};

/* POST /_anything_ */
exports.postGeneric = function(Model)
{
	return function(req, res)
	{
		console.log(req.body);

		var instance = new Model(req.body);

		instance.save(function(err, record){
			if (err || !record) {
				res.status(400);
				res.json({error: err});
			} else {
				res.json(record);
				res.status(201);
			}
		});
	}
};

/* PUT /_anything_ */
exports.putGeneric = function(Model)
{
	return function(req, res)
	{
		// Remove _id
		var updateData = req.body;
		delete updateData['_id'];

		console.log(req.body);

		Model.findOneAndUpdate(
			{ _id: req.params.id },
			req.body,
			{ 'new': true },
			function (err, record) {
				if (err || !record) {
					res.status(400);
					res.json({error: err});
				} else {
					res.status(200);
					res.json(record);
				}
			}
		);
	}
};

/*
DELETE /_anything_/:id
Works with any model
*/
exports.deleteGeneric = function(Model)
{
	return function(req, res)
	{
		Model.findByIdAndRemove({ _id: req.params.id }, function(err, doc){
			if (err != null) {
				res.status(400);
				res.json({error: err});
			} else if (doc == null) {
				res.status(404);
				res.send();
			} else {
				// Send blank response.  Status code will be enough.
				res.send();
			}
		});
	}
};