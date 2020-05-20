import React from 'react';
import {CircularProgress,Box} from '@material-ui/core'

function LoadingScreen() {
    return (
    <Box display="flex" justifyContent="center">
        <CircularProgress/>
    </Box>)
}

export default LoadingScreen;