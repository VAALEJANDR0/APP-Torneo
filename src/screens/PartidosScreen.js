import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import partidoService from '../services/partidoService';
import equipoService from '../services/equipoService';

const PartidosScreen = () => {
  const [partidos, setPartidos] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPartido, setCurrentPartido] = useState({ id: null, equipo_local_id: '', equipo_visitante_id: '', fecha_partido: '' });

  useEffect(() => {
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

    fetchPartidos();
    fetchEquipos();
  }, []);

  const handleEdit = (partido) => {
    setCurrentPartido(partido);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await partidoService.deletePartido(id);
      setPartidos(partidos.filter(partido => partido.id !== id));
    } catch (error) {
      console.error('Error deleting partido:', error);
    }
  };

  const handleAdd = () => {
    setCurrentPartido({ id: null, equipo_local_id: '', equipo_visitante_id: '', fecha_partido: '' });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (currentPartido.id) {
        await partidoService.updatePartido(currentPartido.id, currentPartido);
      } else {
        await partidoService.addPartido(currentPartido);
      }
      setShowModal(false);
      const data = await partidoService.getPartidos();
      setPartidos(data);
    } catch (error) {
      console.error('Error saving partido:', error);
    }
  };

  const handleChange = (name, value) => {
    setCurrentPartido(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const getEquipoNombre = (equipoId) => {
    const equipo = equipos.find(equipo => equipo.id === equipoId);
    return equipo ? equipo.nombre : '';
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Lista de Partidos</Text>
        <FlatList
          data={partidos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.partidoContainer}>
              <Text style={styles.partidoName}>{getEquipoNombre(item.equipo_local_id)} vs {getEquipoNombre(item.equipo_visitante_id)}</Text>
              <Text>{item.fecha_partido}</Text>
              <TouchableOpacity onPress={() => handleEdit(item)} style={styles.button}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={[styles.button, styles.buttonDanger]}>
                <Text style={styles.buttonText}>Borrar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <Button title="Agregar Partido" onPress={handleAdd} />

        <Modal visible={showModal} animationType="slide">
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{currentPartido.id ? 'Editar Partido' : 'Agregar Partido'}</Text>
            <Picker
              selectedValue={currentPartido.equipo_local_id}
              onValueChange={(value) => handleChange('equipo_local_id', value)}
            >
              <Picker.Item label="Selecciona un equipo" value="" />
              {equipos.map((equipo) => (
                <Picker.Item key={equipo.id} label={equipo.nombre} value={equipo.id} />
              ))}
            </Picker>
            <Picker
              selectedValue={currentPartido.equipo_visitante_id}
              onValueChange={(value) => handleChange('equipo_visitante_id', value)}
            >
              <Picker.Item label="Selecciona un equipo" value="" />
              {equipos.map((equipo) => (
                <Picker.Item key={equipo.id} label={equipo.nombre} value={equipo.id} />
              ))}
            </Picker>
            <TextInput
              style={styles.input}
              placeholder="Fecha del Partido"
              value={currentPartido.fecha_partido}
              onChangeText={(text) => handleChange('fecha_partido', text)}
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
  partidoContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  partidoName: {
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

export default PartidosScreen;
