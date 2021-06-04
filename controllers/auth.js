const User = require("../models/user");

const jwt = require("JsonWebToken");
const expressJwt = require("express-jwt");
const { validationResult } = require("express-validator");

exports.signup = (req, res) => {
	const errors = validationResult(req);
	const { email, password } = req.body;

	if (!errors.isEmpty()) {
		return res.status(422).json({
			error: errors.array()[0].msg,
		});
	}
	User.findOne({ email }, (err, data) => {
		if (data) {
			return res.status(400).json({
				error: "Email already exists",
			});
		}

		const user = new User(req.body);
		user.save((err, user) => {
			if (err) {
				return res.status(400).json({
					err: "NOT able to save user in db",
				});
			}
			res.json(user);
		});
	});
};

exports.signin = (req, res) => {
	const { email, password } = req.body;

	User.findOne({ email }, (err, user) => {
		if (err || !user) {
			return res.status(400).json({
				error: "User email doesnt exist",
			});
		}
		if (!user.authenticate(password)) {
			return res.status(401).json({
				error: "Email and password do not match",
			});
		}

		//create tokens
		const accessToken = jwt.sign({ _id: user._id }, "secretOfAccess", {
			expiresIn: "30s",
		});
		const refreshToken = jwt.sign({ _id: user._id }, "secretOfRefresh", {
			expiresIn: "7d",
		});

		//put token into cookie

		res.cookie("accessToken", accessToken, { httpOnly: true });
		res.cookie("refreshToken", refreshToken, { httpOnly: true });

		//send response to front end
		const { _id, name, email, role } = user;
		return res.json({
			accessToken,
			refreshToken,
			user: { _id, name, email, role },
		});
	});
};

exports.signout = (req, res) => {
	res.clearCookie("accessToken");
	res.clearCookie("refreshToken");
	res.json({
		message: "User signout succesfull",
	});
};

//protected

// exports.isSignedIn = expressJwt({
//   secret: "secretOfAccess",
//   userProperty: "auth",
// });

// (exports.isSignedIn = expressJwt({
// 	secret: "secretOfAccess",
// 	userProperty: "auth",
// 	algorithms: ["HS256"],
// })),
// 	function (err, req, res, next) {
// 		if (err) {
// 			res.send();
// 		}
// 	};

exports.isSignedIn = (req, res, next) => {
	const aToken = req.cookies.accessToken;
	const rToken = req.cookies.refreshToken;

	jwt.verify(aToken, "secretOfAccess", (err, data) => {
		if (err.message == "jwt expired") {
			jwt.verify(rToken, "secretOfRefresh", (err, data) => {
				if (!err) {
					this.accessToken = jwt.sign({ _id: data._id }, "secretOfAccess", {
						expiresIn: "30s",
					});
				}
			});
		}
	});

	next();
};
