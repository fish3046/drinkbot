/* GET /_anything_ */
exports.getGeneric = function(Model)
{
	return function(req, res)
	{
		Model.find({}, function (err, records){
			res.json(records);
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
				res.json({error: err});
				res.status(400);
			} else {
				res.json({drink: record});
				res.status(201);
			}
		});
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
				res.json({error: err});
				res.status(400);
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