import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useMemo } from "react";
import { Pressable, StyleSheet } from "react-native";

import type { Theme } from "@/shared/types";
import type { ComponentProps } from "react";

type FontAwesome6IconName = ComponentProps<typeof FontAwesome6>["name"];

type FloatingButtonProps = {
    theme: Theme;
    onPress: () => void;
    iconName: FontAwesome6IconName;
    bgColor: string;
};

export default function FloatingButton({
    theme,
    onPress,
    iconName,
    bgColor,
}: FloatingButtonProps) {
    const styles = useMemo(() => createStyles(bgColor), [bgColor]);

    return (
        <Pressable onPress={onPress} style={styles.button}>
            <FontAwesome6 name={iconName} size={24} color={theme.background} />
        </Pressable>
    );
}

function createStyles(bgColor: string) {
    return StyleSheet.create({
        button: {
            position: "absolute",
            bottom: 20,
            right: 20,

            padding: 10,
            backgroundColor: bgColor,

            width: 50,
            height: 50,
            borderRadius: 999,

            alignItems: "center",
            justifyContent: "center",
        },
    });
}
