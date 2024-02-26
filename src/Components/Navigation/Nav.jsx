import { Link } from 'react-router-dom';
import Logo from '../Images/CRUD_2.png';
import './Nav.css';

export default function Nav()
{
    return(
        <div className='navi'>
            <input type='checkbox' id='check'/>
            <label for="check" className='checkbtn'>
            <i className="fa fa-bars" aria-hidden="true"></i>
            </label>
            <ul>
            <li><img alt='CRUD Logo' className='logo' src={Logo}/></li>
            <li><Link to={"/Department"}>Department</Link></li>
            <li><Link to={"/Employee"}>Employee</Link></li>
            </ul>
        </div>
    );
}