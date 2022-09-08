const models = require ('../models');

const Tutorial = models.tutorial;
const Tag = models.tag;
const Tut_Tag = models.tut_tag;

const addType = async(req,res)=>{
    console.log("adding holder...",req.body);

    let tutType = {
        name: req.body.tutorialType
    }

    const apiCall = await Tag.create(tutType);
    res.status(200).send(apiCall);
    console.log("Tutorail Type created successfully!! ",apiCall.dataValues); 
}

const getType = async(req,res)=>{

    const apiCall = await Tag.findAll({});
    res.status(200).send(apiCall);
    console.log("Tutorail Type created successfully!! ",apiCall.dataValues); 
}

const addtutorialName = async(req,res)=>{
    console.log("adding holder...",req.body);

    let tutorial = {
        title: req.body.title,
        description: req.body.description,
    }

    const apiCall = await Tutorial.create(tutorial);
    res.status(200).send(apiCall);
    console.log("Tutorial  created successfully!! ",apiCall.dataValues); 
}

const getTutorial = async(req,res)=>{

    const apiCall = await Tutorial.findAll({});
    res.status(200).send(apiCall);
    console.log("Tutorail Type created successfully!! ",apiCall.dataValues); 
}

const addTutorialRelation = async(req,res)=>{
    console.log("addTutorialRelation...",req.body);

    let tutorial = {
        tutorialId: req.body.tutorial_Id,
        tag_id: req.body.tag_id,
    }

    const apiCall = await Tut_Tag.create(tutorial);
    res.status(200).send(apiCall);
    console.log("Tutorial relationship  created successfully!! ",apiCall.dataValues); 
}

const getTutorialRelationship = async(req,res)=>{

    const apiCall = await Tag.findAll({
        include: [{
            model:Tutorial,
            as: "tutorials",
            attributes: ['id','title','description'],
            through: {attributes: []}
        }],
        attributes: ['id','name']
    });
    res.status(200).send(apiCall);
    console.log("Tutorail Type created successfully!! ",apiCall.dataValues); 
}

module.exports={
    addType,
    getType,
    addtutorialName,
    getTutorial,
    addTutorialRelation,
    getTutorialRelationship
};