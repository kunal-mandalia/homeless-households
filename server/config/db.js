module.exports = {
  development: {
    database: "homeless_households",
    username: "hh_admin",
    password: null,
    host: "127.0.0.1",
    dialect: "postgres",
  },
  production: {
    database: process.env.POSTGRES_DATABASE,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    dialect: "postgres",
  },
}