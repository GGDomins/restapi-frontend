function checkThisUser() {
    fetch('https://https://jwtspringsecurity.herokuapp.com/refresh-token', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
    })
        .then(response => {
            const statusCode = response.status;

            if(statusCode === 200) {
                const accessToken = response.headers.get('Accesstoken');
                const expTime = response.headers.get('Expiretime');

                return [accessToken, expTime];
            } else {
                console.log('500 Internal Server Error.');
                throw new Error('Invalid refresh token');
            }
        })
        .catch(err => {
            console.log(err);
        })
}

function loginSuccess()

// function checkExpire(event) {
//     event.preventDefault();

//     const accessToken = localStorage.getItem('accessToken');
//     const expTime = localStorage.getItem('expireTime');

//     if(accessToken) {
        
//         const currentTime = new Date().getTime();

//         if(currentTime < expTime) {
//             validateToken();
//         } else {
//             localStorage.removeItem('accessToken');
//             localStorage.removeItem('accessTokenExpTime');
//             refreshToken();
//         }
//     } else {
//         alert('잘못된 접근입니다.');
//         window.location.href = "index.html";
//     }
// }

// function refreshToken() {
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('expireTime');

//     fetch('https://jwtspringsecurity.herokuapp.com/refresh-token', {
//         method: 'POST',
//         mode: 'cors',
//         credentials: 'include'
//     })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Token refresh failed.');
//             }

//             const statusCode = response.status;

//             if (statusCode === 200) {
//                 const accessToken = response.headers.get('accessToken');
//                 const expireTime = response.headers.get('expireTime');

//                 localStorage.setItem('accessToken', accessToken);
//                 localStorage.setItem('expireTime', expireTime);

//                 console.log('200 OK / Token refreshed!');
//             } else if (statusCode === 401) {
//                 alert('401 Unauthorized');

//                 window.location.href = "index.html";

//                 throw new Error('401 Unauthorized');
//             } else {
//                 throw new Error('Unexpected error');
//             }

//             return response.json();
//         })
//         .catch(error => {
//             console.log(error);
//         })
// }

// function validateToken() {
//     const accessToken = localStorage.getItem('accessToken');

//     fetch('https://jwtspringsecurity.herokuapp.com/my-page', {
//         method: 'GET',
//         mode: 'cors',
//         credentials: 'include',
//         headers: {
//             accessToken: accessToken
//         }
//     })
//         .then(response => {
//             const statusCode = response.status;
            
//             if(statusCode === 200) {
//                 return response.json();
//             } else if(statusCode === 401) {
//                 console.log('401 unauthorised / invalid user');
                
//                 window.location.href = "index.html";
//             }
//         })
//         .then(response => {
//             const name = response.name;
//             const email = response.email;

//             console.log(name, email);
//         })
//         .catch(error => {
//             console.log(error);
//         })
// }

// const tokenCheck = document.getElementById('token-check');
// tokenCheck.addEventListener('click', checkExpire);