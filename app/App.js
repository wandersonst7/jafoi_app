import { StatusBar } from 'expo-status-bar';
import RootNavigator from "./navigation/RootNavigator";
import { AuthContextProvider } from './context/AuthContext';

export default function App() {

  return (
    <AuthContextProvider>
      <RootNavigator />
      <StatusBar style="auto" />
    </AuthContextProvider>
  );

}

