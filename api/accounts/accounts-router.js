const router = require('express').Router()

const { json } = require('express')
const md= require('./accounts-middleware')
const Accounts = require('./accounts-model')

router.get('/', async (req, res, next) => {
  // DO YOUR MAGIC
Accounts.getAll()
.then(accounts =>{
    res.status(200).json(accounts)
  })
.catch(next)
})

router.get('/:id',md.checkAccountId, async (req, res, next) => {
  try{
    res.status(200).json(req.account)
  }catch(error){
    next(error)
  }
})

router.post('/', md.checkAccountPayload, md.checkAccountNameUnique, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const data = await Accounts.create({name: req.body.name.trim(),budget:req.body.budget})
    res.status(201).json(data)
  }catch(err){
    next(err)
  }

})

router.put('/:id',md.checkAccountId,md.checkAccountPayload, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    const updated = await Accounts.updateById(req.params.id, req.body)
    res.json(updated)
  }catch(err){
    next(err)
  }
});

router.delete('/:id',md.checkAccountId, async (req, res, next) => {
  // DO YOUR MAGIC
  try{
    await Accounts.deleteById(req.params.id)
    res.json(req.account)
  }catch(err){
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  // DO YOUR MAGIC
  res.status(err.status || 500).json({message: `${err.message}` ||'Something is no good'})
})

 

module.exports = router;
