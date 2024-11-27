import { StyleSheet, View, Text, Image, Button } from 'react-native';
import { delAcc, deleteData, setAfterDel } from './Login';

const HomeScreen = ({ route, navigation }) => {
    const { userID } = route.params
    const deleteAcc = () => {
        navigation.navigate('Login', { resetInputs: true })
        delAcc(userID)
    }
    return (
        <View style={styles.body}>
            <Button color={'#e74c3c'} title='Delete account' onPress={deleteAcc} />
            <Text style={styles.text}>HOME SCREEN</Text>
            <Image
                style={styles.Img}
                source={require('../assets/CTUtravel.jpg')}
                resizeMethod='stretch' />
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