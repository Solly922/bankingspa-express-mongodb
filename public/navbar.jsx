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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark" >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">BadBank</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
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
              {ctx.account.isAdmin && (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id='navbarDropdown' role='button' data-bs-toggle="dropdown" aria-expanded="false">Admin</a>
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li><a className="dropdown-item" href="#/addadmin/">Add admin</a></li>
                    <li><a className="dropdown-item" href="#/removeadmin/">Remove admin</a></li>
                    <li><a className="dropdown-item" href="#/adjustbalance/">Adjust balance</a></li>
                    <li>
                      <a className="dropdown-item" href="#/alldata/">AllData</a>
                    </li>
                  </ul>
                </li>
              )}
              <li className='nav-item'>
                <a className='nav-link' href="#/" onClick={logOut}>Log Out</a>
              </li>
              <li className="nav-item">
                <a className="nav-link">Account: {ctx.account.name}</a>
              </li>          
            </React.Fragment>}
          </ul>
        </div>
      </div>
    </nav>
    </React.Fragment>
  );
}
