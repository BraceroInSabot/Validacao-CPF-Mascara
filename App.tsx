import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function App() {
  const [cpf, setCpf] = useState('');
  const [isValid, setIsValid] = useState(true);

  const formatCpf = (value: string) => {
    const numeric = value.replace(/\D/g, '').slice(0, 11);

    let formatted = numeric;
    if (numeric.length > 3) {
      formatted = `${numeric.slice(0, 3)}.${numeric.slice(3)}`;
    }
    if (numeric.length > 6) {
      formatted = `${formatted.slice(0, 7)}.${numeric.slice(6)}`;
    }
    if (numeric.length > 9) {
      formatted = `${formatted.slice(0, 11)}-${numeric.slice(9)}`;
    }

    return formatted;
  };

  const handleCpfChange = (text: string) => {
    const formatted = formatCpf(text);
    setCpf(formatted);
    setIsValid(formatted.length === 14); 
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Digite seu CPF"
        keyboardType="numeric"
        value={cpf}
        onChangeText={handleCpfChange}
        style={[styles.input, !isValid && styles.inputError]}
      />
      {!isValid && cpf.length > 0 && (
        <Text style={styles.errorText}>
          CPF inválido, siga as instruções: 000.000.000-00
        </Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 20,
    paddingHorizontal: 10,
    width: '80%',
    borderRadius: 4,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginTop: 8,
  },
});
