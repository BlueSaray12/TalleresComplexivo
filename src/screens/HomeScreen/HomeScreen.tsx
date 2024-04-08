import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import {
  Avatar,
  Button,
  Divider,
  FAB,
  IconButton,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { auth, dbRealTime } from '../../configs/firebaseConfig';
import { updateProfile } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { styles } from "../../theme/styles";
import { EventosComponent } from "./components/EventosComponent";
import { NuevoEventoComponent } from "./components/NuevoEventoComponent";
import { useNavigation } from '@react-navigation/native'; // Importa el hook de navegación
import firebase from 'firebase/auth';

// Interface para los datos del usuario - nombre
interface UserForm {
  name: string;
}

// Interface para los datos de un evento
export interface Evento {
  id: string;
  to: string;
  subject: string;
  message: string;
}

export const HomeScreen = () => {
  const [showModalProfile, setShowModalProfile] = useState(false);
  const [showModalEvento, setShowModalEvento] = useState(false);
  const [userForm, setUserForm] = useState<UserForm>({
    name: ""
  })
  const [userAuth, setUserAuth] = useState<firebase.User | null>(null);
  const [eventos, setEventos] = useState<Evento[]>([]);
  const navigation = useNavigation(); // Inicializa el hook de navegación

  useEffect(() => {
    setUserAuth(auth.currentUser);
    setUserForm({ name: auth.currentUser?.displayName ?? "" })
    getAllEventos()
  }, [])

  const handlerUpdateUserForm = (key: string, value: string) => {
    setUserForm({ ...userForm, [key]: value })
  }

  const handlerUpdateUser = async () => {
    try {
      await updateProfile(userAuth!, { displayName: userForm.name });
    } catch (e) {
      console.log(e);
    }
    setShowModalProfile(false);
  };

  const getAllEventos = () => {
    const dbRef = ref(dbRealTime, "eventos");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val()
      const getKeys = Object.keys(data)
      const listaEventos: Evento[] = []
      getKeys.forEach((key) => {
        const value = { ...data[key], id: key }
        listaEventos.push(value)
      })
      
      setEventos(listaEventos);
      
    });
  };

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Cierra sesión en Firebase
      navigation.navigate('Login'); // Navega a la pantalla de inicio de sesión
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View style={styles.contentHome}>
        <View style={styles.headerHome}>
          <Avatar.Text size={55} label="MD" />
          <View>
            <Text variant="bodySmall">Bienvenido a Eventos MD</Text>
            <Text variant="labelLarge">{userForm.name}</Text>
          </View>
          <View style={styles.iconos}>
            <IconButton
              icon="cog"
              size={30}
              mode="contained"
              onPress={() => setShowModalProfile(true)}
            />
            <IconButton
              icon="logout" // Icono de cierre de sesión
              size={30}
              mode="contained"
              onPress={handleLogout} // Ejecuta la función de cierre de sesión
            />
          </View>
        </View>
        <View>
          <FlatList
            data={eventos}
            renderItem={({ item }) => <EventosComponent evento={item} />}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
      <Portal>
        <Modal visible={showModalProfile} contentContainerStyle={styles.modal}>
          <View style={styles.headerModal}>
            <Text variant="headlineLarge">Perfil de Eventos</Text>
            <IconButton
              icon="close"
              onPress={() => setShowModalProfile(false)}
            />
          </View>
          <Divider bold />
          <View>
            <TextInput
              mode="outlined"
              label="Nombre"
              value={userForm.name}
              onChangeText={(value) => handlerUpdateUserForm("name", value)}
              style={{ marginTop: 10 }}
            />
            <TextInput
              mode="outlined"
              label="Correo"
              value={userAuth?.email!}
              disabled
              style={{ marginTop: 10 }}
            />
          </View>
          <Button
            mode="contained"
            onPress={() => handlerUpdateUser()}
          >
            Actualizar
          </Button>
        </Modal>
      </Portal>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setShowModalEvento(true)}
      />
      <NuevoEventoComponent
        visible={showModalEvento}
        setVisible={setShowModalEvento}
      />
    </>
  );
};
