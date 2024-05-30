import { StyleSheet, Text, View, Image } from 'react-native';

const Card = ({ title, icon, style, iconStyle }) => (
  <View style={[styles.card, style]}>
    <Image source={icon} style={[styles.icon, iconStyle]} resizeMode='contain'/>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
    card: {
        width: 164,
        height: 136,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
      },
      icon: {
        width: 136,
        height: 48,
        marginBottom: 10,
      },
      title: {
        fontSize: 12,
        fontWeight: '400',
      },
})

export default Card;