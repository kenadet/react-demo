import {Link} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { clearCurrentUser } from "../redux/actions/user";


const Header = () => {
    const currentUser = useSelector(state => state.user);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = () => {   
        dispatch(clearCurrentUser());
        navigate('/auth');
    }

    return(
    <nav className="navbar navbar-dark bg-dark">
        <div className="container">
            <div className="navbar-brand">
                <i className="fas fa-book fa-2x"></i>
                <span className="h4 navbar-brand-mb">
                NotesManager
                {/* <Link to="/notes" style={{ textDecoration: 'none', color: '#ffffff'}}>NotesManager</Link>        */}
               </span>

            </div>
            {currentUser &&
            <div className="navbar-nav ms-auto">
                  <span className="navbar-text text-light">{currentUser.firstName + ' ' + currentUser.lastName}, you are logged in.
                  <Link to="/auth" onClick={logout} className="mx-4"><i className="fas fa-sign-out-alt fa-1x"></i></Link>
                  </span>
            </div>
            }
        </div>
    </nav>
    )
}

export default Header