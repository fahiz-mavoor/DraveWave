const mongoose = require("mongoose");

try{
  const userSchema = new mongoose.Schema(
    {
      
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
const User = mongoose.model("user", userSchema);
module.exports = User;

}
catch (error) {
  console.error('Error during admin login:', error);
  return res.status(500).send('Internal Server Error');
}

