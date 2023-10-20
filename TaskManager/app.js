const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');


//running static files without defining routes
app.use(express.static('./public'));

//middleware
app.use(express.json());


//dummy route
// app.get("/", (req, res) => {
//   res.send("Welcome to the Task Manager Project");
// });
// app.get("/api/hello", (req, res) => {
//   res.send("Hello Hello MotherFucker Task Manager");
// });


//Actual tasks manager route

app.use('/api/v1/tasks', tasks);

//middleware
app.use(notFound);
app.use(errorHandlerMiddleware);


const port = process.env.PORT || 5000;

// First db connection establish then Server run 
const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      app.listen(port, () =>
        console.log(`Server is listening on port ${port}...`)
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  start();
  