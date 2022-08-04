/* eslint-disable linebreak-style */
import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import axios from 'axios';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const schema = {
  firstName: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  lastName: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  fatherOrSpouseFirstName: {
    presence: { allowEmpty: true }
  },
  fatherOrSpouseLastName: {
    presence: { allowEmpty: true }
  },
  address: {
    presence: { allowEmpty: true }
  },
  dob: {
    presence: { allowEmpty: false, message: 'is required' }
  },
  aadharNumber: {
    presence: { allowEmpty: true }
  },
  accountNumber: {
    presence: { allowEmpty: true }
  },
  photo: {
    presence: { allowEmpty: true }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true
  },
  dateOfJoining: {
    presence: { allowEmpty: true }
  },
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      minimum: 6
    }
  },
  positionOfResponsibility: {
    presence: { allowEmpty: true }
  },
  education: {
    presence: { allowEmpty: true }
  },
  salary: {
    presence: { allowEmpty: true }
  },
  SSSMID: {
    presence: { allowEmpty: true }
  },
  policy: {
    presence: { allowEmpty: false, message: 'is required' },
    checked: true
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  policy: {
    marginTop: theme.spacing(1),
    display: 'flex',
    alignItems: 'center'
  },
  policyCheckbox: {
    marginLeft: '-14px'
  },
  createTeacherButton: {
    margin: theme.spacing(2, 0)
  }
}));

