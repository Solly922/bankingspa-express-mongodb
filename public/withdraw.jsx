function Withdraw(){
    const ctx = React.useContext(UserContext)
    const [amount, setAmount] = React.useState(0);
    const [disabled, setDisabled] = React.useState(true);
    const user = ctx.account;
    const userBalance = user.balance;
    if (ctx.loggedIn) {
        var [balance, setBalance] = React.useState(user.balance);
    }

    const handleSubmit = () => {
        if (user.balance - amount >= 0){
            const url = `/account/withdraw/${user.email}/${amount}`;
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    let newBalance = data.balance;
                    console.log(`newbalance is ${newBalance}`);
                    user.balance = newBalance;
                    setBalance(newBalance);
                })
            return;
        }
        alert(`Insufficient funds`)
    }

    React.useEffect(() => {
        if (amount > 0) setDisabled(false);
        else setDisabled(true);
    })

    return(
        <div style={{padding: '2rem'}}>
        <Card
            header='Withdraw'
            style={{
                    backgroundColor: "#466362",
                    padding: "1rem",
                    maxWidth: "50rem",
                }}
            body={ctx.loggedIn && (
                <React.Fragment>
                    Balance {balance}
                    <input type='number' className='form-control' id='withdraw' value={amount} onChange={(e) => setAmount(Number(e.target.value))}/>
                    <button type='submit' className='btn btn-light' onClick={handleSubmit} disabled={disabled}>Withdraw</button>
                </React.Fragment>
            )}
        />
        </div>
    )
}
