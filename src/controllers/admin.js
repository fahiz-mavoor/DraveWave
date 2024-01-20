const admin = require('../model/admin');
const { setAdmin } = require('../service/auth');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

const showLoginForm = (req, res) => {
  res.render('admin/login');
};

async function handleAdminLogin(req, res) {
  const { email, password } = req.body;

  try {
    const bcryptpassword = await bcrypt.hash(password, 10);
    // console.log(bcryptpassword);

    const user = await admin.findOne({ email });
    console.log( user);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // Invalid email or password
      return res.status(401).render('admin/login', { error: 'Invalid email or password' });
    }

    const sessionId = uuidv4();
    setAdmin(sessionId, user);
    res.cookie('uid', sessionId);
    res.status(200).render('admin/index');
  } catch (error) {
    // Handle any errors that might occur during the database query
    console.error('Error during admin login:', error);
    return res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  showLoginForm,
  handleAdminLogin,
};
