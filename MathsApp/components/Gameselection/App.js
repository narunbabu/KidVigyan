import React from 'react';
import {Text} from 'react-native';
import GameSelect from './GameSelect';
import {useEffect, useState} from 'react';
import {
  db,
  getData,
  createTable,
  getDataWithextrafield,
  getDataWithextrafieldWithFilter,
} from '../../Functions/SqlFunctions';
import {models} from '../../Data/Models';
import UserChecklist from './UserChecklist';

export default App = () => {
  return <GameSelect />;
};
