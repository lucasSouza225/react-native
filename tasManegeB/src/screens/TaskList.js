import {use, useEffect, useState} from 'react'
import {View, Text, StyleSheet, ImageBackground, TouchableOpacity, Platform, FlatList } from 'react-native'

import todayImage from '../../assets/img/top.png'
import { FontAwesome } from '@expo/vector-icons'
import Task from '../components/Task'
import AddTask from '../components/AddTask'
import taskDB from '../db/db'

import moment from 'moment-timezone'
import 'moment/locale/pt-br'



export default function TaskList() {
    const [tasks, setTasks] = useState([...taskDB])
    const [showAddTask, setShowAddTask] = useState(false)

    const today = moment()
        .tz("America/Sao_Paulo")
        .locale("pt-br")
        .format("ddd, D [de] MMMM HH:mm:ss")

    const toggleTask = (taskId) => {
        const taskList = [...tasks]
        taskList.forEach(task => {
            if(task.id === taskId){
                task.doneAt = task.doneAt ? null : new Date() 
            }
        })
        setTasks([...taskList])
    }

    // useEffect(() => {
    //     console.warn('tasks atualizado', tasks)
    // }, [tasks])

    return(
        <View style={styles.container}>

            <AddTask 
                isVisible={showAddTask}
                onCancel={() => setShowAddTask(false)}
                onSave={() => console.warn('salvando a tarefa')}
            />

            <ImageBackground source={todayImage} style={styles.background}>

                <View style={styles.iconBar}>
                    <TouchableOpacity>
                        <FontAwesome name="eye" size={20} color="white" />
                    </TouchableOpacity>
                </View>
                <View style={styles.titleBar}>
                    <Text style={styles.title}>Hoje</Text>
                    <Text style={styles.subtitle}>{today}</Text>
                </View>

            </ImageBackground>

            <View style={styles.taskList}>
                <FlatList
                    data={tasks}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({item}) => <Task {...item} onToggleTask={toggleTask} />}
                />
            </View>

            <TouchableOpacity
                style={styles.addButton}
                activeOpacity={0.7}
                onPress={() => setShowAddTask(true)}>
                    <FontAwesome name='plus' size={20} color={'#fff'} />
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {flex: 1},
    background: {flex:3},
    taskList: {flex:7},
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: 48
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        color: 'white',
        fontSize: 48,
        marginLeft: 24,
        marginBottom: 20
    },
    subtitle: {
        color: 'white',
        fontSize: 24,
        marginLeft:24,
        marginBottom: 32
    },
    addButton: {
        position:'absolute',
        right:30,
        bottom: 30,
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#b13b44',
        justifyContent: 'center',
        alignItems: 'center'
    }
})