const sequelize = require('../database/sequelize');
const { DataTypes } = require('sequelize');


const Movie = sequelize.define('Movie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titlu: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [5, 50]
    }
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isDate: { error: 'Must be a valid date!' },
    },
  }, categorie: {
    type: DataTypes.ENUM('horror', 'romance', 'comedy', 'action'),
    allowNull: false
  }
})

const CrewMember = sequelize.define('CrewMember', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nume: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: { error: 'CrewMember must have a name!' },
      notEmpty: { error: 'name must not be empty!' },
      len: [5, 50]
    }
  }, rol: {
    type: DataTypes.ENUM('DIRECTOR', 'WRITER'),
    allowNull: false
  }
});

module.exports = { Movie, CrewMember };


