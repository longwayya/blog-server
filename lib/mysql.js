var mysql = require('mysql');
var config = require('../config/mysql.js')

var pool = mysql.createPool(config)

// 封装
let query = function (sql) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      connection.query(sql, function (err, results) {
        if(err){
          reject(err)
        }
        resolve(results)
        connection.release() // 释放连接资源 | 跟 connection.destroy() 不同，它是销毁
      })
    })
  })
}

exports.getArticlelist = () => {
  let _sql = 'select * from articles'
  return query(_sql)
}

