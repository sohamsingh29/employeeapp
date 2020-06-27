import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Title, Card, Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";

const Profile = (props) => {
  const {
    _id,
    name,
    position,
    email,
    salary,
    image,
    phone,
  } = props.route.params.item;

  const delEmployee = () => {
    fetch("https://9ab9f47c8140.ngrok.io/delete", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: _id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${data.name} is deleted`);
        props.navigation.navigate("Home");
      })
      .catch((err) => Alert.alert("errrror!"));
  };

  const openDial = () => {
    if (Platform.OS === "android") {
      Linking.openURL(`tel:${phone}`);
    } else if (Platform.OS === "ios") {
      Linking.openURL(`telprompt:${phone}`);
    }
  };
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={["#ff73a3", "#ff75a5", "#ffb0cb"]}
        style={styles.gradient}
      />
      <View style={{ alignItems: "center" }}>
        <Image
          style={{ height: 150, width: 150, borderRadius: 75, marginTop: -55 }}
          source={{ uri: image }}
        />
      </View>
      <View style={{ alignItems: "center", marginTop: 10 }}>
        <Title style={{ color: "#ffffff" }}>{name}</Title>
        <Text style={styles.whiteText}>{position}</Text>
      </View>
      <Card
        style={styles.card}
        onPress={() => Linking.openURL(`mailto:${email}`)}
      >
        <View style={styles.content}>
          <MaterialIcons name="email" size={24} color="#fc85ae" />
          <Text style={styles.cardText}>{email}</Text>
        </View>
      </Card>
      <Card style={styles.card} onPress={() => openDial()}>
        <View style={styles.content}>
          <MaterialIcons name="phone" size={24} color="#fc85ae" />
          <Text style={styles.cardText}>{phone}</Text>
        </View>
      </Card>
      <Card style={styles.card}>
        <View style={styles.content}>
          <MaterialIcons name="attach-money" size={24} color="#fc85ae" />
          <Text style={styles.cardText}>{salary}</Text>
        </View>
      </Card>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          marginTop: 20,
        }}
      >
        <Button
          icon="account-edit"
          theme={theme}
          mode="contained"
          onPress={() =>
            props.navigation.navigate("Create", {
              _id,
              name,
              position,
              email,
              salary,
              image,
              phone,
            })
          }
        >
          Edit
        </Button>
        <Button
          icon="delete"
          theme={theme}
          mode="contained"
          onPress={() => delEmployee()}
        >
          Fire Employee
        </Button>
      </View>
    </View>
  );
};

const theme = {
  colors: {
    primary: "#ff73a3",
  },
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  gradient: {
    height: "20%",
  },
  whiteText: {
    color: "#ffffff",
    fontSize: 16,
  },
  card: {
    margin: 15,
    backgroundColor: "#1e2535",
  },
  cardText: {
    color: "#ffffff",
    fontSize: 16,
    marginLeft: 20,
  },
  content: {
    padding: 10,
    flexDirection: "row",
  },
});

export default Profile;
