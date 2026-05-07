import { FontAwesome } from '@expo/vector-icons'
import {View, Text, StyleSheet, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'

import moment from 'moment'
import 'moment/locale/pt-br'

export default props => {

    const doneOrNotStyle = props.doneAt != null ? {textDecorationLine: 'line-through'} : {}

    const date = props.doneAt ? props.doneAt : props.estimateAt

    const formattedDate = 
        moment(date)
        .locale('pt-br')
        .format('ddd, D [de] MMMM')

    return(
        <View style={styles.container}>
            <TouchableWithoutFeedback 
                onPress={() => props.onToggleTask(props.id)} >
                <View style={styles.checkContainer}>
                    {getCheckedView(props.doneAt)}
                </View>
            </TouchableWithoutFeedback>
            <View>
                <Text style={[styles.desc, doneOrNotStyle]}>{props.desc}</Text>
                <Text style={[styles.date, doneOrNotStyle]}>{formattedDate}</Text>
            </View>
        </View>
    )
}

function getCheckedView(doneAt){
    if(doneAt != null) {
        return (
            <View style={styles.done}>
                <FontAwesome name="check" size={20} color="white" />
            </View>
        )
    } else {
        return(
            <View style={styles.pending}></View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#aaa',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#fff'
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
        backgroundColor: '#4d7031',
        alignItems: 'center',
        justifyContent: 'center'
    },
    desc: {
        color: '#222',
        fontSize: 16
    },
    date: {
        color: '#555',
        fontSize: 12
    }
})