import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';

import NavLogo from '../assets/logo/serene-logo-new-main.jpg';
import LogoLong from '../assets/logo/SereneLogoRevisedHoriz.png';

function NavBar() {
  
  const navigate = useNavigate();
  console.log(window.location.pathname);
  const [visible, setVisible] = React.useState(false)
  if(window.location.pathname === '/') {
    navigate(0);
    return null
  } else {
    // return (
    //   <Navbar className='nav' collapseOnSelect expand="lg" bg="" style={{marginBottom:"50px"}}>
    //   <Navbar.Brand as={Link} to="/" className='nav-logo'><img src={LogoLong} className="logo-long " size='small' alt='logo'/></Navbar.Brand>
    //       <Navbar.Toggle aria-controls="responsive-navbar-nav" className=''/>
    //       <Navbar.Collapse id="responsive-navbar-nav">
    //       <Nav className="me-auto main-nav-items">
    //         <Nav.Link className='' as={Link} to="/shop">Shop</Nav.Link>
    //         <Nav.Link className='' as={Link} to="/gallery">Gallery</Nav.Link>
    //         <Nav.Link className='' as={Link} to="/lookbook">Lookbook</Nav.Link>
    //       </Nav>   
    //       </Navbar.Collapse>
    //       <Nav>
    //         <Nav.Link className='' as={Link} to="/cart">Cart</Nav.Link>
    //       </Nav>
    //   </Navbar>
    // )

  return (
    <Grid columns={1}>
      <Grid.Column>
        <Button
          onClick={visible}
          label="Nav"
          onChange={(e, data) => setVisible(data.checked)}
        />
      </Grid.Column>

      <Grid.Column>
        <Sidebar.Pushable as={Segment}>
          <Sidebar
            as={Menu}
            animation='overlay'
            icon='labeled'
            inverted
            onHide={() => setVisible(false)}
            vertical
            visible={visible}
            width='thin'
          >
            <Menu.Item as='a'>
              <Icon name='home' />
              Home
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='gamepad' />
              Games
            </Menu.Item>
            <Menu.Item as='a'>
              <Icon name='camera' />
              Channels
            </Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={visible}>
            <Segment basic>
              <Header as='h3'>Application Content</Header>
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Grid.Column>
    </Grid>
  )
  }
}

export default NavBar;
