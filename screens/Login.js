import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View, Pressable, TouchableOpacity } from 'react-native';
import * as SQLite from 'expo-sqlite/legacy'
import Entypo from '@expo/vector-icons/Entypo';
//<Entypo name="eye" size={24} color="black" />
//<Entypo name="eye-with-line" size={24} color="black" />
import axios from 'axios';
const baseUrl = 'http://192.168.1.2:22222';


const signUp = (user, pass) => {
    axios.post(`${baseUrl}/api/USER/signup`, {
        name: user,
        age: parseInt(pass)
    })
        .then(response => {
            console.log('dang ky thanh cong')
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

const delAcc = (user) => {
    axios.delete(`${baseUrl}/api/USER/deleteAccount`, {
        params: { name: user }
    })
        .then(response => {
            console.log('Da xoa tai khoan')
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

export default function LoginScreen({ route, navigation }) {
    useEffect(() => {
        if (route.params?.newUsername) {
            setID(route.params.newUsername);
        }
        if (route.params?.newPass) {
            setPass(route.params.newPass);
        }
        if (route.params?.resetInputs) {
            setID('');
            setPass('');
        }
    }, [route.params]);

    const [userID, setID] = useState('')
    const [pass, setPass] = useState('')
    const [hide, setHide] = useState(true)



    const loginHandler = () => {
        axios.post(`${baseUrl}/api/USER/login`, {
            name: userID,
            age: parseInt(pass)
        })
            .then(response => {
                // console.log(response.data)
                if(userID == response.data.users[0].name && pass == response.data.users[0].age){
                    NaviHome()
                }
            })
            .catch(error => {
                alert("CHECK YOUR USERNAME AND PASSWORD!!!")
            });

    }

    const NaviSignUp = () => {
        navigation.navigate('SignUp')
    }
    const NaviHome = () => {
        navigation.navigate('Home', { userID })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.Label}>WELCOME TO MY APP</Text>
            <View style={styles.containerInput}>
                <Text>Username</Text>
                <TextInput style={styles.inputUsername} placeholder='your user id' value={userID} onChangeText={setID} />
            </View>
            <View style={styles.containerInput1}>
                <Text>Password</Text>
                <View style={{flexDirection:'row'}}>
                    <TextInput style={styles.inputPass} placeholder='your password'  value={pass} secureTextEntry={hide} onChangeText={setPass} />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setHide(!hide)
                        }}
                    >
                        <Text>{hide ? <Entypo name="eye" size={24} color="black" /> : <Entypo name="eye-with-line" size={24} color="black" />}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.containerButton}>
                <Button title='Login' onPress={loginHandler} />
                <Button color={'#ff8000'} title='Sign up' onPress={NaviSignUp} />
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1abc9c',
    },
    Label: {
        marginTop: 200,
        fontSize: 30,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    containerInput: {
        marginTop: 70,
        marginBottom: 35,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerInput1: {
        marginTop: 40,
        marginBottom: 35,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        marginLeft:10
    },
    containerButton: {
        justifyContent: 'center',
        flexDirection: 'row',

    },
    inputUsername: {
        borderWidth: 2,
        height: '70',
        width: '70%',
        padding: 5,
        paddingLeft: 10
    },
    inputPass: {
        borderWidth: 2,
        height: '70',
        width: '70%',
        padding: 5,
        paddingLeft: 10
    }
});

export {signUp, delAcc}