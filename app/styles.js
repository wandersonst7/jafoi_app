import {StyleSheet} from 'react-native';

// Cores
export const WHITE = "#FFFFFF";
export const WHITE_2 = "#EFECE2";
export const BLACK = "#333333";
export const ORANGE = "#EB7330";
export const PLACEHOLDER_COLOR = "#555555";
export const LINKS_COLOR = "#1C42A3";

export const global_styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 45
    },
    title: {
        fontSize: 27,
        fontWeight: '700',
        color: BLACK,
    },
});
