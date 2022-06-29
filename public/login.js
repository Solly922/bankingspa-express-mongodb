function Login(){
    const ctx = React.useContext(UserContext)
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [signedIn, setSignedIn] = React.useState(false);
    const [valid, setValid] = React.useState(true);

    const handleLogin = () => {
        const url = `account/login/${email}/${password}`
        let account = undefined;
        fetch(url)
            .then((response) => response.json())
            .then((user) => {
                if (!user) {
                    setValid(false);
                    return;
                }
                delete user.password;
                ctx.account = user;
                ctx.loggedIn = true;
                setSignedIn(true);
                setValid(true);
            })

        // ctx.users.forEach((user, index) => {
        //     if (email == user.email && password == user.password) {
        //         console.log('logged in')
        //         ctx.account = index;
        //         ctx.loggedIn = true;
        //         setSignedIn(true);
        //         setValid(true);
        //     }
        //     else setValid(false);
        // })
    }

    function logOut(){
        setEmail('');
        setPassword('');
        setSignedIn(false);
        ctx.account = null;
        ctx.loggedIn = false;
    }


    return(
        <React.Fragment>
        <h1>Login</h1>
        <Card 
            bgcolor='primary'
            header='Sign In'
            body={!signedIn && !ctx.loggedIn ? 
                (<React.Fragment>
                    {!valid && (<p color='red'>Email or password is incorrect</p>)}
                    Email<br/>
                    <input type='text' className='form-control' id='email' placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                    Password<br/>
                    <input type='text' className='form-control' id='password' placeholder='Enter Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <button type='submit' className='btn btn-light' onClick={handleLogin}>Login</button>
                </React.Fragment>)
                : (<React.Fragment>
                    You are logged in as {ctx.account.name}
                    <button type='submit' className='btn btn-light' onClick={logOut}>Log out</button>
                </React.Fragment>)
            }
        />
        </React.Fragment>
    )
}