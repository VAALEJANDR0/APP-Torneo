import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Picker } from '@react-native-picker/picker';
import jugadorService from '../services/jugadorService';
import equipoService from '../services/equipoService';

const JugadoresScreen = () => {
  const [jugadores, setJugadores] = useState([]);
  const [equipos, setEquipos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentJugador, setCurrentJugador] = useState({ id: null, equipo_id: '', nombre: '', numero: '', posicion: '' });

  const posiciones = [
    "Portero",
    "Defensa central",
    "Defensa lateral",
    "Mediocentro",
    "Mediapunta",
    "Extremo izquierdo",
    "Extremo derecho",
    "Delantero"
  ];

  useEffect(() => {
    const fetchJugadores = async () => {
      try {
        const data = await jugadorService.getJugadores();
        setJugadores(data);
      } catch (error) {
        console.error('Error fetching jugadores:', error);
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

    fetchJugadores();
    fetchEquipos();
  }, []);

  const handleEdit = (jugador) => {
    setCurrentJugador(jugador);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await jugadorService.deleteJugador(id);
      setJugadores(jugadores.filter(jugador => jugador.id !== id));
    } catch (error) {
      console.error('Error deleting jugador:', error);
    }
  };

  const handleAdd = () => {
    setCurrentJugador({ id: null, equipo_id: '', nombre: '', numero: '', posicion: '' });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (currentJugador.id) {
        await jugadorService.updateJugador(currentJugador.id, currentJugador);
      } else {
        await jugadorService.addJugador(currentJugador);
      }
      setShowModal(false);
      const data = await jugadorService.getJugadores();
      setJugadores(data);
    } catch (error) {
      console.error('Error saving jugador:', error);
    }
  };

  const handleChange = (name, value) => {
    setCurrentJugador(prevState => ({
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
        <Text style={styles.title}>Lista de Jugadores</Text>
        <FlatList
          data={jugadores}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.jugadorContainer}>
              <Text style={styles.jugadorName}>{item.nombre}</Text>
              <Text>{getEquipoNombre(item.equipo_id)}</Text>
              <Text>{item.numero}</Text>
              <Text>{item.posicion}</Text>
              <TouchableOpacity onPress={() => handleEdit(item)} style={styles.button}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={[styles.button, styles.buttonDanger]}>
                <Text style={styles.buttonText}>Borrar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <Button title="Agregar Jugador" onPress={handleAdd} />

        <Modal visible={showModal} animationType="slide">
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{currentJugador.id ? 'Editar Jugador' : 'Agregar Jugador'}</Text>
            <Picker
              selectedValue={currentJugador.equipo_id}
              onValueChange={(value) => handleChange('equipo_id', value)}
            >
              <Picker.Item label="Selecciona un equipo" value="" />
              {equipos.map((equipo) => (
                <Picker.Item key={equipo.id} label={equipo.nombre} value={equipo.id} />
              ))}
            </Picker>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={currentJugador.nombre}
              onChangeText={(text) => handleChange('nombre', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Número"
              value={currentJugador.numero}
              onChangeText={(text) => handleChange('numero', text)}
              keyboardType="numeric"
            />
            <Picker
              selectedValue={currentJugador.posicion}
              onValueChange={(value) => handleChange('posicion', value)}
            >
              <Picker.Item label="Selecciona una posición" value="" />
              {posiciones.map((posicion, index) => (
                <Picker.Item key={index} label={posicion} value={posicion} />
              ))}
            </Picker>
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
  jugadorContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  jugadorName: {
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

export default JugadoresScreen;
