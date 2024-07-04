const Thing = require('../models/thing');

exports.createThing = (req, res, next) =>{
    /*const thing = new Thing({
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId
    });*/

    const thingObject = JSON.parse(req.body.thing);
    delete thingObject._id;
    delete thingObject._userId;

    const thing = new Thing({
        ...thingObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });

    thing.save().then(
        ()=> {
            res.status(201).json({
                message: 'Objet enregistré'
            })
        }).catch(
        (error) => {
            console.log(error);
            res.status(400).json({error})
        }
    );
};

exports.getOneThing = (req, res, next)=> {
    Thing.findOne({_id: req.params.id}).then(
        (thing) => {
            res.status(200).json(thing);
        }).catch(
        (error)=> {
            
            res.status(400).json({error})
        }
    );
    
};

exports.modifyingThing = (req, res, next)=>{
    /*const thing = new Thing({
        _id: req.params.id,
        title: req.body.title,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        price: req.body.price,
        userId: req.body.userId

    })
    Thing.updateOne(
        { _id: req.params.id}, thing).then(
            ()=> {
                res.status(200).json({message: 'Objet modifié !'})
            }
        )
    .catch((error) => {
        res.status(400).json({error})
    });*/

    const thingObject = req.file ? { 
        ...JSON.parse(req.body.thing),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };

    delete thingObject._userId;
    Thing.findOne({_id: req.params.id})
         .then((thing) => {
            if(thing.userId != req.auth.userId){
                res.status(401).json({message: 'Not Authorized'})
            }else{
                Thing.updateOne({_id: req.params.id},{...thingObject, _id: req.params.id})
                .then(() => res.status(200).json({message: 'Objet modifié!'}))
                .catch(error => res.status(401).json({error}))
            }
         }).catch((error) => {
            res.status(400).json({error});
         });

}

exports.deleteThing = (req, res, next)=>{
    Thing.deleteOne(
        {_id: req.params.id }
    ).then(()=> res.status(200).json({message: 'Objet supprimé!'}))
    .catch(
        (error) => {
            res.status(400).json({error})
        }
    );
}

exports.getAllStuff = (req, res, next)=>{
    Thing.find()
    .then( (things) => {
        res.status(200).json(things)}
    ).catch((error)=> {
        res.status(400).json({error})
    }
);
}