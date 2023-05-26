const getData = () => {
    const form = document.getElementById('form');
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    return { email: email, password: password };
}


function loginRequest(event) {

    const data = getData();

    fetch('https://jwtspringsecurity.herokuapp.com/login', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            const statusCode = response.status;

            if (statusCode === 200) {
                const accessToken = response.headers.get('accessToken');
                const expireTime = response.headers.get('expireTime');

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('expTime', expireTime);

                console.log(accessToken);

                console.log('200 OK / Login Successful');
                alert('로그인 성공!');

                window.location.href = "index.html";
            } else if (statusCode === 401) {
                return response.json().then(response => {
                    const message = response.json().message;
                    alert(message);
                    console.log('401 Unauthorized');

                    if (message == "이메일을 잘못 입력하셨습니다.") {
                        emailInput.focus();
                    } else {
                        passwordInput.focus();
                    }
                    throw new Error('401 Unauthorized');
                })
            } else {
                throw new Error('Unexpected error');
            }

            // for (const [name, value] of response.headers.entries()) {
            //     console.log(`${name}: ${value}`);
            // }
        })
        .catch(error => {
            console.error(error);
        });
    
    event.preventDefault();
}

form.addEventListener('submit', loginRequest);