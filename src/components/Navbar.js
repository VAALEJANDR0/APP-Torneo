import React from 'react';
import { BottomNavigation } from 'react-native-paper';

import EquiposScreen from '../screens/EquiposScreen';
import JugadoresScreen from '../screens/JugadoresScreen';
import PartidosScreen from '../screens/PartidosScreen';
import ResultadosScreen from '../screens/ResultadosScreen';

const Navbar = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'equipos', title: 'Equipos', icon: 'soccer' },
    { key: 'jugadores', title: 'Jugadores', icon: 'account-group' },
    { key: 'partidos', title: 'Partidos', icon: 'calendar' },
    { key: 'resultados', title: 'Resultados', icon: 'trophy' },
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
    />
  );
};

export default Navbar;
