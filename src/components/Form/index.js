import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Vibration,
  Pressable,
  Keyboard,
  FlatList,
} from "react-native";
import ResultIMC from "./ResultIMC";
import styles from "./style";
export default function Form() {
  const [height, setHeight] = useState(null);
  const [weight, setWeight] = useState(null);
  const [messageImc, setMessageImc] = useState("Prencha o seu peso e a altura");
  const [imc, setImc] = useState(null);
  const [textButton, setTextButton] = useState("Calcular");
  const [errorMessage, setErrorMessage] = useState(null);
  const [imcList, setImcList] = useState([]);
  //Função que valida os estados criados e reinicia as variáveis, permitindo que o usuário possa calcular mais de uma vez o IMC.

  function validationImc() {
    if (height != null && weight != null) {
      imcCalculator();
      setMessageImc("O seu imc é: ");
      setTextButton("Calcular Novamente");
      setHeight(null);
      setWeight(null);
      setErrorMessage(null);
    } else {
      verificationImc();
      setImc(null);
      setTextButton("Calcular");
      setMessageImc("Preencha o peso e a altura");
    }
  }

  function imcCalculator() {
    let heightformat = height.replace(",", ".");
    let totalImc = (weight / (heightformat * heightformat)).toFixed(2);
    setImcList((arr) => [...arr, { id: new Date().getTime(), imc: totalImc }])
    setImc(totalImc);
  }

  function verificationImc() {
    if (imc == null) {
      setErrorMessage("Campo Obrigatório *");
      Vibration.vibrate();
    }
  }

  return (
    //placeholder é uma propriedade de textinput que mostra um texto dentro do input pro usuário antes do mesmo digitar
    //keyboardType é uma propriedade do textinput que seleciona o tipo de teclado que o programa deseja do dispositivo do usuário

    <View style={styles.formContext}>
      {imc == null ? (
        <Pressable onPress={Keyboard.dismiss} style={styles.form}>
          <Text style={styles.formLabel}> Altura </Text>
          <Text style={styles.errorMessage}> {errorMessage} </Text>
          <TextInput
            style={styles.input}
            onChangeText={setHeight}
            value={height}
            placeholder="Ex: 1.65"
            keyboardType="numeric"
          />

          <Text style={styles.formLabel}> Peso </Text>
          <Text style={styles.errorMessage}> {errorMessage} </Text>
          <TextInput
            style={styles.input}
            onChangeText={setWeight}
            value={weight}
            placeholder="Ex: 74.20"
            keyboardType="numeric"
          />
          <TouchableOpacity
            style={styles.buttonCalculator}
            onPress={() => {
              validationImc();
            }}
          >
            <Text style={styles.textButtonCalculator}>{textButton}</Text>
          </TouchableOpacity>
        </Pressable>
      ) : (
        <View style={styles.exhibitionResultImc}>
          <ResultIMC messageResultIMC={messageImc} resultIMC={imc} />
          <TouchableOpacity
            style={styles.buttonCalculator}
            onPress={() => {
              validationImc();
            }}
          >
            <Text style={styles.textButtonCalculator}>{textButton}</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.listImcs}
        data={imcList.reverse()}
        renderItem={({ item }) => {
          return (
        <Text style={styles.resultImcItem}>
          <Text style={styles.textResultItemList}> Resultado IMC = </Text>
          {item.imc}
          </Text>
          )
        }}
        keyExtractor={(item) => { item.id; }}
      />
    </View>
  );
}
