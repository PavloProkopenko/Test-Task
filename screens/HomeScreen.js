import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import Arrow from "../assets/img/orange_arrow.png";

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your name</Text>
        <Text style={styles.userName}>Jhon doe</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Test task</Text>
        <Text style={styles.cardSubtitle}>Lorem ipsum</Text>
        <TouchableOpacity style={styles.cardButton}>
          <Text style={styles.cardButtonText}>Go to call</Text>
          <Image source={Arrow} style={styles.arrowImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Before you Start</Text>
      </View>
      <ScrollView horizontal = {true} style={styles.cardContainer}>
        <View style={styles.smallCard}>
          <Text style={styles.cardTitle}>Lorem ipsum</Text>
          <Text style={styles.cardSubtitle}>lorem ipsum</Text>
          <Text style={styles.cardSteps}>2 steps</Text>
        </View>
        <View style={styles.smallCard}>
          <Text style={styles.cardTitle}>Lorem ipsum</Text>
          <Text style={styles.cardSubtitle}>lorem ipsum</Text>
          <Text style={styles.cardSteps}>3 steps</Text>
        </View>
      </ScrollView>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Posts</Text>
      </View>
      <View style={styles.postContainer}>
      <View style={styles.smallCard}>
          <Text style={styles.cardTitle}>Lorem ipsum</Text>
          <Text style={styles.cardSubtitle}>lorem ipsum</Text>
          <Text style={styles.cardSteps}>3 steps</Text>
        </View>
        <View style={styles.smallCard}>
          <Text style={styles.cardTitle}>Lorem ipsum</Text>
          <Text style={styles.cardSubtitle}>lorem ipsum</Text>
          <Text style={styles.cardSteps}>3 steps</Text>
        </View>
        <View style={styles.smallCard}>
          <Text style={styles.cardTitle}>Lorem ipsum</Text>
          <Text style={styles.cardSubtitle}>lorem ipsum</Text>
          <Text style={styles.cardSteps}>3 steps</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const Portfolio = () => (
  <View style={styles.center}>
    <Text>Portfolio</Text>
  </View>
);
const Search = () => (
  <View style={styles.center}>
    <Text>Search</Text>
  </View>
);
const Profile = () => (
  <View style={styles.center}>
    <Text>Profile</Text>
  </View>
);

const HomeScreen = () => {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home";
            } else if (route.name === "Portfolio") {
              iconName = focused ? "briefcase-outline" : "briefcase-outline";
            } else if (route.name === "Search") {
              iconName = focused ? "search" : "search";
            } else if (route.name === "Profile") {
              iconName = focused ? "person-outline" : "person-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Portfolio"
          component={Portfolio}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f3f5",
  },
  gradient: {
    flex: 1,
  },
  header: {
    backgroundColor: "#FA8A34",
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    color: "white",
    fontSize: 15,
  },
  userName: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardSubtitle: {
    color: "#606773",
    marginVertical: 5,
  },
  cardButton: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  arrowImage: {
    height: 24,
    width: 24,
  },
  cardButtonText: {
    color: "#FA8A34",
    fontSize: 14,
  },
  sectionHeader: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#606773",
    fontWeight: "400",
    marginTop: 32,
  },
  cardContainer: {
    marginHorizontal: 20,
  },
  smallCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    flex: 1,
    marginHorizontal: 5,
  },
  cardSteps: {
    marginTop: 10,
    color: "#FA8A34",
  },
  postContainer: {
    marginHorizontal: 20,
  },
  postCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    marginVertical: 10,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  postContent: {
    color: "#606773",
    marginTop: 10,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;