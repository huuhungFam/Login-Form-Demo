import { StyleSheet, View, Text } from 'react-native';

const HomeScreen = () => {
    return (
        <View style={styles.body}>
            <Text style={styles.text}>HOME SCREEN</Text>
            <View></View>
        </View>
    );
};

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    text: {
        fontSize: 100,
        fontWeight: 'bold'
    }
})
export default HomeScreen;