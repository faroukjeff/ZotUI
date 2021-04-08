import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import '../App.css';
import toggleDrawer from '../App'
import list from '../App'
import state from '../App'
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Drawer from '@material-ui/core/Drawer';

const NavBar = () => {
    return(
        <div>
        <AppBar position="static" color='primary'>
            <Toolbar>
                <Typography variant="h2" color="inherit" align="right" >
                eeZot UI
                </Typography>
                <div>
      {['bottom'].map((anchor) => (
            <React.Fragment key={anchor}>
            <Button 
            onClick={toggleDrawer(anchor, true)}
            variant="contained" 
            size='small' 
            color="primary" 
            endIcon={<Icon>open_in_new</Icon>}
              >
            </Button>
            <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
    </div>
            </Toolbar>
        </AppBar>
        </div>
    )
}
export default NavBar;