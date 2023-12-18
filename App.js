import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { MyContextControllerProvider } from './src/context';
import Router from "./src/screens/Router"
const App =()=>{
  return(
    <MyContextControllerProvider>
      <NavigationContainer>
        <Router/>
      </NavigationContainer>
    </MyContextControllerProvider>
  )
}
export default App;