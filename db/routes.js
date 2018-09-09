const router = require('express').Router();
const { User, Manager } = require('./models')
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
  .then(users=>res.send(users))
  .catch(next)
})

router.get('/managers', (req, res, next)=>{
  const Op = Sequelize.Op
  User.findAll({
  	where:{
  	  employees: {
  	  	[Op.ne]: []
  	  }
  	}
  })
  .then(managers=>res.send(managers))
  .catch(next)
})

//FIND BY ID
router.get('/users/:id', (req, res, next)=>{
  User.findById(req.params.id)
  .then(user=>res.send(user))
  .catch(next)
})


//CREATE NEW
router.post('/users/create', async (req, res, next)=>{
  try{
  const user = await User.create(req.body.user)
  if(req.params.manager) {
  	const manager = req.params.manager
  	manager.setEmployee(user)
  }
  res.send(user)
  } catch(e){next(e)}
})

//UPDATE
router.put('/users/:id', (req, res, next)=>{
  User.update({
  	name: req.body.name,
  	managerId: req.body.manager.id,
  	manager: req.body.manager
  }, {
  where: { id: req.params.id },
  returning: true,
  plain: true
  })
  .then(user=>{res.send(user[1])})
  .catch(next)
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