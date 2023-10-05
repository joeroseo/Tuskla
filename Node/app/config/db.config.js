module.exports = {
  HOST: "192.168.56.115",
  USER: "root",
  PASSWORD: "test1234",
  DB: "CartDb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
