function RemoveAdmin(){
    const ctx = React.useContext(UserContext)
    const [status, setStatus] = React.useState('');
    const [email, setEmail] = React.useState('');
    const user = ctx.account;

    function handleRemove(){
        let url = `/account/removeadmin/${email}`
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.status)
                switch(data.status){
                    case 'NO_ACC':
                        setStatus('Account not found');
                        break;
                    case 'NOT_ADMIN':
                        setStatus(`${email} is not an admin`);
                        break;
                    case 'SUCC':
                        setStatus(`${email} is no longer an admin`);
                        break;
                }
            })
    }

    return (
        <div style={{padding: '2rem'}}>
            <Card
                status={status}
                header='Remove admin'
                style={{
                        backgroundColor: "#938581",
                        padding: "1rem",
                        maxWidth: "50rem"
                    }}
                body={user.isAdmin && (
                    <React.Fragment>
                        Email<br/>
                        <input type='text' className='form-control' id='email' placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                        <button type='submit' className='btn btn-light' onClick={handleRemove}>Remove Admin</button>
                    </React.Fragment>
                )}
                />
        </div>
    )
}