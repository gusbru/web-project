import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import request from 'superagent';
import { withRouter, Redirect } from "react-router-dom";

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import LayersIcon from '@material-ui/icons/Layers';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';


import { mainListItems, secondaryListItems } from '../../componentes/UIlistItems';
import UISimpleTable from '../../componentes/UISimpleTable';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
  username: {
    textAlign: "center"
  }
});

class UIDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: this.props.location.state.authenticated,
      username: this.props.location.state.username,
      open: true,
      questionsInformations: [],
    };
  }
  

  componentDidMount() {
    request
    .get('http://localhost:3005/api/questoes')
    .then(res => this.setState({questionsInformations: res.body}))
    .catch(err => console.log(err));

  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  handleDrawerClick = (event) => {
    console.log("drawer clicked", event);
    if (event === "Sair") {
      localStorage.setItem("token", "");
      this.setState({
        authenticated: false
      });
    }
  }

  checkAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (token === null || token === "") {
      this.setState({
        authenticated: false
      })
    } else {
      this.setState({
        authenticated: true
      })
    }
  }

  render() {
    const { classes } = this.props;
    const { questionsInformations } = this.state;

    if (this.state.authenticated === false) {
      return(<Redirect to="/" />);
    }

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(
                classes.menuButton,
                this.state.open && classes.menuButtonHidden,
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Questões
            </Typography>
            <IconButton color="inherit">
              <Badge badgeContent={questionsInformations.length} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          {this.state.open &&
            <div className={classes.username}>
              <p>Bem vindo</p>
              <p>{this.state.username.toUpperCase()}</p>
            </div>
          }
          <Divider />
          <List>
            {mainListItems.map(item =>
              <div key={item.key}>
              <ListItem button onClick={() => this.handleDrawerClick(item.key)}>
                <ListItemIcon>
                  {item.type}
                </ListItemIcon>
                <ListItemText primary={item.text}/>
              </ListItem>
              </div>
            )}
          </List>
          <Divider />
          <List>
            <ListSubheader inset>Saved reports</ListSubheader>
            {secondaryListItems.map(item =>
              <div key={item.key}>
              <ListItem button onClick={() => this.handleDrawerClick(item.key)}>
                <ListItemIcon>
                  {item.type}
                </ListItemIcon>
                <ListItemText primary={item.text}/>
              </ListItem>
              </div>
            )}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          {/*
          <Typography variant="h4" gutterBottom component="h2">
            Products
          </Typography>
          */}
          <div className={classes.tableContainer}>
            <UISimpleTable questoes={questionsInformations} />
          </div>
        </main>
      </div>
    );
  }
}

UIDashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(withRouter(UIDashboard));