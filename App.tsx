import * as React from 'react';
import { NativeBaseProvider } from "native-base"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Bingo from './src/home/Bingo';
import PlayGame from './src/home/PlayGame';
import Details from './src/home/Details';
import Mine from './src/mine/Mine';
import { Colors, Metrics } from './src/theme/Index';

const HomeStack = createNativeStackNavigator();
const OtcStack = createNativeStackNavigator();
const SettingsStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Bingo"
    >
      <HomeStack.Screen name="Bingo" component={Bingo} />
      <HomeStack.Screen options={{}} name="Details" component={Details} />
    </HomeStack.Navigator>
  );
}

function OtcStackScreen() {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="PalyGame"
    >
      <SettingsStack.Screen name="PalyGame" component={PlayGame} />
      <SettingsStack.Screen name="Details" component={Details} />
    </SettingsStack.Navigator>
  );
}

function MineStackScreen() {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Mine"
    >
      <SettingsStack.Screen name="Mine" component={Mine} />
      <SettingsStack.Screen name="Details" component={Details} />
    </SettingsStack.Navigator>
  );
}


const getTabBarIcon = (props: any) => {
  const { route, focused, color, size } = props
  let iconName = "cube";
  switch (route.name) {
    case "AccountTab":
      iconName = "folder-sharp";
      break;
    case "OtcTab":
      iconName = "help-buoy-sharp";
      break;
    case "MineTab":
      iconName = "ios-person";
      break;
    default:
      iconName = "cube";
      break;
  }
  return <Ionicons style={{ paddingTop: 2 }} name={iconName} size={size} color={color} />
}

function TabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => getTabBarIcon({ route, focused, color, size }),
        tabBarActiveTintColor: Colors.selectBtn,
        tabBarInactiveTintColor: Colors.ubSelectBtn,
        tabBarStyle: ({ height: 55 }),
        tabBarLabelStyle: ({ fontWeight: '500', fontSize: 14, paddingBottom: 2 }),
        headerShown: false,
        animationEnabled: true,
      })}
    >
      <Tab.Screen options={{ title: "资产" }} name="AccountTab" component={HomeStackScreen} />
      <Tab.Screen options={{ title: "交易" }} name="OtcTab" component={OtcStackScreen} />
      <Tab.Screen options={{ title: "我的" }} name="MineTab" component={MineStackScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer>
        {TabScreen()}
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
