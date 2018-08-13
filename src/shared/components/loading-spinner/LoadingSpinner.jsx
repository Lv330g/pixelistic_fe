import React from 'react';
import { CircularProgress }  from '@material-ui/core';

export const LoadingSpinner = () => {
    return <div className ="loading-spinner">
        <CircularProgress className="spinner" size={50}/>
    </div>
};
export default LoadingSpinner;
