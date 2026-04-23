import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { FontAwesome } from '@expo/vector-icons'

import moment from 'moment'
import 'moment/locale/pt-br'

export default props => {

    const doneOrNotStyle = props.doneAt != null
        ? { textDecorationLine: 'line-through' }
        : {}

    const date = props.doneAt
        ? new Date(props.doneAt)
        : new Date(props.estimateAt)

    const formattedDate = moment(date)
        .locale('pt-br')
        .format('ddd, D [de] MMMM [de] YYYY')

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback onPress={() => props.onToggleTask(props.id)}>
                <View style={styles.checkContainer}>
                    {getCheckerView(props.doneAt)}
                </View>
            </TouchableWithoutFeedback>

            <View style={styles.taskContent}>
                <Text style={[styles.desc, doneOrNotStyle]}>
                    {props.desc}
                </Text>
                <Text style={[styles.date, doneOrNotStyle]}>
                    {formattedDate}
                </Text>
            </View>
        </View>
    )
}

function getCheckerView(doneAt) {
    if (doneAt != null) {
        return (
            <View style={styles.done}>
                <FontAwesome name="check" size={20} color={'white'} />
            </View>
        )
    } else {
        return (
            <View style={styles.pending}></View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: 'white'
    },
    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
    },
    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskContent: {
        flex: 1
    },
    desc: {
        color: '#222',
        fontSize: 16
    },
    date: {
        color: '#666',
        fontSize: 12
    }
})