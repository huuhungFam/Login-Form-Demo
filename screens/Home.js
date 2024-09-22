import { StyleSheet, View, Text, Image } from 'react-native';

const HomeScreen = () => {
    return (
        <View style={styles.body}>
            <Text style={styles.text}>HOME SCREEN</Text>
            <Image
            style={styles.Img}
            source={require('../assets/CTUtravel.jpg')}
            resizeMethod='stretch'/>
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
        fontSize: 80,
        fontWeight: 'bold'
    },
    Img: {
        height: 450,
        width: 400
    }
})
export default HomeScreen;