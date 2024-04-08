import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import {View} from 'react-native'
import {Button, Snackbar, Text, TextInput} from 'react-native-paper'
import { auth } from '../configs/firebaseConfig';
import { styles } from '../theme/styles';
import { CommonActions, useNavigation } from '@react-navigation/native';

// TODO DEL REGISTRO EL FORMULARIO
interface RegisterForm{
    email: string,
    password:string
}

interface MessageSnackBar{
    visible: boolean,
    message: string,
    color: string
}

export const RegisterScreen = () => {
    //HOOK navegación
    const navigation= useNavigation()

    //HOOK para mostar la contraseña
    const [mostrarContrasenia,setMostrarContrasenia] = useState(true)

    // HOOK useState: trabajar con el estado del formulario
    // siempre utilizar este hook
    const [registerForm,setRegisterForm] = useState <RegisterForm> ({
       email: '',
       password: ''
    });
    // HOOK useState: trabajar con el manejo de mensajes dinámicos
    const [messageSnackBar, setMessageSnackBar] = useState <MessageSnackBar>({
        visible: false,
        message: "",
        color: "#fff"
    });

    // Función para actualizar datos del formulario
    const handlerSetResgisterForm = (key: string, value: string) => {
    setRegisterForm({...registerForm, [key]: value})
    };

    // Función que toma los datos del registro
    const handlerRegister = async () =>{
        // El IF lo que va hacer es que si no llenamos el campo
        // de email y contraseña no realizará ninguna acción
        if(!registerForm.email || !registerForm.password){
        //cambiar estado para visualizar el mensaje
          setMessageSnackBar({
            visible: true, 
            message: "Campos vacios, por favor complete", 
            color: "#FF80AB"})
          return;
        }
        //Registrar usuario
        try{
            const response = await createUserWithEmailAndPassword(
                auth,
                registerForm.email,
                registerForm.password
            );
            console.log(response);
            setMessageSnackBar({
                visible: true, 
                message: "Registro exitoso!", 
                color: "#43A047"})
        }catch(e){
            console.log(e);
            setMessageSnackBar({
                visible: true, 
                message: "Lo sentimos no se pudo realizar el registro, vuelva a intentar.", 
                color: "#B71C1C"})
        }
        //console.log(registerForm);
    };

  return (
    <View style={styles.contect}>
    <Text variant="headlineSmall">Registrate</Text>
    <TextInput 
      style={styles.input}
      mode="outlined"
      label="CORREO"
      placeholder="Escribe tu correo"
      onChangeText={(value)=>handlerSetResgisterForm('email', value)}
    />
    <TextInput 
      style={styles.input}
      mode="outlined"
      label="CONTRASEÑA"
      placeholder="Escribe tu contraseña"
      secureTextEntry ={mostrarContrasenia}
      right={<TextInput.Icon icon="eye" onPress={()=>setMostrarContrasenia(!mostrarContrasenia)}/>}
      onChangeText={(value)=>handlerSetResgisterForm('password', value)}
    />
    <Button 
    //icon="home"
       mode="contained" 
       onPress={() => handlerRegister()}
       style={styles.buttons}
       >
       🎉 Registrarse Aquí 🎉
    </Button>
    <Snackbar
     visible= {messageSnackBar.visible}
     onDismiss={()=> setMessageSnackBar({...messageSnackBar, visible: false})}
     style={{backgroundColor: messageSnackBar.color}}> 
     {messageSnackBar.message}
    </Snackbar>
    <Text style={styles.textNavegador} onPress={()=>navigation.dispatch(CommonActions.navigate({name:'Login'}))}> 
    ⬅️ Regresar a Iniciar Seción si ya tienes cuenta
    </Text>
    </View>
  );
};


