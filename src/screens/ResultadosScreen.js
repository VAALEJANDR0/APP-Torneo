import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import resultadoService from '../services/resultadoService';
import partidoService from '../services/partidoService';
import equipoService from '../services/equipoService';

const ResultadosScreen = () => {
  const [resultados, setResultados] = useState([]);
  const [partidos, setPartidos] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentResultado, setCurrentResultado] = useState({ id: null, partido_id: '', puntaje_equipo_local: '', puntaje_equipo_visitante: '' });

  useEffect(() => {
    const fetchResultados = async () => {
      try {
        const data = await resultadoService.getResultados();
        setResultados(data);
      } catch (error) {
        console.error('Error fetching resultados:', error);
      }
    };

    const fetchPartidos = async () => {
      try {
        const data = await partidoService.getPartidos();
        setPartidos(data);
      } catch (error) {
        console.error('Error fetching partidos:', error);
      }
    };

    const fetchEquipos = async () => {
      try {
        const data = await equipoService.getEquipos();
        setEquipos(data);
      } catch (error) {
        console.error('Error fetching equipos:', error);
      }
    };

    fetchResultados();
    fetchPartidos();
    fetchEquipos();
  }, []);

  const handleEdit = (resultado) => {
    setCurrentResultado(resultado);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await resultadoService.deleteResultado(id);
      setResultados(resultados.filter(resultado => resultado.id !== id));
    } catch (error) {
      console.error('Error deleting resultado:', error);
    }
  };

  const handleAdd = () => {
    setCurrentResultado({ id: null, partido_id: '', puntaje_equipo_local: '', puntaje_equipo_visitante: '' });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (currentResultado.id) {
        await resultadoService.updateResultado(currentResultado.id, currentResultado);
      } else {
        await resultadoService.addResultado(currentResultado);
      }
      setShowModal(false);
      const data = await resultadoService.getResultados();
      setResultados(data);
    } catch (error) {
      console.error('Error saving resultado:', error);
    }
  };

  const handleChange = (name, value) => {
    setCurrentResultado(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const getEquipoNombre = (equipoId) => {
    const equipo = equipos.find(equipo => equipo.id === equipoId);
    return equipo ? equipo.nombre : '';
  };

  const getPartidoDescripcion = (partidoId) => {
    const partido = partidos.find(partido => partido.id === partidoId);
    if (partido) {
      const local = getEquipoNombre(partido.equipo_local_id);
      const visitante = getEquipoNombre(partido.equipo_visitante_id);
      return `${local} vs ${visitante}`;
    }
    return '';
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Lista de Resultados</Text>
        <FlatList
          data={resultados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.resultadoContainer}>
              <Text style={styles.resultadoName}>{getPartidoDescripcion(item.partido_id)}</Text>
              <Text>{item.puntaje_equipo_local} - {item.puntaje_equipo_visitante}</Text>
              <TouchableOpacity onPress={() => handleEdit(item)} style={styles.button}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={[styles.button, styles.buttonDanger]}>
                <Text style={styles.buttonText}>Borrar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <Button title="Agregar Resultado" onPress={handleAdd} />

        <Modal visible={showModal} animationType="slide">
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{currentResultado.id ? 'Editar Resultado' : 'Agregar Resultado'}</Text>
            <Picker
              selectedValue={currentResultado.partido_id}
              onValueChange={(value) => handleChange('partido_id', value)}
            >
              <Picker.Item label="Selecciona un partido" value="" />
              {partidos.map((partido) => (
                <Picker.Item key={partido.id} label={`${partido.id} - ${getEquipoNombre(partido.equipo_local_id)} vs ${getEquipoNombre(partido.equipo_visitante_id)}`} value={partido.id} />
              ))}
            </Picker>
            <TextInput
              style={styles.input}
              placeholder="Puntaje Equipo Local"
              value={currentResultado.puntaje_equipo_local}
              onChangeText={(text) => handleChange('puntaje_equipo_local', text)}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Puntaje Equipo Visitante"
              value={currentResultado.puntaje_equipo_visitante}
              onChangeText={(text) => handleChange('puntaje_equipo_visitante', text)}
              keyboardType="numeric"
            />
            <Button title="Guardar" onPress={handleSave} />
            <Button title="Cancelar" onPress={() => setShowModal(false)} />
          </View>
        </Modal>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  resultadoContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  resultadoName: {
    fontSize: 18,
  },
  button: {
    backgroundColor: '#f0ad4e',
    padding: 10,
    marginTop: 10,
  },
  buttonDanger: {
    backgroundColor: '#d9534f',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  modalContent: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

export default ResultadosScreen;
