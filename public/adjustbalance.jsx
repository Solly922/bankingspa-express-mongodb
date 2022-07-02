function AdjustBalance(){
    const ctx = React.useContext(UserContext);
    const [email, setEmail] = React.useState('');
    const [amount, setAmount] = React.useState('');
    const [status, setStatus] = React.useState('');
    const user = ctx.account;

    function handleSubmit(){
        const url = `/account/adjust/${email}/${amount}`;
        fetch(url)
            .then(response => response.json())
            .then((data) => {
                switch(data.status){
                    case 'BAD_NUM':
                        setStatus('Not a valid number');
                        break;
                    case 'SUCC':
                        setStatus(`${email} balance is now: ${amount}`);
                        break;
                }
            })
    }

    return(
        <div style={{padding: '2rem'}}>
            <Card
                status={status}
                header='Adjust balance'
                style={{
                        backgroundColor: "#938581",
                        padding: "1rem",
                        maxWidth: "50rem"
                    }}
                body={user.isAdmin && (
                    <React.Fragment>
                        User's Email<br/>
                        <input type='text' className='form-control' id='email' placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input><br/>
                        <input type='number' className='form-control' id='amount' placeholder="Amount to set" onChange={(e) => setAmount(e.target.value)}></input>
                        <button type='submit' className='btn btn-light' onClick={handleSubmit}>Set Balance</button>
                    </React.Fragment>
                )}
                />
        </div>
    )
}