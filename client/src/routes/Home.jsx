import React from 'react'
import Header from '../components/Header'
import NavBar from '../components/NavBar'

const Home = () => {
    return (
        <div>
            <NavBar/>
            <Header/>
            <div>
                <a href="https://www.gov.pl/web/szczepimysie"><img src="szczepienie.png" className="mt-4 img-fluid" alt="Responsive image"/></a>
            </div>
        </div>
    )
}

export default Home
