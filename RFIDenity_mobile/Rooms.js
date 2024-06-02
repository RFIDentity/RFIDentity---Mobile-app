import React, { useState, useEffect } from 'react';
import { Button, View, FlatList, Modal, Text, Pressable} from 'react-native';

export const getRoomFunctions = (data) => {
    return data.map((item) => {
      const roomName = item.name;
      return function RoomComponent() {
        return <RoomScreen key={roomName} numberOfAssets={item.numberOfAssets}/>;
      };
    });
  };

export function Home({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>What's the front?</Text>
        <Button title="Some Button"></Button>
      </View>
    );
  }

export function RoomScreen({ navigation, numberOfAssets}) {
const [modalVisible, setModalVisible] = useState(false);
const [numberOfCheckedItems, setNumberOfCheckedItems] = useState(0)
const [numberOfTotalItems, setNumberOfTotalItems] = useState(numberOfAssets)

function ShowItemDetails(item) {
    setSelectedItem(item);
    setModalVisible(true);
}

return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
        <Text style={{ marginRight: 10 }}>{numberOfCheckedItems} / {numberOfTotalItems}</Text>
      </View>
      
      {/* Rest of your component */}
    </View>
  );
}

