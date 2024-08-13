import React from 'react';
import { BottomNavigation } from 'react-native-paper';
import Icon from './Icon'; 

import EquiposScreen from '../screens/EquiposScreen';
import JugadoresScreen from '../screens/JugadoresScreen';
import PartidosScreen from '../screens/PartidosScreen';
import ResultadosScreen from '../screens/ResultadosScreen';

const renderIcon = ({ route }) => {
  switch (route.key) {
    case 'equipos':
      return <Icon type="Feather" name="shield" color="black" size={28} />;
    case 'jugadores':
      return <Icon type="FontAwesome6" name="people-group" color="black" size={25} />;
    case 'partidos':
      return <Icon type="MaterialCommunityIcons" name="tournament" color="black" size={30} />;
    case 'resultados':
      return <Icon type="Foundation" name="results" color="black" size={30} />;
    default:
      return null;
  }
};

const Navbar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'equipos', title: 'Equipos' },
    { key: 'jugadores', title: 'Jugadores' },
    { key: 'partidos', title: 'Partidos' },
    { key: 'resultados', title: 'Resultados' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    equipos: EquiposScreen,
    jugadores: JugadoresScreen,
    partidos: PartidosScreen,
    resultados: ResultadosScreen,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      renderIcon={renderIcon}
    />
  );
};

export default Navbar;
