var mysql = require("mysql");
const config = require("../../config.json");
let connection = null;
function ConnectWithDatabase() {
  return new Promise((resove, reject) => {
    connection = mysql.createConnection({
      host: "localhost",
      user: config.db.user_name,
      password: config.db.password,
      database: config.db.database,
    });
    connection.connect((err) => {
      if (err) {
        reject({ error: err, message: "unable to connect to database" });
      } else {
        resove({ message: "connection successful" });
      }
    });
  });
}

function insertNewVideo(data) {
  return new Promise((resolve, reject) => {
    let query = `INSERT INTO videos
    (id,absolutePath, title,duration, size,createdDate) VALUES
    (UUID(),'${data.absolutePath}','${data.title}', '${data.duration}'
    , '${data.size}','${data.createdDate}');`;
    if (connection) {
      connection.query(query, (error, result) => {
        if (error) {
          reject({
            message: "unable to insert new video data into database",
            error,
          });
        } else {
          resolve({ message: `inserted ${data.title} into database` });
        }
      });
    } else {
      reject({ message: "no db connection" });
    }
  });
}

function closeDBConnection() {
  if (connection) {
    connection.end();
  }
}

function getAllVideos() {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM videos";
    if (connection) {
      connection.query(query, (error, result) => {
        if (error) {
          reject({
            message: "unable to get videos data from database",
            error,
          });
        } else {
          resolve(result);
        }
      });
    } else {
      reject({ message: "no db connection" });
    }
  });
}

function getAbsolutePathForID(id) {
  return new Promise((resolve, reject) => {
    let query = `SELECT * FROM videos where id='${id}'`;
    if (connection) {
      connection.query(query, (error, result) => {
        if (error) {
          reject({
            message: "unable to get video data from database",
            error,
          });
        } else {
          if (result.length == 0) {
            reject({ message: "invalid video id" });
          } else {
            resolve(result[0].absolutePath);
          }
        }
      });
    } else {
      reject({ message: "no db connection", not: true });
    }
  });
}

module.exports = {
  ConnectWithDatabase,
  insertNewVideo,
  closeDBConnection,
  getAllVideos,
  getAbsolutePathForID,
};
