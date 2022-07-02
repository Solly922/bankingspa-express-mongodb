function Balance(){
    const ctx = React.useContext(UserContext)
    const user = ctx.account;

    return(
        <div style={{padding: '2rem'}}>
        <h1 className="h1 rounded" style={{backgroundColor: '#c5d5e4', maxWidth: '75rem', margin: 'auto', padding: '1rem'}}>Balance<br/>
            {ctx.loggedIn && (`Your balance is $${JSON.stringify(user.balance)}`)}
        </h1>
        <div style={{textAlign: 'center'}}>
            <button type='button' className="btn" style={{backgroundColor: '#c5d5e4', width: '50%', marginTop: '10px', position: 'relative'}}><a className='nav-link' href='#/deposit/'>Deposit</a></button><br/>
            <button type='button' className="btn" style={{backgroundColor: '#c5d5e4', width: '50%', marginTop: '10px', position: 'relative'}}><a className='nav-link' href='#/withdraw/'>Withdraw</a></button>
        </div>
        
        </div>
    )
}