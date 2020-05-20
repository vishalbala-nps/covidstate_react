import React from 'react';
import Alert from '@material-ui/lab/Alert';

function ErrorScreen() {
    return (<Alert severity="warning">An Error Occured while loading the data. Please try again soon</Alert>)
}

export default ErrorScreen;