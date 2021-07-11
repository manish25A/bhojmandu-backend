const express = require("express");
const router = express.Router();
var multer = require("multer");
// const {
//   BlobServiceClient,
//   StorageSharedKeyCredential,
//   newPipeline
// } = require('@azure/storage-blob');

const {
  vendorRegister,
  vendorLogin,
  getVendor,
  getVendors,
  vendorLogout,
  vendorUpdate,
} = require("../controllers/vendor");

//multer middleware
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
		file.mimetype == 'image/png' ||
		file.mimetype == 'image/jpg' ||
		file.mimetype == 'image/jpeg'
	) {
		
		cb(null, true);
	} else {
		cb(null, false);
	}
};
var upload = multer({ storage: storage });


// //azure blob functions
// const sharedKeyCredential = new StorageSharedKeyCredential(
//   process.env.AZURE_STORAGE_ACCOUNT_NAME,
//   process.env.AZURE_STORAGE_ACCOUNT_ACCESS_KEY);
// const pipeline = newPipeline(sharedKeyCredential);

// const blobServiceClient = new BlobServiceClient(
//   `https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`,
//   pipeline
// );

// const getBlobName = originalName => {
//   // Use a random number to generate a unique file name, 
//   // removing "0." from the start of the string.
//   const identifier = Math.random().toString().replace(/0\./, '');
//   return `${identifier}-${originalName}`;
// };

const { vendorprotect } = require("../middleware/vendorauth");

router.post("/register", upload.single('photo'), vendorRegister);
router.route("/").get(getVendors);
router.route("/update").put(vendorprotect, vendorUpdate);
router.post("/login", vendorLogin);
router.get("/get", vendorprotect, getVendor);
router.get("/logout", vendorLogout);

module.exports = router;
