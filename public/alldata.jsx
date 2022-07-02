function AllData(){
    const ctx = React.useContext(UserContext);
    const [data, setData] = React.useState('');
    React.useEffect(() => {
        // fetch all accounts from api
        fetch('/account/all')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setData(JSON.stringify(data));
            })
    })

    return(
        <h1 style={{
            backgroundColor: '#c5d5e4',
            opacity: '0.7',
            maxWidth: '75%',
            overflowWrap: 'break-word',
            margin: 'auto'
        }}>All Data in Store<br/>
            {ctx.account.isAdmin && data}
            {JSON.stringify(ctx)}
        </h1>
    )
}