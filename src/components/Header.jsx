import React from 'react';
import { connect } from 'react-redux';
import { getCartList, searchByTitle, userSignOut } from "../actions";
import { Link, withRouter } from 'react-router-dom';
import SubHeader from './SubHeader';

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            searchKey: ""
        }
    }
    render() {
        const { isOpen, searchKey } = this.state;
        let title = this.props.location.pathname === "/pr/my-list" ? "List" : "";

        console.log(" this.state.isOpen : ", isOpen);
        console.log(" this.state.searchKey : ", searchKey);
        console.log("this.props ~~~~~~~~~~~", this.props);
        return (
            <div className="pinning-header">
                <div className="pinning-header-container">
                    <div className="main-header has-billboard menu-navigation" role="navigation">
                        <Link to="/pr" aria-label="Netflix" className="logo">
                            <img src="/assets/media/logo.svg" alt="" />
                        </Link>
                        <ul className="tabbed-primary-navigation">
                            <li className="navigation-menu">
                                <Link to="/pr" className="menu-trigger" role="button" aria-haspopup="true" tabIndex="0">
                                    <span className="v-align-inherit">
                                        <span className="v-align-inherit">Browse</span>
                                    </span>
                                </Link>
                            </li>
                            <li className="navigation-tab">
                                <Link to="/Kids" className="current">
                                    <span className="v-align-inherit">
                                        <span className="v-align-inherit">Home page</span>
                                    </span>
                                </Link>
                            </li>
                            <li className="navigation-tab">
                                <Link to="/browse/genre/2496491">
                                    <span className="v-align-inherit">
                                        <span className="v-align-inherit">Series</span>
                                    </span>
                                </Link>
                            </li>
                            <li className="navigation-tab">
                                <Link to="/browse/genre/2495600">
                                    <span className="v-align-inherit">
                                        <span className="v-align-inherit">Movies</span>
                                    </span>
                                </Link>
                            </li>
                            <li className="navigation-tab">
                                <Link to="/pr/latest">
                                    <span className="v-align-inherit">
                                        <span className="v-align-inherit">The Newests</span>
                                    </span>
                                </Link>
                            </li>
                            <li className="navigation-tab">
                                <Link to="/pr/my-list">
                                    <span className="v-align-inherit">
                                        <span className="v-align-inherit">List</span>
                                    </span>
                                </Link>
                            </li>
                        </ul>
                        <div className={`secondary-navigation search-focused`}>
                            <div className="nav-element">
                                <div className="searchBox">
                                    {
                                        isOpen ?
                                            <div className="searchInput">
                                                <span className="icon-search"></span>
                                                <input type="text"
                                                    name="searchInput"
                                                    placeholder="name, category, character"
                                                    data-search-input="true"
                                                    data-uia="search-box-input"
                                                    maxLength="80"
                                                    value={this.state.searchKey}
                                                    onChange={(ev) => this.setState({ searchKey: ev.target.value })}
                                                />
                                                <span className="icon-close" onClick={() => this.setState({ isOpen: false })} />
                                            </div>
                                            : <button className="searchTab" tabIndex="0" aria-label="Search" data-uia="search-box-launcher"
                                                onClick={() => this.setState({ isOpen: true })} >
                                                <span className="icon-search"></span>
                                            </button>
                                    }
                                </div>
                            </div>
                            <div className="nav-element">
                                <div className="account-menu-item">
                                    <div className="account-dropdown-button">
                                        <span className="profile-link" role="presentation" style={{ cursor: "default"}}>
                                            <img className="profile-icon"
                                                src="https://occ-0-1009-3934.1.nflxso.net/dnm/api/v6/Z-WHgqd_TeJxSuha8aZ5WpyLcX8/AAAABWYjLL1WmaA68UglG6WrAeDFzuyEjz8aH5nfgiud9DqVyj8sU0T_oiToyGiNf06N0oLKd9Qeaze4sEBU2koUnWY.png?r=8f0"
                                                alt="" />
                                        </span>
                                        <div className="exit-kids" onClick={this.props.userSignOut}>
                                            <span className="v-align-inherit">
                                                <span className="v-align-inherit">Log Out</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* sub header */}
                    {title === "" ? null : <SubHeader title={title} />}
                    {/* end sub header */}

                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ auth }) => {
    const { authUser } = auth;
    return { authUser }
};
const mapDispatchToProps = { searchByTitle, userSignOut };
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));