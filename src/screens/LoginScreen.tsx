import React, { useState } from 'react'
import { View } from 'react-native'
import {Button, Snackbar, Text, TextInput} from 'react-native-paper'
import { styles } from '../theme/styles'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../configs/firebaseConfig'
import { CommonActions, useNavigation } from '@react-navigation/native'

interface LoginForm{
  email: string,
  password:string
}
interface MessageSnackBar{
  visible: boolean,
  message: string,
  color: string
}


export const LoginScreen = () => {
  //HOOK para mostar la contraseña
  const [mostrarContrasenia,setMostrarContrasenia] = useState(true)
  
  //HOOK navegación
  const navigation= useNavigation()

  const [loginForm,setLoginForm] = useState <LoginForm> ({
    email: '',
    password: ''
 });
 const handlerSetLoginForm = (key: string, value: string) => {
  setLoginForm({...loginForm, [key]: value})
  };
  // HOOK useState: trabajar con el manejo de mensajes dinámicos
  const [messageSnackBar, setMessageSnackBar] = useState <MessageSnackBar>({
    visible: false,
    message: "",
    color: "#fff"
});

const handlerLogin= async ()=>{
  if(!loginForm.email || !loginForm.password){
    //cambiar estado para visualizar el mensaje
      setMessageSnackBar({
        visible: true, 
        message: "Campos vacios, por favor complete", 
        color: "#FF80AB"})
      return;
    }
    //Login usuario
    try{
        const response = await signInWithEmailAndPassword(
            auth,
            loginForm.email,
            loginForm.password
        );
        console.log(response);
    }catch(e){
        console.log(e);
        setMessageSnackBar({
            visible: true, 
            message: "Usuario y/o contraseña incorrecta.", 
            color: "#B71C1C"})
    }
}
  return (
    <View style={styles.contect}>
    <Text variant="headlineSmall">Inicia Seción</Text>
    <TextInput 
      style={styles.input}
      mode="outlined"
      label="CORREO"
      placeholder="Escribe tu correo"
      onChangeText={(value)=>handlerSetLoginForm('email', value)}
    />
    <TextInput 
      style={styles.input}
      mode="outlined"
      label="CONTRASEÑA"
      placeholder="Escribe tu contraseña"
      secureTextEntry ={mostrarContrasenia}
      right={<TextInput.Icon icon="eye" onPress={()=>setMostrarContrasenia(!mostrarContrasenia)}/>}
      onChangeText={(value)=>handlerSetLoginForm('password', value)}
    />
    <Button 
    //icon="home"
       mode="contained" 
       onPress={() => handlerLogin()}
       style={styles.buttons}
       >
       👉🏻 Iniciar 
    </Button>
    <Snackbar
     visible= {messageSnackBar.visible}
     onDismiss={()=> setMessageSnackBar({...messageSnackBar, visible: false})}
     style={{backgroundColor: messageSnackBar.color}}> 
     {messageSnackBar.message}
    </Snackbar>
    <Text style={styles.textNavegador} onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Register'}))}> 
    ✒️ Registrate si no tienes una cuenta ✒️ 
    </Text>
    </View>
  )
}
