import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import { insertData, signUp } from './Login';



const SignUpSreen = ({ navigation }) => {
    const [newUsername, setNewUsername] = useState('')
    const [newPass, setNewPass] = useState('')

    const creatAccount = () =>{
        signUp(newUsername, newPass)
        navigation.navigate('Login', {newUsername, newPass})
    }
    return (
        <View style={styles.body}>
            <Text style={styles.text}>SIGN UP SCREEN</Text>
            <TextInput style={styles.TextInput} placeholder='Enter your user name' value={newUsername} onChangeText={setNewUsername} />
            <TextInput style={styles.TextInput} placeholder='Enter your user name' value={newPass} onChangeText={setNewPass} />
            <Button title='Creat account' onPress={creatAccount} />
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
        fontSize: 50,
        fontWeight: 'bold',
        marginBottom: 50
    },
    TextInput: {
        borderWidth: 2,
        height: '70',
        width: '70%',
        padding: 5,
        paddingLeft: 10,
        marginBottom: 20
    }
})
export default SignUpSreen;