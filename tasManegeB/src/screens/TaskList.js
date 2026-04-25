import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList } from 'react-native'
import { useState, useEffect } from 'react'

import todayImage from '../../assets/img/today.jpg'
import { FontAwesome } from '@expo/vector-icons'
import Task from '../components/Task'
import taskDB from '../database/taskDB'
import 'moment/locale/pt-br'
import moment from 'moment-timezone'
import AddTask from '../components/AddTask'

export default function TaskList() {

    const [tasks, setTasks] = useState([...taskDB])
    const [showAddTask, setShowAddTask] = useState(false)

    const today = moment()
        .tz('America/Sao_Paulo')
        .locale('pt-br')
        .format('ddd, D [de] MMMM HH:mm:ss')

    const toggleTask = (taskID) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === taskID) {
                return {
                    ...task,
                    doneAt: task.doneAt ? null : new Date()
                }
            }
            return task
        })

        setTasks(updatedTasks)
    }

    /* useEffect(() => {
        console.warn('tasks atualizadas', tasks)
    }, [tasks]) */

    return (
        <View style={styles.container}>

            <AddTask 
                isVisible={showAddTask}
                onCancel={() => setShowAddTask(false)}
                onSave={() => console.warn('salvando tarefa...')}
            />

            <ImageBackground source={todayImage} style={styles.background}>

                <View style={styles.iconBar}>
                    <TouchableOpacity>
                        <FontAwesome name="eye" size={20} color={'white'} />
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
                    renderItem={({ item }) => (
                        <Task
                            {...item}
                            onToggleTask={toggleTask}
                        />
                    )}
                />
            </View>

            <TouchableOpacity style={styles.addButton}
                activeOpecity={0.7}
                onPress={()=>setShowAddTask(true)}>
                <FontAwesome name="plus" size={20} color={'#fff'} />                
            </TouchableOpacity>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 3,
    },
    taskList: {
        flex: 7,
    },
    iconBar: {
        flexDirection: 'row',
        marginHorizontal: 20,
        justifyContent: 'flex-end',
        marginTop: 30,
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    title: {
        color: 'white',
        fontSize: 48,
        marginLeft: 20,
        marginBottom: 20,
    },
    subtitle: {
        color: 'white',
        fontSize: 20,
        marginLeft: 24,
        marginBottom: 32,
    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 30,
        width: 50,
        height: 50,
        backgroundColor: '#b13b44',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    }
})