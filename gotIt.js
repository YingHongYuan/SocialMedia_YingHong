'use strict';

function gotData(data){
  fbData = data.val();

  if(fbData){
    console.log('received data:');
    console.log(fbData);

    fbDataArray = Object.values(fbData);

    console.log(fbDataArray);

  }else{
    console.log('nothing in this folder yet');
  }
}

function errData(err){
  console.log("error! did not receive data");
  console.log(err);
}

function createNode(_nodeFolder, _nodeID, _nodeObject){
  firebase.database().ref(_nodeFolder + '/' + _nodeID).set(_nodeObject);
}
//createNode(folderName,"test",{text:" HHHHHHHH"});

function updateNode(_nodeFolder, _nodeID, _nodeObject){
  firebase.database().ref(_nodeFolder + '/' + _nodeID).update(_updateObject);
}

function deleteNode(_nodeFolder, _nodeID){
  firebase.database().ref(_nodeFolder + '/' + _nodeID).remove();
}
