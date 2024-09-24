import { StyleSheet, Image } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import RecForm from '../components/recform';

export default function TabThreeScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo}
        source={require('../../assets/images/logo2.png')}
      />
      <Text style={styles.title}>
        Appointment Details
      </Text>
      <View style={styles.separator} lightColor="#000" darkColor="#000000" />
      <RecForm/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#d5b60a",
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    fontFamily: "Cochin",
    color: "#000000",
    alignSelf: 'center',
  },
  text: {
    top: 3,
    fontSize: 15,
    fontWeight: '400',
    fontFamily: "Cochin",
    color: "#000000",
  },
  separator: {
    marginVertical: 30,
    height: 2,
    width: '90%',
    alignSelf: 'center',
  },
  logo: {
    alignSelf: 'center',
    transform: [{scale: 0.3}],
    top: 1, 
    width: 200,
    height: 160,
    margin: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  
});
