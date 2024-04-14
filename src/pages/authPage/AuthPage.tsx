import * as React from 'react';
import './AuthPage.scss';
import AuthForm from '../../components/authForm/AuthForm';
import { Link, useLocation } from 'react-router-dom';

interface AuthPageProps {

}

const AuthPage: React.FC<AuthPageProps> = ({ }) => {
    const { pathname } = useLocation();

    return (
        <section className="auth-wrapper">
            <div className="auth-container">
                <div className="logo">
                    Logo
                </div>
                <AuthForm />
                {pathname && pathname === '/registration' ?
                    <p className='inform-form'>
                        Go to <Link className='text-link' to={'/autorise'}>autorise</Link>
                    </p>
                    :
                    <p className='inform-form'>
                        Go to <Link className='text-link' to={'/registration'}>registration</Link>
                    </p>
                }
            </div>
        </section>
    );
}

export default AuthPage;