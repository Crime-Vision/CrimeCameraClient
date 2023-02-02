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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PropTypes from 'prop-types';

import Map from "./Map.jsx

import { createTheme } from '@mui/material/styles';

function TabPanel(props) {
  const { children, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      className="tabPanel"
      {...other}
    >
      {children}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function ButtonAppBar(props) {

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTabClick = (event, newValue) => {
    props.app.setState({ selectedTab: newValue });
  });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" elevation={24}>
        <Toolbar sx={{ paddingLeft: "0px", marginLeft: "0px"  }}>
          <div className="logoContainer">
            <img className="logo" src="https://uploads-ssl.webflow.com/63792297b322091a012c3076/63cf04431f883aa181821672_CrimeVision_LogoOnly-p-500.png" />
          </div>
          
          <div className="MenuButtonContainer">
            <Tabs 
              value={props.app.state['selectedTab']}
              onChange={handleTabClick} >
              <Tab value="map" label="Map" {...a11yProps("calls")} />
              <Tab value="video-wall" label="Video Wall" {...a11yProps("video-wall")}/>
              <Tab value="admin" label="Camera Administration" {...a11yProps("admin")} />
            </Tabs>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: "map"
    }
  }

  render() {
    return (
      <Grid container sx={{height: '100%'}}>

        <Grid item xs={12}>
          <ButtonAppBar app={this}/>
          <TabPanel index="map" style={this.state["selectedTab"] != 'map' ? {display: 'none'} : {display: 'block'} }>
            <Map nodes={[]}></Map>
          </TabPanel>
          <TabPanel index="video-wall" style={this.state["selectedTab"] != 'video-wall' ? {display: 'none'} : {display: 'block'} } >
            <iframe src={`http://${process.env.RTSPTOWEB_HOST_AND_PORT}/pages/multiview/full?controls`} style={{width: "100%", height: "100%"}} />
          </TabPanel>
          <TabPanel index="admin" style={this.state["selectedTab"] != 'admin' ? {display: 'none'} : {display: 'block'} }>
            <iframe src={`http://${process.env.API_HOST_AND_PORT || 'localhost:3000/admin/resources/Nodes'}/`} style={{width: "100%", height: "100%"}} />
          </TabPanel>
        </Grid>

      </Grid>
    );
  }
}

export default App;
