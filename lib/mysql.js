var mysql = require('mysql');
var config = require('../config/mysql.js')

var pool = mysql.createPool(config)

// 封装
let query = function (sql) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      connection.query(sql, function (err, results) {
        if (err) {
          reject(err)
        }
        resolve(results)
        connection.release() // 释放连接资源 | 跟 connection.destroy() 不同，它是销毁
      })
    })
  })
}

exports.getArticlelist = (condition) => {
  let _sql = 'select id,title,posttime,des from articles'

  if (condition.keyword) {
    _sql = `select id,title,posttime,des from articles where title like '%${condition.keyword}%'`
  } else if (condition.type) {
    _sql = `select id,title,posttime,des from articles where menu='${condition.type}'`
  }
  console.log(_sql)
  return query(_sql)
}

exports.getHotArticlelist = () => {
  let _sql = `select id,title,look_times from articles ORDER BY look_times DESC LIMIT 5`
  return query(_sql)
}


exports.getArticledetail = (id) => {
  let _sql = `select * from articles where id=${id}`
  return query(_sql)
}

exports.increaseLooktimes = (id) => {
  let _sql = `update articles set look_times=look_times+1 where id=${id}`
  console.log(_sql)
  return query(_sql)
}




exports.addArticle = (data) => {
  let _sql = `insert into articles(title,des,posttime,content,menu,look_times) values('${data.title}','${data.des}','${data.posttime}','${data.content}','${data.menu}',0);`
  return query(_sql)
}


exports.deleteArticle = (id) => {
  let _sql = `delete from articles where id=${id}`
  return query(_sql)
}



exports.updateArticle = (data) => {
  let _sql = `update articles set title='${data.title}',des='${data.des}',content='${data.content}',menu='${data.menu}' where id=${data.id}`
  console.log(_sql)
  return query(_sql)
}

