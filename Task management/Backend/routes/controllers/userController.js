const bcryptjs = require('bcryptjs');
const { User } = require('../../models');

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create a new user
    const user = await User.create({ username, email, password: hashedPassword });
    console.log(user);
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    res.json({ message: 'Login successful'});

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // const token = jwt.sign({ userId: user.id }, 'your_secret_key_here');

    // res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  register,
  login,
};
