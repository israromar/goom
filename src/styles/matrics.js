import { Platform, Dimensions }  from "react-native";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

export default {
    padding: 15,
    ...Platform.select({
        ios: { headerHeight: 64, headerPadding: 20 },
        android: { headerHeight: 50, headerPadding: 0 },
    }),
    tabBarHeight: 44,
};
