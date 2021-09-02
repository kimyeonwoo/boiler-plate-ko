const express = require('express')
const app = express()
const port = 5000
const { User } = require('./models/User')

const config = require('./config/key')

//application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}))
//application/json
app.use(express.json())

const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology:true
}).then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send('Hello World! yeonwoo world!')
})

app.post('/register', (req,res) => {

  const user = new User(req.body);

  user.save((err, doc) => {
    if(err) return res.json({ success : false, err})
    return res.status(200).json({
      success : true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})