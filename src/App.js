import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Close from '@material-ui/icons/Close';
import Done from '@material-ui/icons/Done';
import GetApp from '@material-ui/icons/GetApp';
import Menu from '@material-ui/icons/Menu';
import MoreVert from '@material-ui/icons/MoreVert';
import Notifications from '@material-ui/icons/Notifications';
import NotificationsActive from '@material-ui/icons/NotificationsActive';

import { withStyles } from '@material-ui/core/styles';
import * as PXBColors from '@pxblue/colors';
import './style.css';

import alarms, {formatDate} from './alarmData';

class AlarmList extends React.Component {
  constructor(props){
    super(props);
    this.state={
      showMenu: false
    }
  }

  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <AppBar position="fixed">
          <Toolbar>
            <IconButton color="inherit">
              <Menu /> 
            </IconButton>
              <Typography variant="h6" color="inherit" style={{flex: '1 1 0px'}}>
                Basic Bottom Sheet
              </Typography>

            <IconButton color="inherit" onClick={()=>this.setState({showMenu: true})}>
              <MoreVert/> 
            </IconButton>
          </Toolbar>
        </AppBar>
        <List className={classes.list}>
          {
            alarms.map((item, i) => (
                <ListItem key={'item_' + i} className={classes.alarmRow + ' ' + (item.active ? classes.active : '')} >
                  <Avatar className={classes.avatar + ' ' + (item.active ? classes.active : '')}>
                    {item.active ? <NotificationsActive /> : <Notifications/> }
                  </Avatar>
                  <ListItemText 
                    secondary={formatDate(item.date)} 
                    primary={`${item.active ? 'ACTIVE: ' : ''}${item.details}`}
                    primaryTypographyProps={{className: classes.alarmText + ' ' + (item.active ? classes.active : '')}}
                  ></ListItemText>
                </ListItem>
              )
            )
          }
        </List>
        <Drawer 
            anchor={'bottom'}
            transitionDuration={250}
            open={this.state.showMenu} 
            onClose={() => this.setState({showMenu: false})}
            className={classes.drawer}
            classes={{paper: classes.paper}}
        >
          <List style={{padding: 0}}>
            <ListItem className={classes.row} onClick={() => this.setState({showMenu: false})}>
              <ListItemIcon><Done /></ListItemIcon>
              <ListItemText primary={'Acknowledge All'} />
            </ListItem>
            <ListItem className={classes.row} onClick={() => this.setState({showMenu: false})}>
              <ListItemIcon><GetApp /></ListItemIcon>
              <ListItemText primary={'Export'} />
            </ListItem>
            <ListItem className={classes.row} onClick={() => this.setState({showMenu: false})}>
              <ListItemIcon><Close /></ListItemIcon>
              <ListItemText primary={'Cancel'} />
            </ListItem>
          </List>
        </Drawer>
      </React.Fragment>
    );
  }
}

const styles = theme => ({
  list:{
    paddingTop: 0,
    marginTop: theme.spacing.unit * 8,
    [theme.breakpoints.down('xs')]:{
      marginTop: theme.spacing.unit * 7
    }
  },
  alarmRow:{
    borderLeft: theme.spacing.unit*0.5 + 'px solid transparent',
    '&$active':{
      borderColor: '#ff3333'//PXBColors.red['500']
    }
  },
  avatar:{
    color: PXBColors.black['500'],
    background: 'transparent',
    '&$active':{
      color: 'white',
      background: '#ff3333'//PXBColors.red['500']
    }
  },
  alarmText:{
    fontWeight: '600',
    '&$active':{
      color: '#ff3333'//PXBColors.red['500']
    }
  },
  active:{},
  paper:{
    width: '100%',
    maxWidth: 600,
    margin: 'auto',
    userSelect: 'none',
    cursor: 'pointer'
  },
  row:{
    width: '100%',
    '&:hover':{
      backgroundColor: PXBColors.gray['50']
    }
  }
})

export default withStyles(styles)(AlarmList);
