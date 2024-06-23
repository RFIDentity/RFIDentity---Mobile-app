import React, { useState, useEffect } from 'react';
import { Button, View, FlatList, Modal, Text, Pressable} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import * as EPManager from './EndPointsManager';
import {Home, getRoomFunctions} from './Rooms';
//import DataWedgeIntents from 'react-native-datawedge-intents';


const Drawer = createDrawerNavigator();

export default function App() {
  const [roomFunctions, setRoomFunctions] = useState([]);
  const [numberOfAssets, setNumberOfAssets] = useState([]);


  const updateData = async () => {
    const areasData = await EPManager.getAreas();
    const _numberOfAssets = areasData.map(area => ({
      name: area.name,
      numberOfAssets: area.numberOfAssets,
    }));
    setNumberOfAssets(_numberOfAssets);

    const roomFuncs = getRoomFunctions(areasData);
    setRoomFunctions(roomFuncs);
  }



  useEffect(() => {
    updateData()
  }, []);


  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home}/>
        {roomFunctions.map((RoomComponent, index) => (
          <Drawer.Screen
            key={index}
            name={numberOfAssets[index]?.name || `Room ${index + 1}`}
            component={RoomComponent}
          />
        ))}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}