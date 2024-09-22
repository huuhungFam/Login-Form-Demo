import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as SQLite from 'expo-sqlite/legacy'

const db = SQLite.openDatabase("dataUsers.db")

const databaseSetup = () => {
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT);',
                [],
                () => console.log("Database is accessed")
            )
        })

        selectData()
    }, [])
}



const insertData = (user, pass) => {
    db.transaction(tx => {
        tx.executeSql(
            'INSERT INTO users (username, password) VALUES (?, ?);',
            [user, pass],
            () => {
                console.log('Data is inserted successfully')
                selectData()
            },
            error => { alert('ERROR!! Can not creat new account, please try agian') }
        )

    })
}



const deleteData = (user) => {
    db.transaction(tx => {
        tx.executeSql(
            'DELETE FROM users where username = ?',
            [user],
            () => {
                alert('Account is deleted successfully!')
                selectData()
            },
            error => console.log(error)
        )
    })
}

//Dùng để hiển thị và Mục đích chính là cập nhật lại table
const selectData = () => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM users',
            null,
            (txObj, result) => {
                console.log(result.rows._array)
            },
            (txObj, error) => console.log(error)
        )
    })
}

export default function LoginScreen({ route, navigation }) {
    useEffect(() => {
        if (route.params?.newUsername) {
            setID(route.params.newUsername);
        }
        if (route.params?.newPass) {
            setPass(route.params.newPass);
        }
    }, [route.params]);

    const [userID, setID] = useState('')
    const [pass, setPass] = useState('')

    databaseSetup()

    const loginHandler = () => {
        if (!userID || !pass) {
            alert('Please enter both username and password');
            return;
        }
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM users WHERE username = ? AND password = ?;',
                [userID, pass],
                (txObj, { rows: { _array } }) => {
                    if (_array.length > 0) {
                        NaviHome()
                    } else {
                        alert('Incorrect username or password')
                    }
                },
                (txObj, error) => {
                    console.log('Error', error)
                }
            )
        })
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
                <Text>Password</Text>
                <TextInput style={styles.inputPass} placeholder='your password' value={pass} onChangeText={setPass} />
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

export { insertData, deleteData }