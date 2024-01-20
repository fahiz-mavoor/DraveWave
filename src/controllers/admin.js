const admin = require('../model/admin');
const {setAdmin} = require('../service/auth')
const {v4: uuidv4} =require  ('uuid')

const showLoginForm = (req, res) => {
  res.render('admin/login');
};

async function handleAdminLogin(req, res) {
  const { email, password } = req.body;

  try {
    const user = await admin.findOne({ email, password });

    if (!user) {
      // If the user is not found, render the login form with an error message
      return res.render('admin/login', { error: 'Invalid email or password' });
    }
    const sessionId = uuidv4();
    setAdmin (sessionId,user)
    res.cookie("uid",sessionId)
    res.render('admin/index')

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
