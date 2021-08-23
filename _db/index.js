const admin = require('firebase-admin');

admin.initializeApp({
  credential: admin.credential.cert(
    require('../secret-notes-crud-api-firebase.json')
  ),
});

const firestore = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

async function createDocument(collection, initialData) {
  try {
    return await firestore.collection(collection).add(initialData);
  } catch (error) {
    throw error;
  }
}

async function updateById(collection, docId, data, mergeOption = true) {
  try {
    return await firestore
      .collection(collection)
      .doc(docId)
      .set(data, { merge: mergeOption });
  } catch (error) {
    throw error;
  }
}

async function getDocumentById(collection, docId) {
  try {
    const doc = await firestore.collection(collection).doc(docId).get();
    return doc.exists ? { id: doc.id, ...doc.data() } : null;
  } catch (error) {
    throw error;
  }
}

async function getAllDocuments(collection) {
  try {
    const { docs } = await firestore.collection(collection).get();
    return docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (err) {
    throw error;
  }
}

async function getAllDocumentsByQuery(collection, query) {
  try {
    const { docs } = await firestore
      .collection(collection)
      .where(...query)
      .get();
    return docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    throw error;
  }
}

async function deleteDocumentById(collection, docId) {
  try {
    return await firestore.collection(collection).doc(docId).delete();
  } catch (error) {
    throw error;
  }
}

module.exports = {
  FieldValue,
  createDocument,
  updateById,
  getDocumentById,
  deleteDocumentById,
  getAllDocuments,
  getAllDocumentsByQuery,
};
