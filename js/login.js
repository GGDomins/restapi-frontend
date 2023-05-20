const form = document.getElementById('form');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

function loginRequest(event) {

    const email = emailInput.value;
    const password = passwordInput.value;

    const credentials = {
        email: email,
        password: password
    };

    fetch('https://d4210923-9869-47d5-b0aa-e1d9dfb983c9.mock.pstmn.io/mock/login', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(response => {
            if(!response.ok) {
                throw new Error('Network response error');
            }

            for (const [name, value] of response.headers.entries()) {
                console.log(`${name}: ${value}`);
            }

            return response.json();
        })
        .then(response => {
            //console.log(response);
            const code = response.code;
            const message = response.message;
            const token = response.token;
            
            if (code == 200) {
                //log message then place token into header
                const expTime = response.expireTimeMs;

                console.log(`HTTP ${code} OK`);
                console.log(message);

                localStorage.setItem('accessToken', token);
                localStorage.setItem('accessTokenExpTime', expTime);

                alert(`${email} 님, 환영합니다!`);

                window.location.href = "index.html";
            } else {
                alert(message);
                if (message == "이메일을 잘못 입력하셨습니다.") {
                    emailInput.focus();
                } else {
                    passwordInput.focus();
                }
            }
        })
        .catch(error => {
            console.error('fetch operation problem:', error);
        });
    
    event.preventDefault();
}

form.addEventListener('submit', loginRequest);