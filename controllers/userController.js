const fs = require('fs');

exports.getAllUsers = (req, res) => {
  fs.readFile('data/users.json', 'utf-8', (err, data) => {
    console.log('Read users.json'); 
    let users = JSON.parse(data);
    res.status(200).json({users})
  })
}
