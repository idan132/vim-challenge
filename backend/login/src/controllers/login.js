const dotenv = require('dotenv');
dotenv.config();
const fetch = require('node-fetch');

const login = async(req, res) => {
  const uname = req.body.username;
  const pass = req.body.password;
  console.log('Received: ' + uname + ', ' + pass)

  if (uname === 'admin' && pass === 'v1mc0nn3ct') {
    res.status(200).send({
        link: 'https://vim-challenge.com/evil-corp/secret-console-app'
    });
    } 
  else {
        res.status(401).send('Wrong username or password');
    }
}


module.exports = login;
