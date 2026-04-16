import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";

export default props => {
    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback>
                <View style={styles.checkContainer}>
                    <View style={styles.pednding} />
                </View>
            </TouchableWithoutFeedback>

            <View style={styles.taskContent}>
                <Text style={styles.desc}>{props.desc}</Text>
                <Text style={styles.date}>{props.estimateAt.toLocaleDateString('pt-BR')}</Text>
            </View>
        </View>
    )
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
    pednding: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555'
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