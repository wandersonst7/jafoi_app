import { StyleSheet, View, Text } from "react-native";
import { ORANGE, WHITE } from "../styles";

export default function RequestMessage({ status, message }){

  if(status === "error"){
    return (
      <View style={styles.error}>
          <Text style={styles.text_error}>{message}</Text>
      </View>
    )
  }else{
    return (
      <View style={styles.success}>
          <Text style={styles.text_success}>{message}</Text>
      </View>
    )
  }

}

const styles = StyleSheet.create({
    error: {
      backgroundColor: '#F8D7DA',
      padding: 16,
      width: '100%',
      borderWidth: 1,
      borderRadius: 16,
      borderColor: '#F5C2C7',
    },
    success: {
      backgroundColor: '#D1E7DD',
      padding: 16,
      width: '100%',
      borderWidth: 1,
      borderRadius: 16,
      borderColor: '#C5E1D5',
    },
    text_error: {
      color: '#842029',
      textAlign: 'center'
    },
    text_success: {
      color: '#0F5132',
      textAlign: 'center'
    }
  });