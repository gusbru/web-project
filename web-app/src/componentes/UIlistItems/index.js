import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const mainListItems = ([
  {
    key : "main",
    text : "Dashboard",
    type: <DashboardIcon />
  },
  {
    key : "questoes",
    text : "Questoes",
    type: <ShoppingCartIcon />
  },
  {
    key : "alunos",
    text : "Alunos",
    type: <ShoppingCartIcon />
  },
  {
    key : "reports",
    text : "Reports",
    type: <BarChartIcon />
  },
  {
    key : "logout",
    text : "Sair",
    type: <LayersIcon />
  },
]);

export const secondaryListItems = ([
  {
    key : "CurrentMonth",
    text : "Current month",
    type: <AssignmentIcon />
  },
  {
    key : "LastQuarter",
    text : "Last quarter",
    type: <AssignmentIcon />
  },
  {
    key : "Year-endSsale",
    text : "Year-end sale",
    type: <AssignmentIcon />
  },
]);