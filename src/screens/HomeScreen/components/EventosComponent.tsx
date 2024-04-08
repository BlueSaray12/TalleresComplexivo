import React from "react";
import { IconButton, Text } from "react-native-paper";
import { styles } from "../../../theme/styles";
import { Evento } from "../HomeScreen";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { View } from "react-native";

interface Props {
  evento: Evento;
}

export const EventosComponent = ({ evento }: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.contentEventos}>
      <View>
        <Text variant="labelLarge">Para: {evento.to}</Text>
        <Text variant="bodyMedium">Descripción del Evento: {evento.subject}</Text>
      </View>
      <View style={styles.iconos}>
        <IconButton
          icon="email-open"
          size={25}
          onPress={() =>
            navigation.dispatch(
              CommonActions.navigate({ name: "Detail", params: { evento } })
            )
          }
        />
      </View>
    </View>
  );
};
