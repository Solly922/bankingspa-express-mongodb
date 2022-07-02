function Home(){
    return(
        <div style={{padding: '1rem'}}>
            <Card
                txtcolor="black"
                header="Bad Bank"
                title="Welcome to Bad Bank"
                text="Rated the best bank by no one!"
                style={{backgroundColor: "#8896ab",
                        padding: "1rem",
                        maxWidth: "50rem"}}
                body={(<img src='real-bank.jpg' className='img-fluid' alt='Responsive bank image'/>)}
            />
        </div>
    )
}