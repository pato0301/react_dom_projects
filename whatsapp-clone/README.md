# Whatsapp Clone

## Technologies:

- React
- Firebase Firestone Realtime DB
- Material UI
- React Router
- React Context API
- Redux
- Google Authentication
- Deploy: Firebase

## Steps:

1. Login / Register for Firebase
   1. Create and app
   2. Go to project config
   3. Set up project and install firebase tools with npm install -g firebase-tools
   4. At the bottom "Firebase SDK Snippet" choose "config"
      1. Create file call "firebase.js" inside the src directory.
      2. Copy the code in the SDK Snippet.
2. Install Material UI
   1. npm install @material-ui/core
   2. npm install @material-ui/icons
3. Firebase:
   1. Install firebase with: npm i firebase
   2. Copy the following lines in the firebase.js file
      1. import firebase from 'firebase';
      2. const firebaseApp = firebase.initializeApp(firebaseConfig);
      3. const db = firebaseApp.firestore();
      4. const auth = firebase.auth();
      5. const provider = new firebase.auth.GoogleAuthProvider();
   3. In firebase web:
      1. DataBase
      2. Create Data Base
      3. Start in test-mode and "Done"
      4. Start Collection
         1. create field, add value andgenerate id of document and save
4. Install react router:
   1. npm i react-router-dom
5. Firebase Authentication
   1. Start
   2. Pick Google (or whatever you want)
   3. Enable
   4. Save
6. Create Collection inside of Room:
   1. create field, add value andgenerate id of document and save

## Deploy

We will deploy with firebase

### Steps
1. command line firebase login
2. firebase init
3. Hosting
4. Use an existing project
5. Select the project
6. Public direction? Use "build"
7. Config as a single-page-app, type yes(or y)
8. npm run build --> this build and optimize the project for production
9. firebase deploy