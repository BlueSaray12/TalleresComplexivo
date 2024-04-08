import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Divider, Text, TextInput } from "react-native-paper";
import { styles } from "../../theme/styles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Evento } from "./HomeScreen";
import { ref, remove, update } from "firebase/database";
import { dbRealTime } from "../../configs/firebaseConfig";

export const DetalleEventoScreen = () => {
  const navigation = useNavigation();
  //Acceder a los parametros de navegacion
  const route = useRoute();
  //@ts-ignore
  const { evento } = route.params;
  //console.log(evento);

  const [detalleEvent, setDetalleEvent] = useState<Evento>({
    id: "",
    to: "",
    subject: "",
    message: "",
  });

  //HOOK que carga los datos recibidos en el detailForm
  useEffect(() => {
    setDetalleEvent(evento);
  }, []);

  //Función que permita actualizar la data del formulario
  const handlerSetDetalle = (key: string, value: string) => {
    setDetalleEvent({ ...detalleEvent, [key]: value });
  };

  //Función para actualizar los eventos
  const handlerUpdateEvento = async () => {
    //Referencia a la base de datos
    const dbRef = ref(dbRealTime, "eventos/" + detalleEvent.id);
    await update(dbRef, {
      subject: detalleEvent.subject,
      message: detalleEvent.message,
    });
    navigation.goBack();
    //console.log(detailForm);
  };

  //Funcion para eliminar la carta
  const handlerEliminarEvento = async () => {
    const dbRef = ref(dbRealTime, "eventos/" + detalleEvent.id);
    await remove(dbRef);
    navigation.goBack();
  };

  return (
    <View style={styles.contentDetalleEvento}>
      <View style={styles.evento}>
        <Text variant="titleMedium">Asunto de Evento: </Text>
        <TextInput
          value={detalleEvent.subject}
          onChangeText={(value) => handlerSetDetalle("subject", value)}
          style={{ flex: 1 }}
        />
      </View>
      <Divider bold />
      <View>
        <Text variant="bodyLarge">Para: {detalleEvent.to}</Text>
      </View>
      <Divider />
      <View>
        <Text style={styles.textMessage}>Mensaje de Evento</Text>
        <TextInput
          value={detalleEvent.message}
          multiline={true}
          numberOfLines={7}
          onChangeText={(value) => handlerSetDetalle("message", value)}
        />
      </View>
      <Button
        mode="contained"
        icon="update"
        onPress={handlerUpdateEvento}
        style={styles.botones1}
      >
        Actualizar Evento
      </Button>
      <Button
        mode="contained"
        icon="delete-variant"
        onPress={() => handlerEliminarEvento()}
        style={styles.botones2}
      >
        Eliminar Evento
      </Button>
    </View>
  );
};
