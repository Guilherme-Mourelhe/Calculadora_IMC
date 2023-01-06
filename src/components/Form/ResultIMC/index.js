import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Share } from "react-native";
import styles from "./style";
export default function ResultIMC(props) {
  const onShare = async () => {
    const result = await Share.share({
      message:
        "Meu imc hoje é: " +
        props.resultIMC +
        "  compartilhado do app COD-HEALTH",
    });
  };

  return (
    <View style={styles.resultImc}>
      <View style={styles.boxSharebutton}>
        <Text style={styles.information}> {props.messageResultIMC} </Text>
        <Text style={styles.numberImc}> {props.resultIMC} </Text>
        <TouchableOpacity onPress={onShare} style={styles.shared}>
          <Text style={styles.sharedText}> Share </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
