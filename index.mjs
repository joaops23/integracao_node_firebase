import admin from 'firebase-admin';
import dotenv from "dotenv";
import express from "express";

const app = express();

admin.initializeApp({
  credential: admin.credential.cert('serviceKeyFirebase.json'),
  databaseURL: "https://phpfirebase-3f505-default-rtdb.firebaseio.com"
});


// Realiza a consulta no firestore e retorna a lista de contatos salvos
app.get('/contacts', function(req,res) {
  admin.firestore()
  .collection('contatos')
  .get()
  .then(snapshot => {
    // o firestore retorna um snapshot dos documentos consultados
    const transaction = snapshot.docs.map(doc => ({ // esse snapshot retorna uma lista de documentos, onde pode-se iterar os documentos recuperando os dados e seu id e retornar um array com os dados dos documentos
      ...doc.data(),
      uid: doc.id
    }))
    res.send(transaction)
  })
})



app.listen('8000')