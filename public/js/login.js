const form = document.getElementById('form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

function loginRequest(event) {

    const email = emailInput.value;
    const password = passwordInput.value;

    const data = {
        email: email,
        password: password
    };

    fetch('https://jwtspringsecurity.herokuapp.com/login', {
        method: 'POST',
        mode: 'cors',
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

                console.log(accessToken);

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('expireTime', expireTime);

                console.log('200 OK / Login Successful');
                alert('로그인 성공!');

                //window.location.href = "index.html";
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