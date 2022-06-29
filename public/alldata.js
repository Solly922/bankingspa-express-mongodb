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
        <h1>All Data in Store<br/>
            {data}
            {JSON.stringify(ctx)}
        </h1>
    )
}