import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as SQLite from 'expo-sqlite/legacy'

const db = SQLite.openDatabase("dataUsers.db")

const databaseSetup = () => {
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, password TEXT NOT NULL);',
                [],
                () => console.log("Table users is created"),
                () => alert('Table users is not created')
            )
        })
    //     db.transaction(tx => {
    //         tx.executeSql(
    //             'CREATE TABLE IF NOT EXISTS user_info (id INTEGER PRIMARY KEY AUTOINCREMENT,user_id INTEGER NOT NULL,full_name TEXT,email TEXT,phone_number TEXT,address TEXT,FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE);',
    //             [],
    //             () => console.log('Table user_info is created'),
    //             () => console.log('Table user_info is not created')
    //         )
    // })
    selectData()
    // selectData_userin4()
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
const selectData_userin4 = () => {
    db.transaction(tx => {
        tx.executeSql(
            'SELECT * FROM user_info',
            null,
            (txObj, result) => {
                console.log(result.rows._array)
            },
            (txObj, error) => console.log(error)
        )
    })
}

const editData = (newPass, userID) => {
    db.transaction(tx =>{
        tx.executeSql(
            'UPDATE users SET password =  ? WHERE id = ?;',
            [newPass, userID],
            () => alert('Updating your new password successfully!'),
            () => alert('Cannot set new password')
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
                        const id = _array[0].id
                        NaviHome(id)
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
    const NaviHome = (id) => {
        navigation.navigate('Home', { userID, id })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.Label}>WELCOME TO MY APP</Text>
            <View style={styles.containerInput}>
                <Text>Username</Text>
                <TextInput style={styles.inputUsername} placeholder='your user id' value={userID} onChangeText={setID} />
                <Text>Password</Text>
                <TextInput style={styles.inputPass} placeholder='your password' secureTextEntry={true} value={pass} onChangeText={setPass} />
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

export { insertData, deleteData, editData }