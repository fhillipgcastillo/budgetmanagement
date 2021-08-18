import React from 'react';
import AccountPreviewItem from './AccountPreviewItem';
import {Card } from 'native-base';

const AccountListCard = ({data=[], type="", navigation=null}) => (
    <Card style={{padding: 0, display: "flex", flex:1, width:"100%"}} >
    { data && data.map((item, i) => (
        <AccountPreviewItem
            key={item.id}
            account={item}
            type={type}
            navigation={navigation}
        />
    ))
    }
    </Card>
);

export default AccountListCard;
