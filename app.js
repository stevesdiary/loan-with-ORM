const express = require('express');
// const { appendFile } = require('fs');
// const {sequelize} = require('./models');
const { sequelize, User, Post } = require('./models')
const app = express()
app.use(express.json())

app.post('/users', async (req, res) => {
   const { name, email, role } = req.body

   try {
      const user = await User.create({ name, email, role })

      return res.json(user)
   } catch (err) {
      console.log(err)
      return res.status(500).json(err)
   }
})

async function main(){
   await sequelize.sync({force: true})
}
app.listen({port:5000}, async()=>{
   console.log('Server running on http://localhost:5000')
   await sequelize.authenticate()
   console.log('Database connected!')
})
main()