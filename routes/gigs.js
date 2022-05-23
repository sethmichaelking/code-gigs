const express = require('express')
const { append } = require('express/lib/response')
const router = express.Router()
const db = require('../config/database')
const Gig = require('../models/Gig')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

//show all gigs in the table
router.get('/', (req, res) => 
   Gig.findAll()
        .then(gigs => 
            res.render('gigs', {
                gigs
            })
        )
)
//display add gig form
router.get('/add', (req, res)=>{
    res.render('add')
})


//add a gig
router.post('/add', (req, res) => {
    let { title, technologies, description, contact_email } = req.body;
    let errors = []
    if (!title){
        errors.push({ text: 'add a title'})
    }
    if (!technologies){
        errors.push({ text: 'add a technologies'})
    }
    if (!description){
        errors.push({ text: 'add a description'})
    }
    if (!contact_email){
        errors.push({ text: 'add a contact_email'})
    }
    if (errors.length > 0){
        res.render('add', {
            errors,
            title,
            technologies,
            description,
            contact_email
        })
    } else { 
        Gig.create({
            title,
            technologies,
            description,
            contact_email
          })
            .then(gig => 
                res.redirect('/gigs')
                )
            .catch(err => console.log(err))
    }
})


//search the gigs
router.get('/search', (req, res)=> {
    let { term } = req.query
    Gig.findAll(
        {
            where: { technologies: { [Op.like]: '%' + term + '%'} } 
        })
        .then(gigs => res.render('gigs', { gigs }))
        .catch(err => console.log(err))
})

module.exports = router