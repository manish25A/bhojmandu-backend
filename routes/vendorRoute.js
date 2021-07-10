const express = require("express");
const router = express.Router();
var multer = require("multer");

const {
  vendorRegister,
  vendorLogin,
  getVendor,
  getVendors,
  vendorLogout,
  vendorUpdate,
} = require("../controllers/vendor");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, "UploadedOn" + Date.now() + "fileOrigName" + file.originalname);
  },
});
const filefilter = function (req, file, cb) {
	if (
		file.mimetype !== 'image/png' ||
		file.mimetype !== 'image/jpg' ||
		file.mimetype !== 'image/jpeg'
	) {
		req.file_error="file not allowed"
		cb(null, false);
	} else {
		cb(null, true);
	}
};
var upload = multer({ storage: storage,fileFilter:filefilter });

const { vendorprotect } = require("../middleware/vendorauth");
const Vendor = require("../models/Vendor");

router.post("/register", upload.single('photo'), vendorRegister);
router.route("/").get(getVendors);
router.route("/update").put(vendorprotect, vendorUpdate);
router.post("/login", vendorLogin);
router.get("/get", vendorprotect, getVendor);
router.get("/logout", vendorLogout);

module.exports = router;
