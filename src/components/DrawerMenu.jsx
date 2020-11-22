import { Button, Icon } from 'native-base';
import React from 'react';

const DrawerMenu = ({scene}) => (
    <Button transparent onPress={()=> (scene.descriptor.navigation.openDrawer())} style={{top: 20}}>
      <Icon name="menu" style={{color: "#000", width: 50, height: 50 }} />
    </Button>
  );

  export default DrawerMenu;