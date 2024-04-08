import React, { useState } from 'react'
import { Button, Divider, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { styles } from '../../../theme/styles'
import { View } from 'react-native'
import { push, ref, set } from 'firebase/database'
import { dbRealTime } from '../../../configs/firebaseConfig'

interface Props {
  visible: boolean,
  setVisible: Function
}

interface FormEventos {
  to: string,
  subject: string,
  message: string
}

export const NuevoEventoComponent = ({ visible, setVisible }: Props) => {
  const [eventoForm, setEventoForm] = useState<FormEventos>({
    to: '',
    subject: '',
    message: '',
  })

  const handlerSetEventForm = (key: string, value: string) => {
    setEventoForm({ ...eventoForm, [key]: value })
  }

  const handlerGuardarEventos = async () => {
    if (!eventoForm.to || !eventoForm.subject || !eventoForm.message) { 
      return
    }

    const dbRef = ref(dbRealTime, 'eventos')
    const nuevoEventoRef = push(dbRef)
    
    try {
      await set(nuevoEventoRef, eventoForm)
      setEventoForm({
        message:'',
        subject:'',
        to:''
      })
    } catch (error) {
      console.log(error); 
    }
    
    setVisible(false)
  }

  return (
    <Portal>
      <Modal visible={visible} contentContainerStyle={styles.modal}>
        <View style={styles.headerModal}>
          <Text variant='headlineMedium'>Nuevo Evento</Text>
          <IconButton icon='close' onPress={() => setVisible(false)} />
        </View>
        <Divider bold />
        <TextInput
          label='Para'
          mode='outlined'
          onChangeText={(value) => handlerSetEventForm('to', value)}
        />
        <TextInput
          label='Asunto de Evento'
          mode='outlined'
          onChangeText={(value) => handlerSetEventForm('subject', value)}
        />
        <TextInput
          label='Detalle de lo que desea en el evento'
          mode='outlined'
          onChangeText={(value) => handlerSetEventForm('message', value)}
          multiline={true}
          numberOfLines={7}
        />
        <Button 
          style={{ marginTop: 20, backgroundColor:'#AB47BC' }} 
          mode='contained' 
          onPress={() => handlerGuardarEventos()}
        >
          Guardar el Evento
        </Button>
      </Modal>
    </Portal>
  )
}
