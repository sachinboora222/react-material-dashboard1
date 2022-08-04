import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';

import { UsersToolbar, UsersTable } from './components';
import { useGetTeachers } from './data';
import { data } from 'views/Dashboard/components/LatestSales/chart';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));


const UserList = () => {
  
  
  const classes = useStyles();

  const { teachers } = useState(useGetTeachers());

  return (
    <div className={classes.root}>
      { console.log(teachers) }
      <UsersToolbar />
      <div className={classes.content}>
        <UsersTable users={teachers} />
      </div>
    </div>
  );
};

export default UserList;
