import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, FlatList } from 'react-native'
import { useState, useEffect } from 'react'

import todayImage from '../../assets/img/today.jpg'
import { FontAwesome } from '@expo/vector-icons'
import Task from '../components/Task'
import taskDB from '../database/taskDB'
import 'moment/locale/pt-br'
import moment from 'moment-timezone'

export default function TaskList() {

    const [tasks, setTasks] = useState([...taskDB])

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
    }
})