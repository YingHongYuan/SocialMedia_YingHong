'use strict';

//DB Url: http://https://console.firebase.google.com/u/0/project/message-in-a-bottle-yyh/database/message-in-a-bottle-yyh/data/~2F


let nodeData;//object we will push to firebase
let fbData; // data we pull from firebase
let fbDataArray; // firebase data valuees converted to an array
let database; // reference to our firebase database
let folderName = 'chatMessage'; // name of folder you create in db
let messageInput;
let sendMessageBtn;
let receiveMessageBtn;
let sendAgainBtn;
let receivedMessage;
let receiveDiv, sendDiv;


function setup(){
noCanvas();

//messageInput = select("messageInput");
messageInput = document.querySelector("#messageInput");
sendMessageBtn = document.querySelector("#sendMessageBtn");
receiveMessageBtn = document.querySelector("#receiveMessageBtn");
receiveMessage = document.querySelector("#receiveMessage");
sendAgainBtn = document.querySelector("#sendAgainBtn");
receiveDiv = document.querySelector("#receiveDiv");
sendDiv = document.querySelector("#sendDiv");

sendMessageBtn.addEventListener('click', sendMessage);
receiveMessageBtn.addEventListener('click', receivedMessage);
sendAgainBtn.addEventListener('click', sendAgain);

let config = {
  apiKey: "AIzaSyAulct6uH32I6v9X-SgcEItVOl6C4JTxK0",
  authDomain: "message-in-a-bottle-yyh.firebaseapp.com",
  databaseURL: "https://message-in-a-bottle-yyh.firebaseio.com",
  projectId: "message-in-a-bottle-yyh",
  storageBucket: "message-in-a-bottle-yyh.appspot.com",
  messagingSenderId: "498452120131",
  appId: "1:498452120131:web:483b2c55a78966641a8af6"
};

firebase.initializeApp(config);

database = firebase.database();

let ref = database.ref(folderName);

ref.on('value',gotData, errData);


// var firebaseConfig = {
//     apiKey: "AIzaSyAulct6uH32I6v9X-SgcEItVOl6C4JTxK0",
//     authDomain: "message-in-a-bottle-yyh.firebaseapp.com",
//     databaseURL: "https://message-in-a-bottle-yyh.firebaseio.com",
//     projectId: "message-in-a-bottle-yyh",
//     storageBucket: "message-in-a-bottle-yyh.appspot.com",
//     messagingSenderId: "498452120131",
//     appId: "1:498452120131:web:483b2c55a78966641a8af6"
//   };
}

function draw(){

}


//
function sendMessage(){

  if(messageInput.value){

  let timestamp = Date.now();

nodeData = {
  messageText: messageInput.value,
  timestamp: timestamp,
  received: false,
}

  createNode(folderName, timestamp, nodeData);
  console.log("send message");
  console.log(nodeData);

  //createP(`sent message: ${nodeData.messageText}`);

messageInput.value=''

sendDiv.style.display = 'none';
receiveDiv.style.display = 'block';


} else{
  alert("please type message first")
}
  }



//
function receiveMessage(){

// shuffle Array first
shuffleArray(fbDataArray);


  for (let i = 0; i < fbDataArray.length; i++){

    if (fbDataArray[i].received === false){
  // console.log("received message:");
  // console.log(fbDataArray[i].messageText);

receivedMessage.innerHTML = fbDataArray[i].messageText;

 updateNode(folderName, fbDataArray[i].timestamp, {recerved:true});

 receiveMessageBtn.style.display = 'none';
 sendAgainBtn.style.display = 'block';

break;
}


 else{
   receivedMessage.innerHTML = "no more message out at sea";
  //console.log("no more message out at sea");
  }
  }
}

function sendAgain(){
//reset receive div
  // receivedMessage.innerHTML="";
  // receiveMessageBtn.style.display = 'block';
  // sendAgainBtn.style.display = 'none';
  //
  //return to beginning
  receiveDiv.style.display = 'none';
  sendDiv.style.display = 'block';
}

function shuffleArray(_array){

  for (let i=_array.length - 1; i>0; i--){

    let randomIndex = Math.floor(Math.random()*(i+1));

    [_array[i],_array[randomIndex]] = [_array[randomIndex],_array[i]];
  }
}
