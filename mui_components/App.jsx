import "./App.sass";

// Basic React Imports
import * as React from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";

//MUI Components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Drawer from '@mui/material/Drawer';
import Paper from '@mui/material/Paper';



import Map from "./Map.jsx

function ButtonAppBar() {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={24}>
        <Toolbar sx={{ paddingLeft: "0px", marginLeft: "0px"  }}>
          <div className="logoContainer">
            <img className="logo" src="https://uploads-ssl.webflow.com/63792297b322091a012c3076/63cf04431f883aa181821672_CrimeVision_LogoOnly-p-500.png" />
          </div>
          
          <div className="MenuButtonContainer">
            <Button key="Map" sx={{ my: 2, color: 'white' }} >
              Map
            </Button>
            <span>|</span>
            <Button key="Map" sx={{ my: 2, color: 'white' }} >
              Video Wall
            </Button>
            <span>|</span>
            <Button key="Map" sx={{ my: 2, color: 'white' }} >
              Camera Configuration
            </Button>
            <span>|</span>
            <Button key="Map" sx={{ my: 2, color: 'white' }} >
              Audit Trails
            </Button>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

class App extends React.Component {
  render() {
    return (
      <Grid container sx={{height: '100%'}}>

        <Grid item xs={12}>
          <ButtonAppBar/>
          <Map nodes={[]}></Map>
        </Grid>

      </Grid>
    );
  }
}

export default App;
