import React from 'react';
import './Loader.css';

export const Loader = (props)=>{
    let {isloading} = props;
    return isloading? (
        <div className="wm-loader">
            <div className="lds-css">
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    ):null;
}

export default Loader;
