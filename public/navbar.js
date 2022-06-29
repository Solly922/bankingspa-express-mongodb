function NavBar(){
  const ctx = React.useContext(UserContext);
  const [isSignedIn, setIsSignedIn] = React.useState(false);

  React.useEffect(() => {
    checkForLogIn()
  }, [checkForLogIn])

  function logOut() {
    ctx.loggedIn = false;
    ctx.account = {};
    setIsSignedIn(false);
  }

  function checkForLogIn(){
    console.log('Waiting for login')
    let check = setInterval(() => {
      if (ctx.loggedIn) {
        setIsSignedIn(true)
        clearInterval(check)
      }
    }, 500)
  }

  return(
    <React.Fragment>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">BadBank</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          {!isSignedIn && <React.Fragment>
            <li className="nav-item">
              <a className="nav-link" href="#/CreateAccount/">Create Account</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/login/" onClick={checkForLogIn}>Login</a>
            </li>
          </React.Fragment>}
          {isSignedIn && <React.Fragment>
            {console.log(isSignedIn)}
            <li className="nav-item">
              <a className="nav-link" href="#/deposit/">Deposit</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/withdraw/">Withdraw</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/balance/">Balance</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#/alldata/">AllData</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href="#/" onClick={logOut}>Log Out</a>
            </li>
            <li className="nav-item">
              <a className="nav-link">Account: {ctx.account.name}</a>
            </li>          
          </React.Fragment>}
        </ul>
      </div>
    </nav>
    </React.Fragment>
  );
}
