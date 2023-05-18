function refreshToken() {
    fetch('api', {
        method: 'POST',
        credentials: 'include'
    })
        .then(response => {
            if (!response.ok) {
                login.style.display = 'inline-block';
                signup.style.display = 'inline-block';
                mypage.style.display = 'none';
                logout.style.display = 'none';

                throw new Error('Token refresh failed.');
            }
            return response.json();
        })
        .then(response => {
            const code = response.code;
            const message = response.message;

            if (code == 200) {
                const token = response.token;
                const expTime = response.expireTimeMs;

                localStorage.setItem('accessToken', token);
                localStorage.setItem('accessTokenExpTime', expTime);

                console.log(message);
                alert(message);
            } else {
                console.log(`HTTP ${code} Internal Server Error`);
                alert(message);
            }
        })
}

function myPageAccess(event) {

    const token = localStorage.getItem('accessToken');

    if(token) {
        const currentTime = new Date().getTime();
        const expTime = localStorage.getItem('accessTokenExpTime');

        if(currentTime < expTime) {
            fetch('https://d4210923-9869-47d5-b0aa-e1d9dfb983c9.mock.pstmn.io/mock/my-page', {
                method: 'POST',
                headers: {
                    "Content-type": "application/json",
                    "accessToken": token
                }
            })
                .then(response => {
                    if(!response.ok) {
                        throw new Error("Something is wrong");
                    }
                    return response.json();
                })
                .then(response => {
                    const code = response.code;
                    const message = response.message;
                    
                    if (code == 200) {
                        window.location.href = "mypage.html";
                    } else {
                        alert(message);
                        console.log(response);
                        window.location.href = "index.html";
                    }
                })
        }
    }
    event.preventDefault();
}

function removeToken() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('accessTokenExpTime');

    alert('로그아웃 되셨습니다.');

    location.reload();
}

window.onload = function() {
    const token = localStorage.getItem('accessToken');
    const expTime = localStorage.getItem('accessTokenExpTime');

    console.log(expTime);

    if(token) {
        const currentTime = new Date().getTime();
        console.log(currentTime);

        const login = document.getElementById('login');
        const mypage = document.getElementById('mypage');
        const signup = document.getElementById('signup');
        const logout = document.getElementById('logout');

        if(currentTime >= expTime) {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('accessTokenExpTime');

            console.log('token expired');

            refreshToken();
        }

        login.style.display = 'none';
        signup.style.display = 'none';
        mypage.style.display = 'inline-block';
        logout.style.display = 'inline-block';
    }
}

const mypage = document.getElementById('mypage');
mypage.addEventListener('click', myPageAccess);

const logout = document.getElementById('logout');
logout.addEventListener('click', removeToken);