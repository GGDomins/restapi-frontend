function redirect() {
    window.location.href="unauthorized.html";
}

function checkToken() {
    const token = localStorage.getItem('accessToken');

    if(token) {
        const expTime = localStorage.getItem('accessTokenExpTime');
        const currentTime = new Date().getTime();

        if(currentTime < expTime) {
            //validateToken();
            console.log('true');
        } else {
            refreshToken();
        }
    } else {
        alert('unauthorized access.');
        redirect();
    }
}

//check if accessToken is valid.
function validateToken() {
    const token = localStorage.getItem('accessToken');

    fetch('api', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'accessToken': token
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Token authentication failed.');
            }
            return response.json();
        })
        .then(response => {
            const code = response.code;
            const message = response.message;

            if (code == 200) {
                console.log(message);
            } else {
                console.log(message);
                redirect();
            }
        })
        .catch(error => {
            console.error('fetch operation problem:', error);
            redirect();
        });
}

// refresh accessToken using refreshToken when expired.
function refreshToken() {
    fetch('api', {
        method: 'POST',
        mode: 'cors',
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
                alert(message);
            }
        })
}

checkToken();