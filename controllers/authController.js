const jwt =  require('jsonwebtoken');
const fs = require('fs');
const bcrypt = require('bcrypt');

exports.signup = (req, res) => {
  const { name, username, password } = req.body;
  
  // Check if all required fields are provided
  if (!name || !username || !password) {
    return res.status(400).json({ status: 'fail', message: 'Please provide name, username and password' });
  }
  let hashedPassword = bcrypt.hashSync(password, 10);

  // Check if user already exists
  const users = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'));
  const userExists = users.find(user => user.username === username);

  if (userExists) {
    return res.status(400).json({ status: 'fail', message: 'User already exists' });
  }

  // Create new user
  const id = generateUUID();
  const user = { id, name, username, password: hashedPassword };
  users.push(user);

  // Save user to file
  fs.writeFileSync('data/users.json', JSON.stringify(users, null, 2), 'utf-8');
  console.log(user, 'user created')

  // Generate JWT token
  const token = jwt.sign({ name, username }, 'gauri', { expiresIn: '30d' });
  res.status(201).json({ status: 'success', token }); 
}

exports.login = (req, res) => {
  const { username, password } = req.body;

  // Check if all required fields are provided
  if (!username || !password) {
    return res.status(400).json({ status: 'fail', message: 'Please provide username and password' });
  }

  // Check if user exists
  const users = JSON.parse(fs.readFileSync('data/users.json', 'utf-8'));
  const user = users.find(user => user.username === username);
  if (!user) {
    return res.status(401).json({ status: 'fail', message: 'Invalid username or password' });
  }

  // Check if password is correct
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: 'Internal server error'});
    }
    if (!result) {
      return res.status(401).json({ status: 'fail', message: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ name: user.name, username: user.username }, 'gauri', { expiresIn: '1h' });
    res.status(200).json({ status: 'success', token });
  })
}

exports.logout = (req, res) => {
  const token = req.headers['authorization'];

  // make the token invalid
  let expiredToken = jwt.sign({ name: req.user.name, username: req.user.username}, 'gauri', { expiresIn: '0s' });
  res.status(200).json({ status: 'success', message: 'Logged out successfully', token: expiredToken});
}

const generateUUID = () => {
  let random_string = Math.random().toString(36).substring(2, 15);
  return random_string + Date.now();
}