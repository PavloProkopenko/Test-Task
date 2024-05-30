import { StyleSheet, View, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';
import Icon from "./assets/img/icon.png"

export default function SplashScreen() {
    return (
        <View style={styles.container}>
            <View>
                <Image source={Icon} style={styles.icon}/>
            </View>
            <StatusBar style="auto" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor: "#ffffff"
    },
    icon: {
        height: 178,
        width: 178
    }
})