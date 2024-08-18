import { StyleSheet, Pressable, Linking } from "react-native";
import { ORANGE, WHITE } from "../styles";

import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

export default function WhatsappButton({ whatsapp, productTitle }){

    const formatWhatsapp = (whatsapp) =>{
        return whatsapp.replace(/\D/g, '');
    }

    return (
        <Pressable style={styles.button} onPress={() =>
            Linking.canOpenURL("whatsapp://send?text=oi").then(supported => {
              if (supported) {
                return Linking.openURL(
                  `whatsapp://send?phone=55${formatWhatsapp(whatsapp)}&text=Tenho interesse no produto: ${productTitle}`
                );
              } else {
                return Linking.openURL(
                  `https://api.whatsapp.com/send?phone=55${formatWhatsapp(whatsapp)}&text=Tenho interesse no produto: ${productTitle}`
                );
              }
            })
          }>
            <FontAwesome5 name="whatsapp" size={34} color={WHITE} />
        </Pressable>
    )

}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#2F9E41",
        borderWidth: 1,
        borderRadius: 100,
        borderColor: "#2F9E41",
        width: 75,
        height: 75,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 }, 
        shadowOpacity: 0.3, 
        shadowRadius: 6,
        elevation: 5,
    }
});