import React, { Component } from 'react';
import Identicon from 'identicon.js';

export default class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <a
                    className="navbar-brand col-sm-3 col-md-2 mr-0 ms-3"
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Ethereum Social Network
                </a>
                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap d-none d-sm-block">
                        <small className="text-secondary">
                            <span>{this.props.account}</span>
                        </small>
                        {this.props.account
                            ? <img
                                alt="identicon"
                                className="ms-2"
                                width="30"
                                height="30"
                                src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
                            />
                            : <span></span>}
                    </li>
                </ul>
            </nav>
        )
    }
}