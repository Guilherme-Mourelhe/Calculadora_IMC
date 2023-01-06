import { StyleSheet, Text, View } from 'react-native';
import Title from './src/components/Title'; // IMPORTANDO O COMPONENTE
import Form from './src/components/Form';
import ResultIMC from './src/components/Form/ResultIMC';
export default function App() {
  return ( 

    <View style={styles.container}>
      <Title/>
      <Form/>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e5e5',
    paddingTop: 80,
  },
});
