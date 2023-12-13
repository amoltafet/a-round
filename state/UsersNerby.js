import { getDoc } from "firebase/firestore";
import locationService from "./locationService";
import { useEffect } from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { GeoFire } from "geofire";
import { getDatabase, ref, update } from "firebase/database";
import * as TaskManager from 'expo-task-manager';
const NERBY_USERS_TRACKING = "NERBY_USERS_TRACKING";

let nerbyUsers = [];
let users = [];

async function UsersNerby() {
  const db = getFirestore();
  const userRef = doc(db, "users", auth.currentUser.uid);
  const firebaseRef = ref(getDatabase(), "geofire");
  const geoFireInstance = new GeoFire(firebaseRef);

  const center = await getDoc(userRef)
    .then((doc) => {
      if (doc.exists()) {
        return doc.data().location;
      } else {
        console.log("No such document!");
      }
    })
    .catch((error) => {
      console.log("Error getting document:", error);
    });
  
  const radiusInM = 100000;
  const geoQuery = geoFireInstance.query({
    center: [center.latitude, center.longitude],
    radius: radiusInM,
  });

  geoQuery.on("key_entered", (key, location, distance) => {
   // console.log("key_entered", key, location, distance);
    if (key === auth.currentUser.uid) {
      return;
    }
    if (users.includes(key)) {
      return;
    }
    users.push(key);
    getUserById(key, "add");
  });

  geoQuery.on("key_exited", (key, location, distance) => {
    console.log("key_exited", key, location, distance);
    if (key === auth.currentUser.uid) {
      return;
    }
    getUserById(key, "remove");
    users = users.filter((u) => u !== key);
  });

  // geoQuery.on("key_moved", (key, location, distance) => {
  //   console.log("key_moved", key, location, distance);
  // });

  

  return nerbyUsers;
}
const getUserById = async (id, action) => {
    const db = getFirestore();
    const userRef = doc(db, "users", id);
    await getDoc(userRef).then((doc) => {
      const user = doc.data();
      if (!user) {
        return;
      }
      if (action === "remove") {
        nerbyUsers.filter((u) => u !== user);
      } else {
        nerbyUsers.push(user);
      }
      console.log("nerbyUsers", nerbyUsers);
    });
}

export {nerbyUsers, UsersNerby, NERBY_USERS_TRACKING, getUserById}
