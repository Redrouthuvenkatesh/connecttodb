const express = require('express')
const app = express()

const {open} = require('sqlite')
const sqlite3 = require('sqlite3')

const path = require('path')
let db = null

async function connectDbAndServer() {
  try {
    db = await open({
      filename: path.join(__dirname, 'goodreads.db'),
      driver: sqlite3.Database,
    })
    app.listen(3000, () => {
      console.log('Connected to port 3000')
    })
  } catch (error) {
    console.log(error.message)
  }
}

connectDbAndServer()

app.get('/books/', async (req, res) => {
  try {
    const booksQuery = 'SELECT * FROM book ORDER BY book_id'
    const booksList = await db.all(booksQuery)
    res.json(booksList)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({error: 'Internal server error'})
  }
})

// const express = require('express')
// const app = express()

// const {open} = require('sqlite')
// const sqlite3 = require('sqlite3')

// const path = require('path')
// let db = null

// function connectDbAndServer() {
//   open({
//     filename: path.join(__dirname, 'goodreads.db'),
//     driver: sqlite3.Database,
//   })
//     .then(function (database) {
//       db = database
//       app.listen(3000, () => {
//         console.log('Connected to port 3000')
//       })
//     })
//     .catch(function (error) {
//       console.log(error.message)
//     })
// }

// connectDbAndServer()

// app.get('/books/', (req, res) => {
//   const booksQuery = 'SELECT * FROM book ORDER BY book_id'
//   db.all(booksQuery)
//     .then(function (booksList) {
//       res.json(booksList)
//     })
//     .catch(function (error) {
//       console.log(error.message)
//       res.status(500).json({error: 'Internal server error'})
//     })
// })
