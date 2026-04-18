import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Platform, FlatList } from 'react-native'

import todayImage from '../../assets/img/today.jpg'
import { FontAwesome } from '@expo/vector-icons'
import Task from '../components/Task'
import taskDB from '../database/taskDB'

export default function TaskList() {
    return (
        <View style={styles.container}>

            <ImageBackground source={todayImage} style={styles.background}>

                <View style={styles.iconBar}>
                    <TouchableOpacity>
                        <FontAwesome
                            name="eye"
                            size={20}
                            color={'white'}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.titleBar}>
                    <Text style={styles.title}>Hoje</Text>
                    <Text style={styles.subtitle}>
                        {new Date().toLocaleDateString('pt-BR', {
                            weekday: 'long',
                            day: '2-digit',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </Text>
                </View>

            </ImageBackground>
            <View style={styles.taskList}>
                <FlatList
                    data={taskDB}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => <Task {...item} />}
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