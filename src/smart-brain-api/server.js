// Server with Express
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'carlosaguirre',
    password : 'your_database_password',
    database : 'smart-brain'
  }
});

const port = 3000;

//Temp Database 
const app = express();
app.use(cors()); // Enable CORS for all routesnp
app.use(bodyParser.json())

const database = { 
    
    users: [
      { 
        id: '123',
        name: 'John', 
        email: 'john@gmail.com',
        password: 'cookies', 
        entries: 0, 
        joined: new Date() 
      },

      { 
        id: '456',
        name: 'Johnna', 
        email: 'johnfem@gmail.com',
        password: 'cookies1', 
        entries: 0, 
        joined: new Date() 
      }
    ]
}

//Routes 

app.get('/', (req, res) => {
  res.send(database.users);
});
//update sign and register 
//Sign in 
app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json('success');
    } else {
    res.status(400).json('error logging in')
    }
  });

//Register 
app.post('/register', (req, res) => { 
   const {email, name, password} = req.body;
   bcrypt.hash(password, null, null, function(err, hash) {
    console.log(hash);
  });
  db('users')
    .returning('*')
    .insert({
      email: email, 
      name: name, 
      joined: new Date()
  })
  .then(user => {
    res.json(user[0])
  })
  .catch(err => res.status(400).json('unable to register'))
});

//Profile

app.get('/profile/:id', (req, res) => {
     const {id} = req.params;
     db.select('*').from('users').where({
      id: id
     }).then(user => {
        if (user.length) {
          res.json(user[0]);
        } else { 
          res.status(400).json('not found')
        }
     })
     .catch(err => res.status(400).json('error getting user'))
})

//image 
app.post('/image', (req,res) =>{
    const {id} = req.body;
     let found = false;  
     database.users.forEach(user => {
        if (user.id === id) { 
          found = true;
          user.entries++ 
          return  res.json(user.entries); 
        } 
     })
     if(!found) { 
        res.status(400).json('not found');
     }
})

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
  });

/* Design API

---> res = this is working

Routes 

signin route --> POST (we are posting data into the server) --> Respond sucess/fail 

register route --> POST (data in to the server)
--> return created user

In home ---profile route: usedid --> get the user info. 

image --> put ---> retuen updated user object.


*/