/* GET home page. */
exports.indexPage = function()
{
	return function(req, res, next) {
		res.render('layout', { title: 'Express' });
	};
};
