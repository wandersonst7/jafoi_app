import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import TabNavigation from './TabNavigation';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <TabNavigation />
    </NavigationContainer>
  );
};

export default RootNavigator;
