import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Menu from "./routes/menu.js";
import Headertop from "./components/header.js";
import Welcome from "./screens/welcome";
import Login from "./screens/login";
import SignUp from "./screens/signUp";
import Home from "./screens/home";
import ConnectMe from "./screens/connectMe";
import Profile from "./screens/profile";
import Help from "./screens/help";
import MatchedProfile from "./screens/matchedProfile";
import GymDetails from './screens/GymDetails';

const HomeStack = createStackNavigator();
const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      <HomeStack.Screen name="GymDetails" component={GymDetails} />
      <HomeStack.Screen name="MatchedProfile" component={MatchedProfile} options={{ title: "You got a Match!"}}/>
    </HomeStack.Navigator>
  );
};

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={Profile}
        options={{ headerMode: "none" }}
      />
    </ProfileStack.Navigator>
  );
};

const HelpStack = createStackNavigator();
const HelpStackScreen = () => {
  return (
    <HelpStack.Navigator>
      <HelpStack.Screen
        name="Help"
        component={Help}
        options={{ headerMode: "none" }}
      />
    </HelpStack.Navigator>
  );
};

const AuthStack = createStackNavigator();
const AuthStackScreen = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Welcome"
        component={Welcome}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ title: "Log In" }}
      />
      <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ title: "Sign Up" }}
      />
    </AuthStack.Navigator>
  );
};

const Tabs = createBottomTabNavigator();
const TabsScreen = () => {
  return (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }}/>
      <Tabs.Screen name="Profile" component={ProfileStackScreen} />
      <Tabs.Screen name="Help" component={HelpStackScreen} />
    </Tabs.Navigator>
  );
};

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Login" component={AuthStackScreen} options={{ headerShown: false, swipeEnabled: false }}
        />
        <Drawer.Screen name="Home" component={TabsScreen} options={{ headerShown: false, swipeEnabled: false }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
