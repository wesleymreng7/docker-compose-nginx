const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)




app.get('/', (req, res) => {
    const createTable = "CREATE TABLE IF NOT EXISTS `nodedb`.`people` ( `id` INT NOT NULL AUTO_INCREMENT, `name` VARCHAR(45) NULL, PRIMARY KEY (`id`)) ENGINE = InnoDB"
    connection.query(createTable)
    const insert = `INSERT INTO people(name) values('Wesley Miranda')`
    connection.query(insert)
    let html = `
        <h1>Full Cycle Rocks!</h1><br>
    `
    const select = `select * from people`
    connection.query(select, function (error, results, fields) {
        if (error) {
            console.log(error)
            return
        }
        results && results.forEach(person => {
            html += `${person.name}<br>`
        });
        res.send(html)
    })
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})