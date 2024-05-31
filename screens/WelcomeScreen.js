import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, View, FlatList, TouchableOpacity, Button} from 'react-native';
import Card from "../components/Card"
import Waves from "../assets/img/bgwaves.png"

const Separator = () => <View style={styles.separator}/>

const DATA = [
  { id: '1', title: '', icon: require('../assets/img/bitcoin.png') },
  { id: '2', title: 'Crowd lending', icon: require('../assets/img/crowd_landing.png') },
  { id: '3', title: 'Crowd real estate', icon: require('../assets/img/crowd_real_estate.png') },
  { id: '4', title: 'Commodities', icon: require('../assets/img/commodities.png') },
  { id: '5', title: 'ETFs', icon: require('../assets/img/etfs.png') },
  { id: '6', title: 'Crypto', icon: require('../assets/img/crypto.png') },
];

export default function WelcomeScreen({navigation}) {
  const renderItem = ({ item, index }) => {
    const cardStyle = item.id === '1' ? styles.specialCard : {}; 
    const iconStyle = item.id === '1' ? styles.specialIcon : {}; 
    const columnStyle = index % 2 === 1 && item.id === '1'  ? styles.secondColumn : {}; 
    return (
      <Card title={item.title} icon={item.icon} style={[cardStyle, columnStyle]} iconStyle={iconStyle} />
    );
  };

  return (
    <View style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={2}
          contentContainerStyle={styles.list}
        />
        <View style={styles.bottom}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('SignIn')}  
            style={styles.signInButton}
          >
            <Text style={styles.signInText}>Sign In</Text>
          </TouchableOpacity>
          <Separator />
          <TouchableOpacity 
            onPress={() => navigation.navigate('SignUp')}  
            style={styles.signUpButton}
          >
            <Text style={styles.signUpText}>Sign up</Text>
          </TouchableOpacity>
          <Image source = {Waves} style = {styles.imageBackground}/>
        </View>
        <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f3f5',
    paddingTop: 50,
    position: 'relative'
  },
  list: {
    alignItems: 'center'
  },
  bottom: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  signInButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 25,
    backgroundColor: 'transparent',

  },
  signInText: {
    color: '#FA8A34',
    fontSize: 15,
    fontWeight: '600'
  },
  signUpButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 343,
    radius: 16,
    backgroundColor: '#FA8A34',
    marginBottom: 24,
    borderRadius: 16,
  },
  signUpText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600'
  },
  separator: {
    marginVertical: 10,
  },
  specialCard: {
    backgroundColor: '#FA8A34',
  },
  imageBackground: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 388,
    justifyContent: 'flex-end',
    zIndex: -1,
  },
  specialIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 81.58,
    marginTop: 40,
    marginBottom: 27
  },
  secondColumn: {
    marginTop: 74
  }
});
