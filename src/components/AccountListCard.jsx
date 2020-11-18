import React from 'react';
import { Card } from 'react-native-elements';
import AccountPreviewItem from './AccountPreviewItem';

const AccountListCard = ({data=[], type="", navigation=null}) => (
    <Card containerStyle={{padding: 0, display: "flex", flex:1, width:"100%",}} >
    { data.map((item, i) => (
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