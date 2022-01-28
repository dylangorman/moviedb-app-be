const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const connection = require("../connection");
const { setLower, firstUpper } = require("./modelHelpers");
const hash = require("../hash");
const { set } = require("express/lib/application");

//User schema, table of users with passwords
const User = connection.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { indexed: [{ unique: true, fields: ["name"] }] }
);

//movie schema. table of movies with passwrods
const Movie = connection.define(
  "Movie",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue("title");
        return firstUpper(rawValue);
      },
      set(value) {
        this.setDataValue("title", setLower(value));
      },
    },
    actor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { indexed: [{ unique: true, fields: ["title"] }] }
);
//user id, and movie id
// const Subscription = connection.define(
//   "Subscription",
//   {
//     user_id: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     movie_id: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     movie_title: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     movie_actor: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     movie_year: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//   },
//   { indexed: [{ unique: true, fields: ["movie_id", "user_id"] }] }
// );
module.exports = { User, Movie };
