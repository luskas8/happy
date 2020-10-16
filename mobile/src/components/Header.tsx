import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';

interface HeaderProps {
    title: string;
    showCancel?: boolean;
}

export default function Header({ title, showCancel=true }: HeaderProps) {
    const navagation = useNavigation();

    function handleNavigarionToAppHomepage() {
        navagation.navigate("OrphanatesMap");
    }

    return (
        <View style={styles.container}>
            <BorderlessButton onPress={navagation.goBack}>
                <Feather
                    name="arrow-left"
                    size={24}
                    color="#D6A015"
                />
            </BorderlessButton>

            <Text style={styles.title}>
                {title}
            </Text>

            {showCancel ? (
                    <BorderlessButton onPress={handleNavigarionToAppHomepage}>
                        <Feather
                            name="x"
                            size={24}
                            color="#FF669D"
                        />
                    </BorderlessButton>
                ) : (
                    <View />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#f9fafc',
        borderBottomWidth: 1,
        borderColor: '#dde3f0',
        paddingTop: 44,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    title: {
        fontFamily: 'nunito600',
        color: '#8fa7b3',
        fontSize: 16,
    },
});