import React,{useEffect} from 'react';
import LetterImage from '../../assets/letterF.png';
import { Link } from 'react-router-dom';
import { useAlert } from 'react-alert';

 const Home = () => {
    const alert = useAlert()
     useEffect(() => {
        alert.show('Click the IMAGE!')
     }, [])
    return (
        <div>
            <div>
                <Link to='/login' ><img src={LetterImage} class="ui fluid image" style={{position:'fixed'}}/></Link>
            </div>
            
        </div>
    )
}

export default Home;