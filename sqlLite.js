// const sqlite = require('sqlite3');
// const button_create = document.querySelector('createDatabase');
// console.log('sqlite', new sqlite.Database('./sq3/test.db')); 
// /**创建内存数据库 */
// let db = new sqlite.Database('./sq3/test.db');
// global.db = db;
/**将内存中数据库写入到硬盘中 */
// const fs = require('fs');
let fs = require('fs'); 

// const sql3 = require('sqlite3').verbose();
let sql3;
// const db = new sql3.Database(':memory:', (err) => {
//     if (err) return console.error(err.message);
//     console.log('创建内存型数据库成功');
// })

let db;


function createDataBase () {
    sql3 = require('sqlite3').verbose();
    fs.exists('./sq3/test/db', (exists) => {
        if (exists) {
            fs.unlinkSync('./sq3/test.db');
        }
        db = new sql3.Database('./sq3/test.db', sql3.OPEN_READWRITE | sql3.OPEN_CREATE, (err) => {
            if (err) {
                console.error(err.message);
            } else {
                console.log('成功连接test.db数据库');
                let createTableSql = `
                    create table if not exists products (
                        id integer primary key autoincrement,
                        name varchar(100) not null,
                        price float not null
                    )
                `;
                db.run(createTableSql, (err) => {
                    if (err) {
                        console.error(err.message);
                    } else {
                        console.log('数据写入成功');
                    }
                })
            }
        })
    })
}

// window.onload = initialize;