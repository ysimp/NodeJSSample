Ce projet s'inspire du cours : https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb

## Config de la base de donnée mongoDB  
- Mettre à jour le mot de passe de la base de donnée MongoDB dans le fichier app.js
mongoose.connect('mongodb+srv://ysi:<PASSWORD>@ysinodejscluster.axeiczw.mongodb.net/?retryWrites=true&w=majority&appName=ysiNodeJsCLuster',
  { useNewUrlParser: true,
    useUnifiedTopology: true })

## Lancer le backend
1. cd backend 
2. npm install
3. nodemon server.js (ou node server.js)

## Lancer le frontend
1. cd frontend 
2. npm install
3. npm start