import React from 'react';
import { StyleSheet, View } from 'react-native';
import Home from './screens/Home'
import CreateEmployee from './screens/CreateEmployee'
import Profile from './screens/Profile'
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator()

const myOptions ={
  title : 'Home',
  headerTintColor : 'white',
  headerStyle : {
    backgroundColor : '#303a52'
  }
};

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={myOptions} />
      <Stack.Screen name="Create" component={CreateEmployee} options={{...myOptions,title : 'Create Emplyee'}} />
      <Stack.Screen name="Profile" component={Profile}  />
    </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303a52',
    // marginTop: Constants.statusBarHeight,//to not let the statusbar ovrlap the container
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});


export default ()=> {
  return(
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}