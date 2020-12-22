export default function authHeader() {
  let user = JSON.parse(localStorage.getItem('user'));

  if (user && user.accessToken) {
    return {
      Authorization: 'Bearer ' + user.accessToken,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }; // for Spring Boot back-end
    // return { 'x-access-token': user.accessToken };       // for Node.js Express back-end
  } else {
    return {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    };
  }
}
