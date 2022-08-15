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

app.get('/users', async (req, res)=>{
   try{
      const users = await User.findAll()
      return res.json(users)
   }catch(err){
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong'})
   }
})
app.get('/posts', async (req, res)=>{
   try{
      const posts = await Post.findAll({ include: [User]})
      return res.json(posts)
   }catch(err){
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong'})
   }
})
app.get('/users/:uuid', async (req, res)=> {
   const uuid = req.params.uuid
   try{
      const user = await User.findOne({
         where: { uuid:uuid },
         // include: 'posts',
      })
      return res.json(user)
   }catch(err){
      console.log(err)
      return res.status(500).json({ error: 'Something went wrong'})
   }
})

// async function main(){
//    await sequelize.sync({force: true})
// }

app.post('/posts', async (req, res)=> {
   const { userUuid, body } = req.body

   try {
      const user = await User.findOne({ where: {uuid: userUuid }})
      

      const post = await Post.create({ body, userId: user.dataValues.uuid })

      return res.json(post)
   } catch (error) {
      console.log(error)
      return res.status(500).json(error)
   }
})

app.listen({port:5000}, async()=>{
   console.log('Server running on http://localhost:5000')
   await sequelize.authenticate()
   console.log('Database connected!')
})
