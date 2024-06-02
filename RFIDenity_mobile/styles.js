import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
    upperListButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      paddingHorizontal: '20%',
      paddingVertical: '5%',
      backgroundColor: "#CCCCCC"
    },
    itemList: {
      alignItems: 'center',
      padding: 20,
      backgroundColor: "#CCCCCC",
      margin: '5%',
      height: '85%'
    },
    item: {
      marginVertical: '2%',
      fontSize: 20,
      backgroundColor: 'grey',
      color: "grey",
      padding: 5
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 20,
      alignItems: 'left',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
  });

  export default styles;