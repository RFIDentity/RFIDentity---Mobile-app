import React, { useState, useEffect } from 'react';
import {
  Button,
  View,
  FlatList,
  Modal,
  Text, 
  TextInput, 
  TouchableOpacity,
  DeviceEventEmitter
} from 'react-native';
import { getArea } from './EndPointsManager';

export const getRoomFunctions = (data) => {
    return data.map((item) => {
      const roomName = item.name;
      return function RoomComponent() {
        return <RoomScreen key={roomName} roomName={roomName} numberOfAssets={item.numberOfAssets}/>;
      };
    });
  };

  export function Home({ navigation }) {

  
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>What's the front?</Text>
      </View>
    );
  }

export function RoomScreen({ navigation, roomName, numberOfAssets}) {
const [modalVisible, setModalVisible] = useState(false);
const [numberOfCheckedItems, setNumberOfCheckedItems] = useState(0)
const [numberOfTotalItems, setNumberOfTotalItems] = useState(numberOfAssets)
const [areaData, setAreaData] = useState(null);
const [newStatus, setNewStatus] = useState('');
const [newDescription, setNewDescription] = useState('');
const [selectedItem, setSelectedItem] = useState(null);

async function updateItems() {
  const data = await getArea(roomName)
  if (data != null){ 
    const newAreaData = data.assets
    newAreaData.forEach(element => {
      element['status'] = 'NOT FOUND';
    });
    setAreaData(newAreaData)
  }  
};

useEffect(() => {
  updateItems()
}, [])

function ShowItemDetails(item) {
    setSelectedItem(item);
    setModalVisible(true);
}

const handleStatusChange = () => {
  if (selectedItem) {
    const updatedAreaData = [...areaData];
    const selectedItemIndex = updatedAreaData.findIndex(item => item.asset_id === selectedItem.asset_id);
    updatedAreaData[selectedItemIndex].status = newStatus;
    updatedAreaData[selectedItemIndex].description = newDescription;
    setAreaData(updatedAreaData);
    setModalVisible(false);
  }
};

return (
  <View style={{ flex: 1 }}>
  <Modal
    animationType="slide"
    transparent={true}
    visible={modalVisible}
    onRequestClose={() => {
      setModalVisible(false);
    }}
  >
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
      <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity
            onPress={() => setNewStatus('NOT FOUND')}
            style={{
              padding: 10,
              backgroundColor: newStatus === 'NOT FOUND' ? 'lightblue' : 'white',
              borderRadius: 5,
            }}
          >
            <Text>NOT FOUND</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setNewStatus('FOUND')}
            style={{
              padding: 10,
              backgroundColor: newStatus === 'FOUND' ? 'lightblue' : 'white',
              borderRadius: 5,
            }}
          >
            <Text>FOUND</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setNewStatus('NEW')}
            style={{
              padding: 10,
              backgroundColor: newStatus === 'NEW' ? 'lightblue' : 'white',
              borderRadius: 5,
            }}
          >
            <Text>NEW</Text>
          </TouchableOpacity>
        </View>
        <Text>New Description:</Text>
        <TextInput
          style={{ borderWidth: 1, borderColor: 'gray', marginBottom: 10 }}
          value={newDescription}
          onChangeText={setNewDescription}
        />
        <Button title="Save" onPress={handleStatusChange} />
      </View>
    </View>
  </Modal>

    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', padding: 10 }}>
      <Text style={{ marginRight: 10 }}>{numberOfCheckedItems} / {numberOfTotalItems}</Text>
    </View>

    <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', marginHorizontal: '10%', marginBottom: '10%' }}>
      <TouchableOpacity onPress={updateItems}>
        <Text style={{ padding: 10, backgroundColor: 'lightblue', borderRadius: 5 }}>Refresh</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={{ padding: 10, backgroundColor: 'lightblue', borderRadius: 5 }}>Send</Text>
      </TouchableOpacity>
    </View>

    <FlatList
      data={areaData}
      keyExtractor={(item) => item.asset_id}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => ShowItemDetails(item)}>
        <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc', backgroundColor:
          item.status === 'NOT FOUND' ? 'white' :
          item.status === 'FOUND' ? 'lightgreen' :
          item.status === 'NEW' ? 'yellow' : 'transparent' }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text>{item.description}</Text>
            <Text>{item.status}</Text>
          </View>
          <Text>{item.asset_id}</Text>
        </View>
      </TouchableOpacity>
      )}
    />
  </View>
);
}

