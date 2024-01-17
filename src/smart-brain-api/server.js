// Server with Express
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors'); 
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
   database.users.push({
    id: '125',
    name: name, 
    email: email,
    password: password, 
    entries: 0, 
    joined: new Date() 
   })

    res.json(database.users[database.users.length-1])
});

//Profile

app.get('/profile/:id', (req, res) => {
     const {id} = req.params;
     let found = false;  
     database.users.forEach(user => {
        if (user.id === id) { 
          found = true; 
          return  res.json(user); 
        } 
     })
     if(!found) { 
        res.status(400).json('not found')
     }
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