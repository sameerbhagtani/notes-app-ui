import { useWindowDimensions } from "react-native";

export default function useResponsive() {
    const { width, height } = useWindowDimensions();

    return {
        width,
        height,
        isTablet: width >= 768,
        isLandscape: width > height,
    };
}
