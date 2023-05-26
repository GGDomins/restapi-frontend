const refreshToken = () => {
    fetch('https://jwtspringsecurity.herokuapp.com/refresh-token', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            const statusCode = response.status;

            if (statusCode === 200) {
                login.style.display = 'none';
                signup.style.display = 'none';
                mypage.style.display = 'block';
                logout.style.display = 'block';
            } else {
                login.style.display = 'block';
                signup.style.display = 'block';
                mypage.style.display = 'none';
                logout.style.display = 'none';

                throw new Error('Invalid refresh token');
            }
        })
        .catch(err => {
            console.log(err);
        })
};


//function refreshToken() {
//     fetch('https://jwtspringsecurity.herokuapp.com/refresh-token', {
//         method: 'POST',
//         mode: 'cors',
//         credentials: 'include'
//     })
//         .then(response => {
//             const statusCode = response.status;

//             if (statusCode === 200) {
//                 const accessToken = response.headers.get('accessToken');
//                 const expireTime = response.headers.get('expireTime');

//                 login.style.display = 'none';
//                 signup.style.display = 'none';
//                 mypage.style.display = 'block';
//                 logout.style.display = 'block';

//                 console.log(accessToken);
//                 console.log(expireTime);
//             } else {
//                 const accessToken = response.headers.get('accessToken');
//                 const expireTime = response.headers.get('expireTime');

//                 console.log(accessToken);
//                 console.log(expireTime);

//                 login.style.display = 'block';
//                 signup.style.display = 'block';
//                 mypage.style.display = 'none';
//                 logout.style.display = 'none';

//                 console.log('invalid token');
//             }
//         })
// }


// // function refreshToken() {
// //     fetch('https://jwtspringsecurity.herokuapp.com/refresh-token', {
// //         method: 'POST',
// //         mode: 'cors',
// //         credentials: 'include',
// //         headers: {
// //             'Content-type': 'application/json'
// //         }
// //     })
// //         .then(response => {
// //             if (!response.ok) {
// //                 login.style.display = 'block';
// //                 signup.style.display = 'block';
// //                 mypage.style.display = 'none';
// //                 logout.style.display = 'none';

// //                 throw new Error('Token refresh failed.');
// //             }
// //             return response.json();
// //         })
// //         .then(response => {
// //             const code = response.code;
// //             const message = response.message;

// //             if (code == 200) {
// //                 const token = response.token;
// //                 const expTime = response.expireTimeMs;

// //                 localStorage.setItem('accessToken', token);
// //                 localStorage.setItem('accessTokenExpTime', expTime);

// //                 console.log(message);
// //                 alert(message);
// //             } else {
// //                 console.log(`HTTP ${code} Internal Server Error`);
// //                 alert(message);
// //             }
// //         })
// // }

// // function myPageAccess(event) {
    
// //     const token = localStorage.getItem('accessToken');

// //     if(token) {
// //         const currentTime = new Date().getTime();
// //         const expTime = localStorage.getItem('accessTokenExpTime');

// //         if(currentTime < expTime) {
// //             fetch('https://d4210923-9869-47d5-b0aa-e1d9dfb983c9.mock.pstmn.io/mock/my-page', {
// //                 method: 'POST',
// //                 headers: {
// //                     "Content-type": "application/json",
// //                     "accessToken": token
// //                 }
// //             })
// //                 .then(response => {
// //                     if(!response.ok) {
// //                         throw new Error("Something is wrong");
// //                     }

// //                     return response.json();
// //                 })
// //                 .then(response => {
// //                     const code = response.code;
// //                     const message = response.message;
                    
// //                     if (code == 200) {
// //                         window.location.href = "mypage.html";
// //                     } else {
// //                         alert(message);
// //                         console.log(response);
// //                         window.location.href = "unauthorized.html";
// //                     }
// //                 })
// //         }
// //     } else {
// //         window.location.href = "unauthorized.html";
// //     }
// // }

// function removeToken() {
//     localStorage.removeItem('accessToken');
//     localStorage.removeItem('accessTokenExpTime');

//     alert('로그아웃 되셨습니다.');

//     location.reload();
// }

// // function tokenCheck() {
// //     const token = localStorage.getItem('accessToken');
// //     const expTime = localStorage.getItem('accessTokenExpTime');

// //     console.log(expTime);

// //     if(token) {
// //         const currentTime = new Date().getTime();
// //         console.log(currentTime);

// //         if(currentTime >= expTime) {
// //             localStorage.removeItem('accessToken');
// //             localStorage.removeItem('accessTokenExpTime');

// //             console.log('token expired');

// //             refreshToken();
// //         }

// //         login.style.display = 'none';
// //         signup.style.display = 'none';
// //         mypage.style.display = 'block';
// //         logout.style.display = 'block';
// //     }
// // }
// // window.onload = function() {
// //     tokenCheck();
// // }

const login = document.getElementById('login');
const signup = document.getElementById('signup');

const mypage = document.getElementById('mypage');
// mypage.addEventListener('click', myPageAccess);

const logout = document.getElementById('logout');
// logout.addEventListener('click', removeToken);

document.addEventListener('DOMContentLoaded', refreshToken);