const express = require('express');
const cors = require("cors");
// initializing variables 
const path = require('path')
const sequelize = require('./database/sequelize');
const port = process.env.PORT || 3000;
// const session = require("client-sessions");
// const client = "http://localhost:3001";
const { Movie, CrewMember } = require('./database/models');
const movieR = require('./routes/movieRoutes');
const crewR = require('./routes/crewRoutes');

const pg = require('pg');
// initializing server
const server = express();
server.use(express.urlencoded({ extended: true, }));
server.use(express.json());
server.use(cors());
server.use(express.static(path.join(__dirname, 'build')))

const client2 = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});
client2.connect();
client2.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client2.end();
});

server.listen(port, function () {
  console.log("Listening on port " + port + "...");
});

// defining relations:

Movie.hasMany(CrewMember);
CrewMember.belongsTo(Movie);

// for authorization: 
server.use(function (req, res, next) { // ading data in Headers ( view in Postman -> Headers )
  // res.header("Access-Control-Allow-Origin", client);
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, GET, POST");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// route for creating the database with sequelize models
server.get("/create", async (req, res, next) => {
  try {
    await sequelize.sync({ force: true });
    res.status(201).json({ message: "Database created." });
  } catch (err) {
    next(err);
  }
});
// adding created routes
server.use('/movies', movieR);
server.use('/crewmembers', crewR);
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});