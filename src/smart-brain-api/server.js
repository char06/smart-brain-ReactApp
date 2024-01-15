// Server with Express
const express = require('express');
const app = express();
const port = 3000;

//Temp Database 

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
  res.send('This is working');
});

//Sign in 

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json('success');
    } else {
    res.status(400).json('error logging in')
    }
  });

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