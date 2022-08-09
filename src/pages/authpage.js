import LoginForm from '../components/login'
import RegisterForm from '../components/register'

const AuthPage = () => (
    <div className="row justify-content-between">
        <div className="col-md-6 px-5">
            <LoginForm/>
        </div>

        <div className="col-md-6 border-start border-grey px-5">
            <RegisterForm/>
        </div>
    </div>

);

export default AuthPage;