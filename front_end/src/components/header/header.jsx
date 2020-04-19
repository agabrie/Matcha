import React from 'react';
import matchaLogo from './matcha_logo.png'

export class Header extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className='container center'>
                <nav className='menu'>
                    <h1 style={{
                      backgroundImage: 'url(' + matchaLogo + ')'
                    }} className='menu_logo'></h1>

                    <div className='menu_right'>
                        <ul className='menu_list'>
                            <li className='menu_list_item'><a className='menu_link' href='#'>About</a></li>
                            <li className='menu_list_item'><a className='menu_link' href='#'>Contact us</a></li>
                            <li className='menu_list_item'><a className='menu_link' href='#'>Reviews</a></li>
                        </ul>
                    </div>
                </nav>
            </div>
        );
    }
}