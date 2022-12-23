import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keyword }) => {
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name='description' content={description} />
                <meta name='keyword' content={keyword} />
            </Helmet>
        </>

    )
}
Meta.defaultProps = {
    title: 'Welcome To YYShop | Home',
    description: 'We wil see the best products',
    keyword: 'buy the best products',
}


export default Meta