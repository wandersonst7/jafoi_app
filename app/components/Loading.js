import { ActivityIndicator, View } from "react-native";
import { global_styles, ORANGE } from "../styles";

export default function Loading(){

    return (
        <View style={global_styles.container}>
            <ActivityIndicator size="large" color={ ORANGE } />
        </View>
    )

}
