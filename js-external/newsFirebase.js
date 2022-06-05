const firebaseConfig = {
  apiKey: "AIzaSyBqJHXbl4Rq-KYxoGTT4mRwikBCKe6E9Xo",
  authDomain: "limerick-db.firebaseapp.com",
  projectId: "limerick-db",
  storageBucket: "limerick-db.appspot.com",
  messagingSenderId: "43009373528",
  appId: "1:43009373528:web:0e71dcb01a9f807fe3a12d",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

const getValbyID = (id) => {
  return document.getElementById(id).value;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  document.getElementById("submit-btn").innerText = "Loading...";
  document.querySelector("#submit-btn").disabled = true;
  document.querySelector(".error").style.display = "none";
  const date = new Date();
  const heading = getValbyID("heading");
  const link = getValbyID("link");
  console.log(heading, link);
  if (heading && link) {
    db.collection("news")
      .add({
        heading,
        link,
        date,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        document.querySelector(".success").style.display = "block";
        setTimeout(() => {
          document.getElementById("submit-btn").innerText = "Submit";
          document.querySelector("#submit-btn").disabled = false;
          window.location.href = "/index.html";
        }, 1500);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
        document.querySelector(".error").innerHTML = "Something went Wrong!!!";
        document.querySelector(".error").style.display = "block";
        document.getElementById("submit-btn").innerText = "Submit";
        document.querySelector("#submit-btn").disabled = false;
      });
  } else {
    document.querySelector(".error").innerHTML = "Please Fill all Details!!!";
    document.querySelector(".error").style.display = "block";
    document.querySelector("#submit-btn").disabled = false;
    document.getElementById("submit-btn").innerText = "Submit";
  }
};

document.getElementById("newsForm").addEventListener("submit", handleSubmit);
