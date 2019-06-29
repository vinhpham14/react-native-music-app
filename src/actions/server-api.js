import { port } from '../constant';

// OK
export const getUser = (username, password) => {
  return fetch(`${port}/users/login/${username}/${password}`)
    .then(respond => respond.json())
    .then(respondJson => {
      return respondJson;
    })
    .catch(error => {
      console.log('Something wrong with server when trying to get user.');
    });
};

export const findUser = (username, question, answer, newPassword) => {
  return fetch(`${port}/users/forgetpassword/`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      question: question,
      answer: answer,
      password: newPassword
    })
  })
    .then(respond => respond.json())
    .then(respondJson => {
      return respondJson;
    })
    .catch(error => {
      console.log('Something wrong with server when finding user.');
    });
};

export const createUser = (username, question, answer, newPassword) => {
  return fetch(`${port}/users/`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: username,
      question: question,
      answer: answer,
      password: newPassword
    })
  })
    .then(respond => respond.json())
    .then(respondJson => {
      return respondJson;
    })
    .catch(error => {
      console.log('Something wrong with server when trying to create user.');
    });
};

export const updateUser = (id, playlist, favoriteSongs) => {
  return fetch(`${port}/users/${id}/`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      favoriteSongs: favoriteSongs,
      playlist: playlist
    })
  })
    .then(respond => respond.json())
    .then(respondJson => {
      return respondJson;
    })
    .catch(error => {
      console.log('Something wrong with server when trying to update user.');
    });
};
