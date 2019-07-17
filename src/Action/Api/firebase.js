import * as Firebase from '../Firebase.js'

export async function loadFirebase(){
  let data_list = [];
  let docRef = await Firebase.DB.collection("scenarios").doc("senarios");
  await docRef.get().then((response) => {
    const document = response.data();
    data_list.push(document);
  });
  return data_list
}

export async function updateData(new_data){
  let docRef = await Firebase.DB.collection("scenarios").doc("senarios");
  await docRef.update({
    datas: new_data,
  });
}

export async function updateTime(new_time){
  let docRef = await Firebase.DB.collection("scenarios").doc("senarios");
  await docRef.update({
    time: new_time,
  });
}



