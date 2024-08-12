import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function Home() {

  const { user, token } = useAuth();
  console.log(user)
  console.log(token)

  return (
    <View style={styles.container}>
      <Text>Página Home</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
