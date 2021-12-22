import React from 'react'
import { Collapse, Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,NavLink,Container } from 'reactstrap'
import { useState } from 'react'

const AppNavbar = () => {
    const [isOpen,setisOpen]=useState(false);
    const toggle=()=>{
        setisOpen(!isOpen);
    }
    return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href='/'>Shopping List</NavbarBrand>
                    <NavbarToggler onClick={toggle}/>
                    <Collapse isOpen={isOpen} navbar >
                        <Nav className='ml-auto' navbar>
                            <NavItem>
                                <NavLink href='http://github.com/bradtraversy'>GitHub</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default AppNavbar
