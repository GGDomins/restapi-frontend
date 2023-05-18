function checkToken(event) {
    const token = localStorage.getItem('accessToken');

    if(token) {
        const expTime = localStorage.getItem('accessTokenExpTime');
        const currentTime = new Date().getTime();

        if(currentTime < expTime) {
            console.log('토큰이 유효합니다.');
        } else {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('accessTokenExpTime');
            refreshToken();
        }
    } else {
        alert('잘못된 접근입니다.');
    }

    event.preventDefault();
}

function refreshToken() {
    fetch('api', {
        method: 'POST',
        credentials: 'include'
    })
        .then(response => {
            if (!response.ok) {
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

                alert(message);
            } else {
                console.log(`HTTP ${code} Internal Server Error`);
                alert(message);
            }
        })
}

const tokenCheck = document.getElementById('token-check');
tokenCheck.addEventListener('click', checkToken);