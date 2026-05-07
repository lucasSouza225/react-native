import { useState } from 'react'
import {Modal, View, Text, TouchableOpacity, TextInput, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import moment from 'moment'


const estadoInical= {
    desc: '',
    date: new Date(),
    showDateTimePicker: false
}

export default function addTask(props) {
    const [estado, setEstado] = useState({...estadoInical})

    const getDateTimePicker = () => {
        let datePicker = <DateTimePicker value={estado.date} onChange={(_, date) => setEstado(prev => {
            return { ...prev, date, showDateTimePicker: false }
        })}
    />
        const dateString = moment(estado.date).format('ddd, D [de] MMMM [de] YYYY')

        datePicker = (
            <View>
                <TouchableOpacity onPress={() => setEstado(prev => ({ ...prev, showDateTimePicker: true }))}>
                    <Text style={styles.date}>{dateString}</Text>
                </TouchableOpacity>
                {estado.showDateTimePicker && datePicker}
            </View>
        )
        return datePicker
    }

    return(
        <Modal transparent={true} visible={props.isVisible}
            onRequestClose={props.onCancel}
            animationType='slide'>

            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>
            
            <View style={styles.container}>
                <Text style={styles.header}>Nova Tarefa</Text>
                <TextInput 
                    style={styles.input}
                    placeholder='Informe a descrição...'
                    onChangeText={desc => setEstado(prev => {
                        return {
                            ...prev,
                            desc
                        }
                    })}
                    value={estado.desc}
                />
                {getDateTimePicker()}

                <View>
                    <TouchableOpacity>
                        <Text style={styles.buttonSalvar }>Salvar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={props.onCancel}>
                        <Text style={styles.buttonCancelar}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View style={styles.background}></View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 2
    },
    background: {
        flex: 1,
        backgroundColor:'rgba(0,0,0,0.7)'
    },
    header: {
        backgroundColor: '#003C8F',
        color: '#fff',
        textAlign: 'center',
        padding: 15,
        fontSize: 18
    },
    input: {
        height: 40,
        margin: 15,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#e3e3e3',
        borderRadius: 6
    },
    buttonSalvar: {
        backgroundColor: "#4CAF50",
        color: '#fff',
        textAlign: 'center',
        padding: 10,
        margin: 15,
        borderRadius: 6
    },
    buttonCancelar: {
        backgroundColor: '#f44336',
        color: '#fff',
        textAlign: 'center',
        padding: 10,
        margin: 15,
        borderRadius: 6
    },
    date: {
        fontSize: 16,
        marginLeft: 15
    }

})