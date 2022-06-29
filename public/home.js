function Home(){
    return(
        <Card
            txtcolor="black"
            header="Bad Bank Landing Page"
            title="Welcome to the bank"
            text="You can use this bank"
            body={(<img src='bank.jpg' className='img-fluid' alt='Responsive bank image'/>)}
        />
    )
}