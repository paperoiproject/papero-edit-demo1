import * as request from 'superagent';

export async function sendWork(work){
    return request
    .post(`https://e751f01f.ngrok.io`)
    .send(work)
    .then(response => {
      const body = response.body;
      console.log(body)
      return body;
    })
    .catch(error => {
      return { error };
    });
  }


