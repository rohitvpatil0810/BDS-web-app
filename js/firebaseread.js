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

const fetchWorkshops = async () => {
  db.collection("workshops")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let options = { year: "numeric", month: "long", day: "numeric" };
        let date = new Date(doc.data().date);

        let data = `<div class="media-29101 d-md-flex w-100 mtop">
        <div class="img">
          <img
            src="${doc.data().imageUrl}"
            alt="Image"
            class="img-fluid"
          />
        </div>
        <div class="text">
          <a class="category d-block mb-4" href="#">${date.toLocaleDateString(
            "en-US",
            options
          )}</a>
          <h2><a href="#">${doc.data().title}</a></h2>
          <a class="category d-block mb-4" href="#"
            >${doc.data().author}</a
          >
        </div>
      </div>`;
        document.getElementById("data").insertAdjacentHTML("afterend", data);
      });
    });
};

fetchWorkshops();
