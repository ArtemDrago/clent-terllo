import * as React from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import './MainPage.scss';
import { Outlet } from 'react-router-dom';

function MainPage() {
    return (
        <main className='app-wrapper'>
            <Header />
            <div className="content">
                <Outlet />
            </div>
            <Footer />
        </main>
    );
}

export default MainPage;