import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import DataWedgeIntents from 'react-native-datawedge-intents';
import { DeviceEventEmitter } from 'react-native';

class Scanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scannedData: '',
    };

    // Listener do obsługi zdarzenia skanowania
    this.scanHandler = (deviceEvent) => {
      this.setState({
        scannedData: deviceEvent.data,
      });

      // Możesz tutaj umieścić dodatkową logikę lub działania na zeskanowanych danych
      console.log('Scanned Data:', deviceEvent.data);
    };

    // Rejestracja listenera dla zdarzenia skanowania
    DeviceEventEmitter.addListener('barcode_scan', this.scanHandler);

    // Rejestracja odbiorcy intentów DataWedge
    DataWedgeIntents.registerReceiver('com.zebra.dwintents.ACTION', '');
  }

  componentWillUnmount() {
    // Usunięcie listenera przy odmontowywaniu komponentu
    DeviceEventEmitter.removeListener('barcode_scan', this.scanHandler);
  }

  render() {
    const { scannedData } = this.state;

    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.rowText}>Scanned Data:</Text>
            <Text style={styles.scannedData}>{scannedData}</Text>
          </View>

          <View style={styles.row}>
            <TouchableOpacity onPress={() => DataWedgeIntents.sendIntent(DataWedgeIntents.ACTION_SOFTSCANTRIGGER, DataWedgeIntents.START_SCANNING)}>
              <Text style={styles.buttonText}>Start Scanning</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => DataWedgeIntents.sendIntent(DataWedgeIntents.ACTION_SOFTSCANTRIGGER, DataWedgeIntents.STOP_SCANNING)}>
              <Text style={styles.buttonText}>Stop Scanning</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5FCFF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rowText: {
    fontSize: 18,
    marginRight: 10,
  },
  scannedData: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    padding: 10,
    backgroundColor: 'lightblue',
    marginHorizontal: 10,
    borderRadius: 5,
  },
});

export default Scanner;
