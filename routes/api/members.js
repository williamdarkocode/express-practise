const express = require('express');
const router = express.Router();
const members = require('../../Members');
const uuid = require('uuid');

//creating route
// gets all members
router.get('/', (request, response) => {
    response.json(members);
});

// creating api
//get single member

router.get('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found) {
        res.json(members.filter(member => member.id === parseInt(req.params.id)));        
    }
    else {
        res.status(400).json({ msg: 'Member not found' });
    }
});

// create Member
router.post('/', (req, res)=> {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "active"
    }
    if(!newMember.name || !newMember.email) {
        res.status(400).json({ msg: 'Please include name and email' });
    }

    members.push(newMember);
    res.json(members);
    // res.redirect('/');
});

// update member
router.put('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found) {
        const upDatedMemeber = req.body;
        members.forEach(member => {
            if(member.id === parseInt(req.params.id)) {
                member.name = upDatedMemeber.name ? upDatedMemeber.name: member.name;
                member.email = upDatedMemeber.email ? upDatedMemeber.email: member.email;
                
                res.json({ msg: 'Member updated', member });
            }
        });
    }
    else {
        res.status(400).json({ msg: 'Member not found' });
    }
});

// delete member

router.delete('/:id', (req, res) => {
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found) {
        res.json({
            msg: 'Member deleted', 
            members: members.filter(member => member.id !== parseInt(req.params.id))
        });        
    }
    else {
        res.status(400).json({ msg: 'Member not found' });
    }
});


module.exports = router;