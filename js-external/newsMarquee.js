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

const fetchNews = async () => {
  console.log("fetching data");
  let data = "";
  db.collection("news")
    .orderBy("date", "desc")
    .limit(5)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        data += `<a href="${
          doc.data().link
        }" class="news-item" target="_blank"> <img src="images/news/new.png" alt="new" class="new-img"> ${
          doc.data().heading
        }</a>`;
        console.log(document.getElementById("marquee").innerHTML);
      });
      document.querySelector("#marquee").innerHTML = data;
      console.log(document.querySelector("#marquee").innerHTML);
    });
};

fetchNews();
