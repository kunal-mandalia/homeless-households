module.exports = {
  development: {
    database: "homeless_households",
    dialect: "postgres",
    host: "127.0.0.1",
    password: null,
    username: "hh_admin",
  },
  production: {
    database: process.env.POSTGRES_DATABASE,
    dialect: "postgres",
    host: process.env.POSTGRES_HOST,
    password: process.env.POSTGRES_PASSWORD,
    username: process.env.POSTGRES_USERNAME,
  },
}
