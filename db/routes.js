const router = require('express').Router();
const { User, Manager } = require('./models')
const Sequelize = require('sequelize')
module.exports = router

//FIND ALL
router.get('/users', (req, res, next)=>{
  User.findAll({
  	include:[{
  	  model: User,
  	  as: 'employees'
  	}, {
  	  model: User,
  	  as: 'manager'
  	}]
  })
  .then(users=>{
  	// console.log(users)
  	res.send(users)})
  .catch(next)
})

router.get('/managers', (req, res, next)=>{
  const Op = Sequelize.Op
  User.findAll({
  	include:[{
  	  model: User,
  	  as: 'employees'
  	}]
  })
  .then(managers=>{
  	return managers.filter(manager=>manager.employees.length)
  })
  .then(newManagers=>{
  	console.log(newManagers)
  	res.send(newManagers)})
  .catch(next)
})

//FIND BY ID
router.get('/users/:id', (req, res, next)=>{
  User.findOne({
  	include: [{
  	  model: User,
  	  as: 'manager'
  	}],
  	where: {
  	  id: req.params.id
  	}
  })
  .then(user=>res.send(user))
  .catch(next)
})

router.get('/managers/:id', (req, res, next)=>{
  User.findById(req.params.id)
  .then(manager=>res.send(manager))
  .catch(next)
})

//CREATE NEW
router.post('/users/create', async (req, res, next)=>{
  try{
  const user = await User.create({name: req.body.user.name})
  if(req.body.manager) {
  	const manager = await User.findOne({where:{name:req.body.manager}})
  	await user.setManager(manager)
  	await manager.setEmployees(user)
  }
  res.send(user)
  } catch(e){next(e)}
})

//UPDATE
router.put('/users/update/:id', async (req, res, next)=>{
  try{
  const [number, user] = await User.update({
  	name: req.body.user
  }, {
  where: { id: req.params.id },
  returning: true,
  plain: true
  })
  const manager = await User.findOne({
  	where:{
  	  name: req.body.manager
  	}
  })
  user.setManager(manager)
  manager.setEmployees(user)
  console.log('user array: ', user)
  console.log('manager: ', manager)
  res.send(user)
  }
  catch(e){next(e)}
})

//DELETE
router.delete('/users/:id', (req, res, next)=>{
  User.destroy({
  	where: {
  	  id: req.params.id
  	}
  })
  .then(()=>res.status(204).end())
  .catch(next)
})