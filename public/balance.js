function Balance(){
    const ctx = React.useContext(UserContext)
    const user = ctx.account;

    return(
        <React.Fragment>
        <h1>Balance<br/>
            {ctx.loggedIn && (`Your balance is $${JSON.stringify(user.balance)}`)}
        </h1>
        <a className='nav-link' href='#/deposit/'>Deposit</a> 
        <a className='nav-link' href='#/withdraw/'>Withdraw</a> 
        </React.Fragment>
    )
}