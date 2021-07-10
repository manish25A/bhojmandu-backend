const router = require('express').Router();

const {
	register,
	login,
	customerUpdate,
	updatePassword,
	getuser,
	logout,
} = require('../controllers/user');

const { protect } = require('../middleware/auth');
const upload = require('../middleware/imageUpload');

router.route('/register', upload.imageupload).post(register);
router.post('/login', login);
router.get('/me', protect, getuser);
router.route('/update').put(protect, customerUpdate);
router.route('/update/password').put(protect, updatePassword);
router.get('/logout', logout);

module.exports = router;
