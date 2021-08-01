import React, {useState} from 'react'
import {
    ScrollView,
    Text,
    StyleSheet,
} from 'react-native'
import {
    Button, Container, H1, Form, Item, Input,
} from 'native-base'

import shortid from 'shortid'
import AsyncStorage from '@react-native-community/async-storage' 

const Add = ({navigation,route}) => {
    const [name, setName] = useState('')

    const addtoList = async () => {
        try {
            if(!name) {
                return alert("Enter the To-do")
            }
            
            const todoToAdd = {
                id: shortid.generate(),
                name: name,
                isDone: false,
            }

            const storedList = await AsyncStorage.getItem('@season_list')
            const prevList = await JSON.parse(storedList)

            if(!prevList){
                const newList = [todoToAdd]
                await AsyncStorage.setItem("@season_list", JSON.stringify(newList))
            }
            else{
                prevList.push(todoToAdd)
                await AsyncStorage.setItem("@season_list", JSON.stringify(prevList))
            }

            navigation.navigate('Home')
        } catch (error) {
            console.log(error)
        }
    }
    return(
        <Container style={styles.container}>
            <H1 style= {styles.heading}>
                Add to To-do list
            </H1>
            <Form>
                <Item style={styles.item}>
                    <Input 
                        placeholder="Enter To-do"
                        style= {{color: '#eee',}}
                        value = {name}
                        onChangeText = {(text) => setName(text)}>
                    </Input>
                </Item>
                <Button block style={styles.button} onPress = {addtoList}>
                    <Text style={styles.buttontext}>Add</Text>
                </Button>
            </Form>
        </Container>
    )
}

export default Add;

const styles = StyleSheet.create({
    container: {
      backgroundColor:"#0f4c75",
      
    },
    heading: {
        textAlign: 'center',
        color: '#FCC981',
        marginVertical: 50,
        marginHorizontal: 5,
        fontSize: 20,
        marginBottom: 25,
    },
    item: {
        marginBottom: 20,
        width: '80%',
        alignSelf: 'center',
    },
    button : {
        backgroundColor: '#FCC981',
        alignSelf: 'center',
        width: '25%',
        marginVertical: 25,
    },
    buttontext : {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15,
    },
  });