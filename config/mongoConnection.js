const MongoClient = require('mongodb').MongoClient;
const settings = require('./settings');
const mongoConfig = settings.mongoConfig;

let _connection = undefined;
let _db = undefined;

const createConn = async function createConn() {
  if (!_connection) {
    _connection = await MongoClient.connect(mongoConfig.serverUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    _db = await _connection.db(mongoConfig.database);
  }

  return _db;
}

const closeConn = async function closeConn() {
  if (_connection) {
    _connection.close()
  }
}

module.exports = {
  createConn,
  closeConn
}