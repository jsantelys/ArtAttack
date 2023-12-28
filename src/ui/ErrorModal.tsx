import { View, Text, Modal, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import { Spacing, Typography } from '../styles'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface props {
  visible: boolean,
  error: string,
  setState: React.Dispatch<React.SetStateAction<any>>
}

const ErrorModal = ({ visible, error, setState }: props) => {

  const { colors } = useTheme()

  return (
    <Modal
      animationType="slide"
      visible={visible}
      transparent={true}
      onRequestClose={() => setState(false)}
      onDismiss={() => setState(false)}
    >
      <View style={
        styles.modalContainer
      }>
        <View style={styles.modal}>
          <View style={{ ...styles.modalHeader, backgroundColor: colors.card }}>
            <Text style={{ ...Typography.errorTitle }}>ERROR</Text>
          </View>
          <View style={styles.modalBody}>
            <Text style={{ ...Typography.errorText }}>{error}</Text>
          </View>
          <Icon style={styles.closeIcon} name='close' size={20} color={'white'} onPress={() => setState(false)} />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    height: '30%',
    backgroundColor: 'white',
    borderRadius: 16,
    ...Spacing.shadow
  },
  modalHeader: {
    height: '24%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  closeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginTop: Spacing.m,
    marginRight: Spacing.m
  }
})

export default ErrorModal