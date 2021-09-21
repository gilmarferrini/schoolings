import React, { useState, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../../components/Button';

import {
  Container,
  TitleArea,
  Title,
  Input, 
  FlatListArea, 
  FlatListHeader,
  FlatListHeaderText,
  SchoolingCard, 
  SchoolingCardText,
  DeleteButtonArea } from './styles';

interface ISchooling {
  id: string;
  code: number;
  schooling: string;
}

export function Home() {

  const [data, setData] = useState<ISchooling[]>([]);

  const [code, setCode] = useState<string>('');
  const [schooling, setSchooling] = useState<string>('')

  async function loadData() {
    const storagedData = await AsyncStorage.getItem('@schoolingArray')
    if (storagedData) {
      setData(JSON.parse(storagedData))
    }

  }

  async function saveData() {
    await AsyncStorage.setItem('@schoolingArray', JSON.stringify(data))
  }

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    saveData()
  }, [data])


  async function handleAddSchooling() {
    if (code === '' || schooling === '') {
      alert('Favor preencher o campo que está vazio');
      return;
    }
    
    const id = new Date().getTime().toString()

    const newSchooling = {
      id,
      code: +code,
      schooling
    };

    setData([...data, newSchooling]);

    setCode('');
    setSchooling('');
  }

  function removeSchooling(id: string) {
    const filteredSchooling = data.filter(item => item.id !== id);
    setData(filteredSchooling)
  }

  return (
    <Container>
      <TitleArea>
        <Title>
          Schoolings
        </Title>
      </TitleArea>

      <View>

        <Input 
          placeholder="Entre com o código da escolaridade: "
          placeholderTextColor="#28262C"
          keyboardType="numeric"
          value={code}
          onChangeText={value => setCode(value)}
        />
        
        <Input 
          placeholder="Entre com a escolaridade: "
          placeholderTextColor="#28262C"
          value={schooling}
          onChangeText={value => setSchooling(value)}
        />

        <Button 
          title="Adicionar"
          onPress={handleAddSchooling}
        />

      </View>

      <FlatListHeader>
          <FlatListHeaderText>Chave</FlatListHeaderText>
          <FlatListHeaderText>Descrição</FlatListHeaderText>
      </FlatListHeader>

      <FlatListArea
        style={{ backgroundColor: (data.length === 0 ? '#28262C' : '#F9F5FF') }}
      >
        <FlatList 
          showsVerticalScrollIndicator={false}
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item, index }) => (
            <>
              <SchoolingCard 
                style={{ backgroundColor: (index % 2 === 0 ? '#c5c5c5': '#F9F5FF') }}
              >
                <SchoolingCardText>{item.code}</SchoolingCardText>
                <SchoolingCardText>{item.schooling}</SchoolingCardText>
                <DeleteButtonArea>
                  <Button
                    title="X"
                    titleHexColor=""
                    style={{ backgroundColor: 'red'}}
                    onPress={() => removeSchooling(item.id)}
                  />
                </DeleteButtonArea>
              </SchoolingCard>
            </>
          )}
        />
      </FlatListArea>

    </Container>
  );
}
