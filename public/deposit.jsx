function Deposit(){
    const ctx = React.useContext(UserContext)
    const [amount, setAmount] = React.useState(0);
    const [disabled, setDisabled] = React.useState(true);
    const user = ctx.account;
    const userBalance = user.balance;
    if (ctx.loggedIn) {
        var [balance, setBalance] = React.useState(user.balance);
    }

    const handleSubmit = () => {
        if (amount < 0){
            alert(`Number must be positive`);
            return;
        }
        let url = `/account/deposit/${user.email}/${amount}`
        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                let newBalance = data.balance;
                console.log(`newbalance is ${newBalance}`);
                user.balance = newBalance
                setBalance(newBalance);
            })
    }

    React.useEffect(() => {
        if (amount > 0) setDisabled(false);
        else setDisabled(true);
    })

    return(
        <div style={{padding:'2rem'}}>
        <Card
            header='Deposit'
            style={{
                    backgroundColor: "#466362",
                    padding: "1rem",
                    maxWidth: "50rem",
                }}
            body={ctx.loggedIn && (
                <React.Fragment>
                    Balance {balance}
                    <input type='number' className='form-control' id='deposit' value={amount} placeholder='Deposit Amount' onChange={(e) => setAmount(Number(e.target.value))}/>
                    <button type='submit' className='btn btn-light' onClick={handleSubmit} disabled={disabled}>Deposit</button>
                </React.Fragment>
            )}
        />
        </div>
    )
}