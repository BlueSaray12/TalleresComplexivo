import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  contect: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 10 /*Distibuye todos los componentes*/,
  },
  input: {
    width: "90%",
  },
  buttons: {
    width: "90%",
    backgroundColor: "#0097A7",
  },
  textNavegador: {
    marginTop: 10,
    fontSize: 12,
    color: "#00897B",
    fontWeight: "bold",
  },
  contentHome: {
    flex: 1,
    marginVertical: 50,
    marginHorizontal: 20,
  },
  headerHome: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  iconos: {
    flex: 1,
    alignItems: "flex-end",
  },
  modal: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: "#E0F7FA",
    marginHorizontal: 20,
    borderRadius: 10,
  },
  headerModal: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    backgroundColor: "#B2EBF2",


  },
  contentEventos: {
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 30,
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 10,
    bottom: 10,
  },
  contentDetalleEvento: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    gap: 20,
  },
  evento: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  textMessage: {
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 18,
  },
  botones1: {
    backgroundColor: "#0097A7",
  },
  botones2: {
    backgroundColor: "#BA68C8",
  },
});
