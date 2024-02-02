const express = require('express');
const routes = require('./routes');
const db = require('./config/connection')

const app = express();

// Setting the port for the server to listen on
const PORT = process.env.PORT || 3001;

// Configuring middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Using the defined routes in the application
app.use(routes);

// Syncing the Sequelize models with the database
db.sync({ force: false })
.then(() => {
  app.listen(PORT, () => {
    console.log('Server started on port', PORT);
  });
  
});
