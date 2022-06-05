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
