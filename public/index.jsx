const background = '/bank.png' 

function Spa(){
    return(
        <React.Fragment>
            <HashRouter>
                <UserContext.Provider value={{loggedIn: false, account: {}}}>
                    <NavBar/>
                    <Route path='/' exact component={Home}/>
                    <Route path='/createaccount/' component={CreateAccount}/>
                    <Route path='/login/' component={Login}/>
                    <Route path='/deposit/' component={Deposit}/>
                    <Route path='/withdraw/' component={Withdraw}/>
                    <Route path='/balance/' component={Balance}/>
                    <Route path='/addadmin/' component={AddAdmin}/>
                    <Route path='/removeadmin/' component={RemoveAdmin}/>
                    <Route path='/adjustbalance/' component={AdjustBalance}/>
                    <Route path='/alldata/' component={AllData}/>
                </UserContext.Provider>
            </HashRouter>
        </React.Fragment>
    )
}

ReactDOM.render(<Spa/>, document.getElementById('root'))