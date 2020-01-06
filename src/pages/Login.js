import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Platform,
  AsyncStorage
} from "react-native";

import api from "../services/api";

import logo from "../assets/logo.png";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [techs, setTechs] = useState("");

  useEffect(() => {
    // verifica se usuario ja está autenticado e direciona pra dash
    AsyncStorage.getItem('user').then(user => {
      if(user) {
        navigation.navigate('List')
      }
    })
  }, []);

  async function handleSubmit() {

    const response  = await api.post('/sessions',{
      email
    })

    const { _id: user_id } = response.data;

    //salva em um tipo de "localStorage"
    await AsyncStorage.setItem('user', user_id);
    await AsyncStorage.setItem('techs', techs);

    navigation.navigate('List');

  }

  return (
    <KeyboardAvoidingView
      enabled={Platform.OS === "ios"}
      behavior="padding"
      style={styles.containter}
    >
      <Image source={logo}></Image>
      <View style={styles.form}>
        <Text style={styles.label}>Seu e-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Seu e-mail:"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          value={email}
          onChangeText={setEmail}
        ></TextInput>
        <Text style={styles.label}>Tecnologias</Text>
        <TextInput
          style={styles.input}
          placeholder="Tecnologias de interesse:"
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        ></TextInput>
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Encontrar spots</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  containter: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },

  form: {
    alignSelf: "stretch",
    paddingHorizontal: 30,
    marginTop: 30
  },
  label: {
    fontWeight: "bold",
    color: "#444",
    marginBottom: 8
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    marginBottom: 20,
    borderRadius: 2,
    height: 40
  },
  button: {
    height: 42,
    backgroundColor: "#f05a5b",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16
  }
});
