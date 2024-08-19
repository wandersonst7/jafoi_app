import { StatusBar } from 'expo-status-bar';
import RootNavigator from "./src/navigation/RootNavigator";
import { AuthContextProvider } from './src/context/AuthContext';

export default function App() {

  return (
    <AuthContextProvider>
      <RootNavigator />
      <StatusBar style="auto" />
    </AuthContextProvider>
  );

}

