const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: './database/movies.db',
//     define: {
// 		timestamps: false
// 	}
// });

const sequelize = new Sequelize(
  process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
}
)


module.exports = sequelize; 