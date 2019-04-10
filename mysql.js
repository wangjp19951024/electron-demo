const mysql = require('mysql');
let conn
// let conn = mysql.createConnection({
//         host: '127.0.0.1',
//         user: 'root',
//         password: 'master',
//         database: 'pro',
//         port: 3306
// })

// const createTableSql = `
// create table if not exists products (
//     id integer primary key auto_increment,
//     name varchar(100) not null,
//     price float not null
// )
// `;
// conn.query(createTableSql, (err, result) => {
// if (err) console.error(err.message);
// else {
//     const clearSql = 'delete from products';
//     conn.query(clearSql, [], function (err, result) {
//         console.log('成功打开数据库');
//     })
// }
// })

function createDataBase () {
    conn = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'master',
        database: 'pro',
        port: 3306
    })
    const createTableSql = `
        create table if not exists products (
            id integer primary key auto_increment,
            name varchar(100) not null,
            price float not null
        )
    `;
    conn.query(createTableSql, (err, result) => {
        if (err) console.error(err.message);
        else {
            const clearSql = 'delete from products';
            conn.query(clearSql, [], function (err, result) {
                console.log('成功连接数据库');
            })
        }
    })
}

function insertData () {
    if (conn === undefined) return console.error('no such a connection');
    let insertSql = 'insert into products(name, price) select "iphoneX", 10000 union all select "Android", 8000 union all select "tesla", 35000;';
    conn.query(insertSql, function (err, result) {
        if (err) console.error(err.message);
        else {
            console.log('数据插入成功', result);
        }
    })
}

function queryData () {
    if (conn === undefined) return console.error('no such a connection');
    let querySql = 'select * from products';
    conn.query(querySql, function (err, result) {
        if (err) console.error(err.message);
        else {
            console.log(result);
        }
    })
}

function updateData () {
    if (conn === undefined) return;
    let updateSql = 'update products set price = 99999 where name = "tesla"';
    conn.query(updateSql, function (err, result) {
        if (err) console.error(err.message);
        else {
            console.log('更新记录成功', result);
        }
    })
}

function deleteData () {
    if (conn === undefined) return console.error('no such a connection');
    let deleteSql = 'delete from products where name = "iphoneX"';
    conn.query(deleteSql, function (err, result) {
        if (err) console.error(err.message);
        else {
            console.log('已删除', result);
        }
    })
}