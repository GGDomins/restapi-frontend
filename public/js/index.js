const refreshToken = () => {

    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) {
        return;
    }

    const JWT_EXPIRY_TIME = 5 * 60 * 1000;
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
                localStorage.removeItem('accessToken');
                localStorage.removeItem('expTime');

                const accessToken = response.headers.get('accessToken');
                const expTime = response.headers.get('expireTime');

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('expTime', expTime);

                login.style.display = 'none';
                signup.style.display = 'none';
                mypage.style.display = 'block';
                logout.style.display = 'block';

                setTimeout(silentRefresh, JWT_EXPIRY_TIME - 30000);
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

const silentRefresh = () => {
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
                localStorage.removeItem('accessToken');
                localStorage.removeItem('expTime');

                const accessToken = response.headers.get('accessToken');
                const expTime = response.headers.get('expireTime');

                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('expTime', expTime);
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
}

const login = document.getElementById('login');
const signup = document.getElementById('signup');

const mypage = document.getElementById('mypage');
// mypage.addEventListener('click', myPageAccess);

document.addEventListener('DOMContentLoaded', function() {
    const closeModalButton = document.getElementById('closeModalButton');
    const modal = document.getElementById('modal');
    
    mypage.addEventListener('click', function() {
        const accessToken = 'Bearer ' + localStorage.getItem('accessToken');

        console.log(accessToken);
        fetch('https://jwtspringsecurity.herokuapp.com/my-page', {
            method: 'GET',
            mode: 'cors',
            credentials: 'include',
            headers: {
                'Content-type': 'application/json',
                'Authorization': accessToken
            }
        })
            .then(response => {
                const statusCode = response.status;
                
                if(statusCode === 200) {
                    return response.json();
                } else {
                    throw new Error ('Something went wrong');
                }
            })
            .then(response => {
                const name = response.name;
                const email = response.email;

                console.log(name);

                const nameTag = document.getElementById('name');
                const emailTag = document.getElementById('email');

                nameTag.textContent = name;
                emailTag.textContent = email;
            })
            .catch(err => {
                console.log(err);
            })


        modal.style.display = 'block';
    });
  
    closeModalButton.addEventListener('click', function() {
        document.getElementById('name').textContent = "name: ";
        document.getElementById('email').textContent = "email: ";
        modal.style.display = 'none';
    });
});

const logout = document.getElementById('logout');
  
logout.addEventListener('click', function() {
    fetch('https://jwtspringsecurity.herokuapp.com/logout', {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            const statusCode = response.status;

            if(statusCode === 200) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('expTime');

                console.log('successfully logged out.');

                login.style.display = 'block';
                signup.style.display = 'block';
                mypage.style.display = 'block';
                logout.style.display = 'none';
            } else {
                throw new Error('error');
            }
        })
        .catch(err => {
            console.log(err);
        })
})

const about = document.getElementById('aboutus');

about.addEventListener('click', function() {
    const accessToken = 'Bearer ' + localStorage.getItem('accessToken');

    fetch('https://jwtspringsecurity.herokuapp.com/about-us', {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken
        }
    })
        .then(response => {
            const statusCode = response.status;

            if(statusCode === 200) {
                console.log('success');
            } else {
                throw new Error('error');
            }
        })
        .catch(err => {
            console.log(err);
        })
})


// logout.addEventListener('click', removeToken);

document.addEventListener('DOMContentLoaded', refreshToken);