import React from 'react';
import Alert from '@material-ui/lab/Alert';

function ErrorScreen() {
    return (<Alert severity="warning" data-testid="errorscreen">An Error Occured while loading the data. Please try again soon</Alert>)
}

export default ErrorScreen;