import * as React from 'react';
import './Header.scss';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <div className="logo">header</div>
            <div className="controlls">
                <Link
                    to={'/personal'}
                    className='header-link'
                >
                    To personal
                </Link>
                <Link
                    to={'/'}
                    className='header-link'
                >
                    To main
                </Link>
            </div>
        </header>
    );
}

export default Header;