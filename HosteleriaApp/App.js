import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "./Screens/LoginScreen";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./Components/MainScreen/HomeScreen";

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
