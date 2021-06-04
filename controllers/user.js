const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
	User.findById(id).exec((err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "No user was found in db",
			});
		}
		req.profile = user;
		next();
	});
};

exports.updateUser = (req, res) => {
	User.findByIdAndUpdate({ _id: req.profile._id }, { $set: req.body }, { new: true, useFindAndModify: false }, (err, user) => {
		if (err) {
			return res.status(400).json({
				error: "Email already exists",
			});
		}
		user.salt = undefined;
		user.encry_password = undefined;
		res.json(user);
	});
};

exports.getUser = (req, res) => {
	req.profile.salt = undefined;
	req.profile.encry_password = undefined;

	return res.status(200).json(req.profile);
};
