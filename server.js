const express = require('express')
const app = express()
const router = require('./db/routes')
const {db, User} = require('./db/models')
const path = require('path')

app.use(express.static(path.join(process.cwd(), 'public')))
app.use(express.json())
app.use('/api', router)

db.sync()
// .then(()=>{ Promise.all([
// 	User.create({name: 'Charisse'}),
// 	User.create({name: 'Kevin'}),
// 	User.create({name: 'Barry'})
// 	])
// })
.then(()=>{
  app.listen(3000, ()=>{
    console.log('Listening on port 3000')
  })
})
