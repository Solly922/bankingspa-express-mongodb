function AddAdmin(){
    const ctx = React.useContext(UserContext)
    const [status, setStatus] = React.useState('');
    const [email, setEmail] = React.useState('');
    const user = ctx.account;

    function handleGive(){
        let url = `/account/giveadmin/${email}`
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.status)
                switch(data.status){
                    case 'NO_ACC':
                        setStatus('Account not found');
                        break;
                    case 'IS_ADMIN':
                        setStatus(`${email} is already admin`);
                        break;
                    case 'SUCC':
                        setStatus(`${email} is now admin`);
                        break;
                }
            })
    }

    return (
        <div style={{padding: '2rem'}}>
            <Card
                status={status}
                header='Add admin'
                style={{
                        backgroundColor: "#938581",
                        padding: "1rem",
                        maxWidth: "50rem"
                    }}
                body={user.isAdmin && (
                    <React.Fragment>
                        Email<br/>
                        <input type='text' className='form-control' id='email' placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                        <button type='submit' className='btn btn-light' onClick={handleGive}>Make Admin</button>
                    </React.Fragment>
                )}
                />
        </div>
    )
}