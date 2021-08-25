import React from "react";
import AccountPreviewItem from "./AccountPreviewItem";
import { Card, View } from "native-base";

const AccountListCard = ({ data = [], type = "", navigation = null }) => (
  <View style={{ margin: 10 }}>
    {data &&
      data.map((item, i) => (
        <AccountPreviewItem
          key={item.id}
          account={item}
          type={type}
          navigation={navigation}
        />
      ))}
  </View>
);

export default AccountListCard;
