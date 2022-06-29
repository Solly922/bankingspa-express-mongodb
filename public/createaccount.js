function CreateAccount(){
    const [show, setShow] = React.useState(true);
    const [status, setStatus] = React.useState('');
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [disabled, setDisabled] = React.useState(true);

    function validate(field, label){
        if (label == 'password' && field.length < 8){
            alert(`Password must be at least 8 characters in length`);
            setStatus(`Error: password length`)
            setTimeout(() => setStatus(''), 3000);
            return false;
        }
        if (!field){
            setStatus(`Error: ${label} not filled`);
            //alert(`${label} not filled`)
            setTimeout(() => setStatus(''), 3000);
            return false;
        }
        return true;
    }

    async function handleCreate(){
        const url = `/account/create/${name}/${email}/${password}`;
        console.log(name, email, password);
        if(!validate(name, 'name')) return;
        if(!validate(email, 'email')) return;
        if(!validate(password, 'password')) return;

        let res = await fetch(url);
        let data = await res.json();
        console.log(data)
        setShow(false);
    }

    function clearForm(){
        setName('');
        setEmail('');
        setPassword('');
        setShow(true);
    }

    React.useEffect(() => {
        if (name || email || password) setDisabled(false);
        else setDisabled(true);
    })

    return (
        <Card 
            bgcolor='primary'
            status={status}
            header='Create Account'
            body={show ? (
                <React.Fragment>
                    Name<br/>
                    <input type='input' className='form-control' id='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.currentTarget.value)}/><br/>
                    Email address<br/>
                    <input type='input' className='form-control' id='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.currentTarget.value)}/><br/>
                    Password<br/>
                    <input type='input' className='form-control' id='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.currentTarget.value)}/><br/>
                    <button type='submit' className='btn btn-light' onClick={handleCreate} disabled={disabled}>Create Account</button>
                </React.Fragment>
            ):(
                <React.Fragment>
                    <h5>Success</h5>
                    <button type='submit' className='btn btn-light' onClick={clearForm}>Add another account</button>
                </React.Fragment>
            )}
        />
    )
}