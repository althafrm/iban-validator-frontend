import React from 'react';

function Footer({ responseMessage }) {
    const responseStatus = responseMessage?.[0];
    const responseText = responseMessage?.[1];
    console.log(responseStatus, responseText);

    return (
        <div className='footer'>
            <div className={`validation-result ${responseStatus && responseText ? (responseStatus === 1 ? 'valid' : 'invalid') : ''}`}>
                {responseText}
            </div>
        </div>
    );
};

export default Footer;
