import { StyleSheet, View, Text } from "react-native";
import { PLACEHOLDER_COLOR, BLACK, WHITE } from "../styles";
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SelectCategory({ data, defaultValue, setData}){

    return (
        <SelectDropdown
            data={data}
            defaultValue={defaultValue}
            onSelect={(selectedItem, index) => {
              setData(selectedItem)
            }}
            renderButton={(selectedItem, isOpened) => {
            return (
                <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                    {(selectedItem && selectedItem.name) || 'Selecione uma categoria'}
                </Text>
                <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                </View>
            );
            }}
            renderItem={(item, index, isSelected) => {
            return (
                <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                  <Text style={styles.dropdownItemTxtStyle}>{item.name}</Text>
                </View>
            );
            }}
            showsVerticalScrollIndicator={false}
            dropdownStyle={styles.dropdownMenuStyle}
        />
    )
}

const styles = StyleSheet.create({
    dropdownButtonStyle: {
      width: '100%',
      backgroundColor: WHITE,
      borderWidth: 1,
      borderColor: BLACK,
      borderRadius: 24,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: 24,
    },
    dropdownButtonTxtStyle: {
      flex: 1,
      fontSize: 16,
      fontWeight: '500',
      color: BLACK,
    },
    dropdownButtonArrowStyle: {
      fontSize: 28,
    },
    dropdownButtonIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
    dropdownMenuStyle: {
      backgroundColor: '#E9ECEF',
      borderRadius: 16,
      height: 150,
      paddingVertical: 8,
      paddingHorizontal: 8,
      overflow: 'hiddden',
      marginBottom: 55
    },
    dropdownItemStyle: {
      width: '100%',
      flexDirection: 'row',
      paddingHorizontal: 12,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 8,
      borderRadius: 8,
    },
    dropdownItemTxtStyle: {
      flex: 1,
      fontSize: 18,
      fontWeight: '500',
      color: '#151E26',
    },
    dropdownItemIconStyle: {
      fontSize: 28,
      marginRight: 8,
    },
  });
  
