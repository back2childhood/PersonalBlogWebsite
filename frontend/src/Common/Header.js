import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { HeaderWrapper, Nav, NavItem, NavSearch, Addition, Button, SearchWarpper } from './style'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Header = () => {

    const [login, setLogin] = useState(false);
    const [keywords, setKeywords] = useState(false);
    const navigate = useNavigate();


    const handleLogout = () => {
        setLogin(false)
    }

    const handleAddExpert = () => {
        navigate('/add');
    }

    const handleSearch = () => {
        navigate('/search/' + keywords);
    }

    return (
        <HeaderWrapper>
            <Nav>
                <Link to='/experts'>
                    <NavItem className='left'>home</NavItem>
                </Link>
                {
                    login ? <NavItem className='right' onClick={handleLogout}>log out</NavItem> : <Link to='/login'><NavItem className='right'>log in</NavItem></Link>
                }
                <SearchWarpper>
                    <CSSTransition
                        timeout={200}
                        classNames="slide"
                    >
                        <NavSearch
                            className="focused"
                            onChange={(e) => setKeywords(e.target.value)}
                        >
                        </NavSearch>
                    </CSSTransition>
                    <Button className="register" onClick={handleSearch}>search</Button>
                    {/* {this.getListArea()} */}
                </SearchWarpper>
            </Nav>
            <Addition>
                <Link to='/add'>
                    <Button className='writing' onClick={handleAddExpert}> add expert</Button>
                </Link>
                <Button className="register">sign up</Button>
            </Addition>
        </HeaderWrapper>
    )

}


export default Header;