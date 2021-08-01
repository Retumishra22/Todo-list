import React, {useEffect, useState} from 'react'
import {
    Text,
    StyleSheet,
} from 'react-native'
import {
    Button, Container, H1, Form, Item, Input,
} from 'native-base'

import AsyncStorage from '@react-native-community/async-storage' 

const Edit = ({navigation,route}) => {
    const [id, setId] = useState(null)
    const [name, setName] = useState('')

    const update = async (id) => {
        try {
            if(!name) {
                return alert("Enter the To-do")
            }
            
            const todoToAdd = {
                id: id,
                name: name,
                isDone: false,
            }

            const storedList = await AsyncStorage.getItem('@season_list')
            const prevList = await JSON.parse(storedList)

            prevList.map((todo) => {
                if(todo.id == id){
                    todo.name = name;
                }
                return todo;
            })

            await AsyncStorage.setItem('@season_list', JSON.stringify(prevList))

            navigation.navigate('Home')
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        const {season} = route.params
        const {id, name} = season

        setId(id)
        setName(name)

    }, [])

    return(
        <Container style={styles.container}>
            <H1 style= {styles.heading}>
                Edit To-do list
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
                <Button block style={styles.button} onPress = {() => update(id)}>
                    <Text style={styles.buttontext}>Edit</Text>
                </Button>
            </Form>
        </Container>
    )
}

export default Edit;

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