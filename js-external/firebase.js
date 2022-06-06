const firebaseConfig = {
  apiKey: "AIzaSyAu4pJ3eYhFvTjEOqQyjvd-TQwhk0281vA",
  authDomain: "limerick-db-f3381.firebaseapp.com",
  projectId: "limerick-db-f3381",
  storageBucket: "limerick-db-f3381.appspot.com",
  messagingSenderId: "765075578322",
  appId: "1:765075578322:web:eecd0f022cee0a6f60bc0b",
  measurementId: "G-2RKGVM8YGV",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();
const storage = firebase.storage();
var storageRef = storage.ref();

let imageUrl;

const uploadImage = () => {
  const file = document.querySelector("#image").files[0];
  document.querySelector(".info").style.display = "block";
  document.querySelector("#submit-btn").disabled = true;
  const name = new Date() + "-" + file.name;
  const metadata = {
    contentType: file.type,
  };
  const imageRef = storageRef.child(`workshops/${new Date()}-${file.name}`);
  const task = imageRef.put(file, metadata);
  task
    .then((snapshot) => snapshot.ref.getDownloadURL())
    .then((url) => {
      imageUrl = url;
      document.querySelector(".info").style.display = "none";
      document.querySelector(".success").innerHTML =
        "Image Uploaded Successfully!!!";
      document.querySelector(".success").style.display = "block";
      document.querySelector("#submit-btn").disabled = false;
      setTimeout(() => {
        document.querySelector(".success").style.display = "none";
        document.querySelector(".success").innerHTML =
          "Workshop Details Added Successfully!!!";
      }, 1500);
    })
    .catch((error) => {
      document.querySelector(".info").style.display = "none";
      document.querySelector(".error").innerHTML = "Uploading Image failed!!!";
      document.querySelector(".error").style.display = "block";
      document.querySelector("#submit-btn").disabled = false;
      setTimeout(() => {
        document.querySelector(".error").style.display = "none";
        document.querySelector(".error").innerHTML = "Something Went Wrong!!!";
      }, 1500);
    });
};

document.getElementById("image").addEventListener("change", (e) => {
  uploadImage();
});

const getValbyID = (id) => {
  return document.getElementById(id).value;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  document.getElementById("submit-btn").innerText = "Loading...";
  document.querySelector("#submit-btn").disabled = true;
  document.querySelector(".error").style.display = "none";
  const title = getValbyID("name");
  const author = getValbyID("author");
  const date = getValbyID("date");
  if (title && author && date && imageUrl) {
    db.collection("workshops")
      .add({
        title,
        author,
        date,
        imageUrl,
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        document.querySelector(".success").style.display = "block";
        setTimeout(() => {
          document.getElementById("submit-btn").innerText = "Submit";
          document.querySelector("#submit-btn").disabled = false;
          window.location.href =
            "https://rohitvpatil0810.github.io/BDS-web-app/activities.html";
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

document
  .getElementById("workshopForm")
  .addEventListener("submit", handleSubmit);
