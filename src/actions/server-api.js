import { port } from '../constant';

export const getUser = (username, password) => {
  return fetch(`${port}/user/login`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    params: {
      username: 'hitonasi',
      password: '123456'
    }
  })
    .then(respond => {
      console.log('inside promise1');

      respond.json();
      console.log(respond);
    })
    .then(respondJson => {
      console.log('inside promise2');
      console.log(respondJson);
    })
    .catch(error => {
      console.log('inside promise3: error');
      console.log(error);
    });
};

// export const getUser = (username, password) => {
//   return fetch(`${port}/user/login?username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`, {
//     method: 'GET',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json'
//     },
//   })
//     .then(respond => {
//       console.log('inside promise1');

//       respond.json();
//       console.log(respond);
//     })
//     .then(respondJson => {
//       console.log('inside promise2');
//       console.log(respondJson);
//     })
//     .catch(error => {
//       console.log('inside promise3: error');
//       console.log(error);
//     });
// };

