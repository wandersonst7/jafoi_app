import {StyleSheet} from 'react-native';

// Cores
export const WHITE = "#FFFFFF";
export const WHITE2 = "#F7F7F7";
export const BLACK = "#333333";
export const ORANGE = "#EB7330";
export const PLACEHOLDER_COLOR = "#555555";
export const LINKS_COLOR = "#1C42A3";
export const RED = "#EB3030";
export const GREY = "#777777"

export const global_styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 44
    },
    title: {
        fontSize: 27,
        fontWeight: '700',
        color: BLACK,
    },
    topics_orange: {
        color: ORANGE,
        fontSize: 21,
        fontWeight: '700',
        marginRight: 8
    }
});
