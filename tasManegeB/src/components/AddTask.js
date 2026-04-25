import { useState } from 'react';
import {Modal, View, Text, TouchableOpacity, TextInput, StyleSheet, TouchableWithoutFeedback} from 'react-native' ;

const estadosInicial = { 
    desc: '',
    date: new Date(),
    showDateTimePicker: false
}

export default function addTask(props)  { 
    const [estado, setEstado] = useState(estadosInicial)
    return (
        <Modal transparent={true} visible={props.isVisible} onRequestClose={props.onCancel} animationType='slide'>
            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View style={styles.background}>

                </View>
            </TouchableWithoutFeedback>
            <View style={styles.container}>

            </View>

            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View style={styles.background}>

                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)'
    }
})