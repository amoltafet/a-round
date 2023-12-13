import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { auth } from '../firebase';

function uploadNotification(message, recipient) {
  // Get a reference to the Firestore collection
  const notificationsRef = admin.firestore().collection('notifications');

  // Create a new document with a unique ID
  const notificationDoc = notificationsRef.doc();

  // Set the data for the notification document
  const notificationData = {
    message: message,
    recipient: recipient,
    timestamp: admin.firestore.FieldValue.serverTimestamp()
  };

  // Set the data in the Firestore document
  notificationDoc.set(notificationData)
    .then(() => {
      console.log('Notification uploaded successfully');
    })
    .catch((error) => {
      console.error('Error uploading notification:', error);
    });
}

// Export the function
export default uploadNotification;