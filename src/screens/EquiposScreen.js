import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TextInput, Modal, TouchableOpacity } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import equipoService from '../services/equipoService';

const EquiposScreen = () => {
  const [equipos, setEquipos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEquipo, setCurrentEquipo] = useState({ id: null, nombre: '', entrenador: '' });

  useEffect(() => {
    const fetchEquipos = async () => {
      try {
        const data = await equipoService.getEquipos();
        setEquipos(data);
      } catch (error) {
        console.error('Error fetching equipos:', error);
      }
    };

    fetchEquipos();
  }, []);

  const handleEdit = (equipo) => {
    setCurrentEquipo(equipo);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    try {
      await equipoService.deleteEquipo(id);
      setEquipos(equipos.filter(equipo => equipo.id !== id));
    } catch (error) {
      console.error('Error deleting equipo:', error);
    }
  };

  const handleAdd = () => {
    setCurrentEquipo({ id: null, nombre: '', entrenador: '' });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (currentEquipo.id) {
        await equipoService.updateEquipo(currentEquipo.id, currentEquipo);
      } else {
        await equipoService.addEquipo(currentEquipo);
      }
      setShowModal(false);
      const data = await equipoService.getEquipos();
      setEquipos(data);
    } catch (error) {
      console.error('Error saving equipo:', error);
    }
  };

  const handleChange = (name, value) => {
    setCurrentEquipo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Lista de Equipos</Text>
        <FlatList
          data={equipos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.equipoContainer}>
              <Text style={styles.equipoName}>{item.nombre}</Text>
              <Text>{item.entrenador}</Text>
              <TouchableOpacity onPress={() => handleEdit(item)} style={styles.button}>
                <Text style={styles.buttonText}>Editar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)} style={[styles.button, styles.buttonDanger]}>
                <Text style={styles.buttonText}>Borrar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
        <Button title="Agregar Equipo" onPress={handleAdd} />

        <Modal visible={showModal} animationType="slide">
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{currentEquipo.id ? 'Editar Equipo' : 'Agregar Equipo'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={currentEquipo.nombre}
              onChangeText={(text) => handleChange('nombre', text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Entrenador"
              value={currentEquipo.entrenador}
              onChangeText={(text) => handleChange('entrenador', text)}
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
  equipoContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  equipoName: {
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

export default EquiposScreen;
