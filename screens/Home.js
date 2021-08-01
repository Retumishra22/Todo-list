import React, {useState, useEffect}from 'react'
import {
    ScrollView,
    StyleSheet
} from 'react-native'
import {
    Container,
    Text,
    H1,
    Body,
    Title,
    ListItem,
    Fab,
    Right,
    Spinner,
    List,
    Button,
    CheckBox
} from 'native-base'

import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'
import {useIsFocused} from '@react-navigation/native'
import { color } from 'react-native-reanimated'

const Home = ({navigation, route}) => {
    const [listOfTodos, setListOfTodos] = useState([])
    const [loading, setLoading] = useState(false)

    const isFocused = useIsFocused()

    const getList = async () => {
        setLoading(true)

        const storedValue = await AsyncStorage.getItem("@season_list")

        if(!storedValue){
            setListOfTodos([])
        }

        const list = await JSON.parse(storedValue)
        setListOfTodos(list)

        setLoading(false)
    }

    const deleteSeason = async (id) => {
        const newList = await listOfTodos.filter((list) => list.id !== id)
        await AsyncStorage.setItem('@season_list', JSON.stringify(newList));
    
        setListOfTodos(newList)
    }

    const markComplete = async (id) => {
        const newList = listOfTodos.map((list) => {
          if(list.id == id){
            list.isDone = !list.isDone
          }
          return list
        })
          await AsyncStorage.setItem('@season_list', JSON.stringify(newList))
          setListOfTodos(newList)
      }
    

    useEffect(() => {
        getList();
    }, [isFocused])

    if(loading){
        return(
          <Container style={styles.container}>
            <Spinner color='#FCC981'/>
          </Container>
        )
    }
    
    return(
        <Container style={styles.container}>
            <ScrollView>
            {listOfTodos.length == 0 ? (
                <Container style={styles.container}>
                    <H1 style={styles.heading}>
                        To-do List is empty.
                    </H1>
                </Container>
            ) : (
               <>
                    <H1 style= {styles.heading}></H1>
                    <List>
                        {listOfTodos.map((season) => (
                            <ListItem key={season.id} style={styles.listItem}>
                                <Body style={styles.todoName}>
                                    <Title>
                                        {season.isDone == true ? (
                                            <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid', fontSize: 19, color: '#FCC981'}}>
                                                {season.name}
                                            </Text>
                                        ) :(season.name)}
                                    </Title>
                                </Body>
                                <Right style={styles.rightIcon}>
                                    <CheckBox
                                        style={{marginRight: 20, alignSelf: 'center'}}
                                        color='#fa8072'
                                    
                                        checked = {season.isDone}
                                        onPress={() => markComplete(season.id)}>
                                    </CheckBox>

                                    <Icon 
                                        name='edit' 
                                        style={styles.icon} 
                                        active 
                                        color='#FDFA72'  
                                        onPress={() => {navigation.navigate('Edit', {season})}}
                                    />

                                    <Icon 
                                        name='trash' 
                                        style={styles.icon} 
                                        active color='#00b7c2' 
                                        onPress={() => deleteSeason(season.id)}
                                    /> 
                                    
                                </Right>
                            </ListItem>
                        ))}
                        
                    </List>
               </>
            )}
            </ScrollView>
            <Fab 
                style = {{backgroundColor: '#FCC981'}}
                position= 'bottomRight'
                onPress={() => navigation.navigate('Add')}>
                <Icon name='plus' color='#0f4c75'/>
            </Fab>
        </Container>
    )
}

export default Home;

const styles = StyleSheet.create({
    container: {
      backgroundColor:"#0f4c75",
    },
    heading: {
        textAlign: 'center',
        color: '#FCC981',
    
        marginTop: 25,
        marginHorizontal: 5,
        fontSize: 20,

    },
    todoName: {
        color: 'white',
        marginLeft: 35,
    },
    listItem: {
        margin: 10,
        alignSelf: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#FCC981',
    },
    rightIcon: {
        display: 'flex',
        flexDirection: 'row',
        marginRight: 70,
    },
    icon: {
        fontSize: 25,
        margin: 7,
    }

  });