const CreateTeacher = props => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }));
  }, [formState.values]);

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }));
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleSignUp = event => {
    event.preventDefault();
    history.push('/');
  };

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;

  // The first commit of Material-UI
  const [selectedDob, setSelectedDob] = React.useState(new Date('08-11-2014'));
  const [selectedDateOfJoining, setSelectedDateOfJoining] = React.useState(new Date('08-11-2014'));

  const handleDobChange = date => {
    setSelectedDob(date);

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        ['dob']: date
      },
      touched: {
        ...formState.touched,
        ['dob']: true
      }
    }));
  };

  const handleDateOfJoiningChange = date => {
    setSelectedDateOfJoining(date);

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        ['dateOfJoining']: date
      },
      touched: {
        ...formState.touched,
        ['dateOfJoining']: true
      }
    }));
  };

  const onSubmitForm = (e) => {
    e.preventDefault();

    const data = {
        name: formState.values.firstName + ' ' + formState.values.lastName,
        fatherOrSpouseName: formState.values.fatherOrSpouseFirstName + ' ' + formState.values.fatherOrSpouseLastName,
        address: formState.values.address,
        dob: formState.values.dob,
        aadharNumber: formState.values.aadharNumber,
        accountNumber: formState.values.accountNumber,
        photo: formState.values.photo,
        email: formState.values.email,
        dateOfJoining: formState.values.dateOfJoining,
        password: formState.values.password,
        positionOfResponsibility: formState.values.positionOfResponsibility,
        education: formState.values.education,
        salary: formState.values.salary,
        SSSMID: formState.values.SSSMID
    }

    console.log(data);

    axios.post('http://localhost:5000/api/admin/createTeacher', data)
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    })
  }

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={5}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography
                className={classes.quoteText}
                variant="h1"
              >
                Hella narwhal Cosby sweater McSweeney's, salvia kitsch before
                they sold out High Life.
              </Typography>
              <div className={classes.person}>
                <Typography
                  className={classes.name}
                  variant="body1"
                >
                  Takamaru Ayako
                </Typography>
                <Typography
                  className={classes.bio}
                  variant="body2"
                >
                  Manager at inVision
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={12}
        >
          <div className={classes.content}>
            <div className={classes.contentHeader}>
              <IconButton onClick={handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <form
                className={classes.form}
                onSubmit={onSubmitForm}
              >
                <Typography
                  className={classes.title}
                  variant="h2"
                >
                  Create new teacher
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                >
                  {/* Use your email to create new account */}
                </Typography>
                <TextField
                  className={classes.textField}
                  error={hasError('firstName')}
                  fullWidth
                  helperText={
                    hasError('firstName') ? formState.errors.firstName[0] : null
                  }
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.firstName || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('lastName')}
                  fullWidth
                  helperText={
                    hasError('lastName') ? formState.errors.lastName[0] : null
                  }
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.lastName || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('fatherOrSpouseFirstName')}
                  fullWidth
                  helperText={
                    hasError('fatherOrSpouseFirstName') ? formState.errors.fatherOrSpouseFirstName[0] : null
                  }
                  label="Father Or Spouse First Name"
                  name="fatherOrSpouseFirstName"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.fatherOrSpouseFirstName || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('fatherOrSpouseLastName')}
                  fullWidth
                  helperText={
                    hasError('fatherOrSpouseLastName') ? formState.errors.fatherOrSpouseLastName[0] : null
                  }
                  label="Father Or Spouse Last Name"
                  name="fatherOrSpouseLastName"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.fatherOrSpouseLastName || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('address')}
                  fullWidth
                  helperText={
                    hasError('address') ? formState.errors.address[0] : null
                  }
                  label="Address"
                  multiline
                  name="address"
                  onChange={handleChange}
                  rows="3"
                  type="text"
                  value={formState.values.address || ''}
                  variant="outlined"
                />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className={classes.textField}
                    disableToolbar
                    error={hasError('dob')}
                    format="MM/dd/yyyy"
                    fullWidth
                    id="dob"
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                    label="D.O.B."
                    margin="normal"
                    name="dob"
                    onChange={handleDobChange}
                    value={selectedDob}
                    variant="inline"
                  />
                </MuiPickersUtilsProvider>
                
                <TextField
                  className={classes.textField}
                  error={hasError('aadharNumber')}
                  fullWidth
                  helperText={
                    hasError('aadharNumber') ? formState.errors.aadharNumber[0] : null
                  }
                  label="Aadhar Number"
                  name="aadharNumber"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.aadharNumber || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('accountNumber')}
                  fullWidth
                  helperText={
                    hasError('accountNumber') ? formState.errors.accountNumber[0] : null
                  }
                  label="Account Number"
                  name="accountNumber"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.accountNumber || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('photo')}
                  fullWidth
                  helperText={
                    hasError('photo') ? formState.errors.photo[0] : null
                  }
                  label="Photo"
                  name="photo"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.photo || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('email')}
                  fullWidth
                  helperText={
                    hasError('email') ? formState.errors.email[0] : null
                  }
                  label="Email address"
                  name="email"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.email || ''}
                  variant="outlined"
                />
                
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    className={classes.textField}
                    disableToolbar
                    name="dateOfJoining"
                    error={hasError('dateOfJoining')}
                    format="MM/dd/yyyy"
                    fullWidth
                    id="dateOfJoining"
                    label="Date Of Joining"
                    margin="normal"
                    onChange={handleDateOfJoiningChange}
                    value={selectedDateOfJoining}
                    variant="inline"
                  />
                </MuiPickersUtilsProvider>
                <TextField
                  className={classes.textField}
                  error={hasError('password')}
                  fullWidth
                  helperText={
                    hasError('password') ? formState.errors.password[0] : null
                  }
                  label="Password"
                  name="password"
                  onChange={handleChange}
                  type="password"
                  value={formState.values.password || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('positionOfResponsibility')}
                  fullWidth
                  helperText={
                    hasError('positionOfResponsibility') ? formState.errors.positionOfResponsibility[0] : null
                  }
                  label="Position Of Responsibility"
                  name="positionOfResponsibility"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.positionOfResponsibility || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('education')}
                  fullWidth
                  helperText={
                    hasError('education') ? formState.errors.education[0] : null
                  }
                  label="Education"
                  name="education"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.education || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('salary')}
                  fullWidth
                  helperText={
                    hasError('salary') ? formState.errors.salary[0] : null
                  }
                  label="Salary"
                  name="salary"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.salary || ''}
                  variant="outlined"
                />
                <TextField
                  className={classes.textField}
                  error={hasError('SSSMID')}
                  fullWidth
                  helperText={
                    hasError('SSSMID') ? formState.errors.SSSMID[0] : null
                  }
                  label="SSSMID"
                  name="SSSMID"
                  onChange={handleChange}
                  type="text"
                  value={formState.values.SSSMID || ''}
                  variant="outlined"
                />
                <div className={classes.policy}>
                  <Checkbox
                    checked={formState.values.policy || false}
                    className={classes.policyCheckbox}
                    color="primary"
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    className={classes.policyText}
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the{' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </div>
                {hasError('policy') && (
                  <FormHelperText error>
                    {formState.errors.policy[0]}
                  </FormHelperText>
                )}
                <Button
                  className={classes.createTeacherButton}
                  color="primary"
                  disabled={!formState.isValid}
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Create teacher now
                </Button>
              </form>
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

CreateTeacher.propTypes = {
  history: PropTypes.object
};

export default withRouter(CreateTeacher);
