// On récupère nos models
const db = require("../models")
const Message = db.messages
const User = db.users
const Comment = db.comments
const jwt = require("jsonwebtoken");

// Routes CRUD : Create, Read, Update, Delete.
// Create ou Créer
exports.createMessage = (req, res, next) => {
    console.log('ligne 14 req.body' + req.body.messageUrl);
    let imagePost = "";
    if (req.file) { 
        imagePost = `${req.protocol}://${req.get("host")}/images/${req.file.filename}` 
    }
    const message = new Message(
        {
            UserId:     req.body.UserId,
            message:    req.body.message,
            messageUrl: imagePost
        }
    )
    console.log(message)
    message.save()
        .then(() => res.status(201).json({ message: "Publication réussie" }))
        .catch(error => res.status(400).json({ error }))
};

// Read ou Lire
exports.findAllMessages = (req, res, next) => {
    Message.findAll({
        include: { model: User, required: true, attributes: ["userName"]}, 
        
        order: [["id", "DESC"]],
    })    
    .then(messages => {
        const list = messages.map(message => {
            return Object.assign({},
                {
                    id:         message.id,
                    createdAt:  message.createdAt,
                    message:    message.message,
                    messageUrl: message.messageUrl,
                    UserId:     message.UserId,
                    userName:   message.User.userName,
                    isActive:   message.User.isActive
                }
            )
        })
        res.status(200).json({ list })
    })
    .catch(error => res.status(400).json({ error }))
}

exports.findOneMessage = (req, res, next) => {
    const oneMessage = {}
    Message.findOne({ 
        where: { id: req.params.id },
        include: {
            model: User,
            required: true,
            attributes: ["userName"] 
        },
        order: [["id", "DESC"]]

    })
    .then(message => {
        oneMessage.id           = message.id
        oneMessage.userId       = message.UserId
        oneMessage.userName     = message.User.userName
        oneMessage.createdAt    = message.createdAt
        oneMessage.message      = message.message
        oneMessage.messageUrl   = message.messageUrl
        res.status(200).json(oneMessage)
    })
    .catch(error => res.status(404).json({ error }))
};

exports.findAllMessagesForOne = (req, res, next) => {
    let list = ""
    Message.findAll({ 
        where: { UserId: req.params.id },
    })
    .then((res) => { 
        list = res;
        res.status(200).json( { list } )
    })
    .catch((error) => { res.status(404).json({ error })})
};

// Delete ou Supprimer
exports.deleteMessage = (req, res, next) => {
    const token = req.header.authorization.split(' ')[1];
    console.log(token)
    const decodedToken = jwt.verify(token, 'TKN_SECRET');
    console.log(decodedToken)
    //userId = id de l'utilisateur connecté
     const userId = decodedToken.userId
    
    console.log(" MESSAGE DELETION PROCESS ")
    console.log(" message Id is: " + req.query.messageId)
    console.log(" message User Id is : " + req.query.messageUid)
    console.log(" User Id who ask the deletion is : " + req.query.uid)
    console.log(" is it the author of the message who ask the deletion or is he Admin (admin is uid=1) ? ") + 
    console.log(" if True => delete the message ")
    console.log(" if False => unauthorized ")
    User.findOne({ where : {id: userId}})
        .then(user =>{
            if(user.isAdmin){
    console.log(req.query.messageUid == req.query.uid || req.query.uid == 1)
    if(req.query.messageUid == req.query.uid || req.query.uid == 1) {
        Comment.destroy({ where: { MessageId: req.query.messageId }})
        Message.destroy({ where: { id: req.query.messageId }})
        .then((res) => {
                res.status(200).json({ message: "Le message et ses commentaires ont été supprimés" })
        })
        .catch(error => res.status(400).json({ error }))
    } else {
        res.status(401).json({message : " Non autorisé "})
    }
}
        })}