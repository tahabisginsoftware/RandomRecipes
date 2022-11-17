import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, RefreshControl, View, ScrollView } from 'react-native';
import { Appbar, Card, Paragraph  } from 'react-native-paper';

export default function App() {
  const [meals, setMeals] = React.useState([]);
  const [refresh, setRefresh] = React.useState();

  const url = "https://www.themealdb.com/api/json/v1/1/random.php";
  console.log(meals)
  const getMeals = async function(){
    const response = await fetch(url);
    const data = await response.json();
    setMeals(data.meals);
  }

  React.useEffect(()=> {
    getMeals();
  }, [])
  const wait = (timeout) => { return new Promise(resolve => setTimeout(resolve, timeout)); }
  const onRefresh = React.useCallback(() => {
    setRefresh(true);
    getMeals();
    wait(500).then(() => setRefresh(false));
  }, []);
  return (
    <View>
      <Appbar.Header statusBarHeight={25} style={{backgroundColor: 'black'}}>
        <Appbar.Content title="Random Recipes" style={{ alignItems:'center'}}/>
      </Appbar.Header>
      <ScrollView 
      showsVerticalScrollIndicator={false} 
      contentContainerStyle={{justifyContent:'center',alignItems:'center', paddingTop: 30}}>
        {
          meals.map((meal) => (
            <Card key={meal.idMeal} style={styles.CardContainer}>
              <Card.Cover source={{uri: meal.strMealThumb}} style={{borderRadius:10}}/>
              <Card.Title title={meal.strMeal} subtitle={meal.strCategory} style={styles.CardTitle}/>
              <ScrollView 
              showsVerticalScrollIndicator={false}
              refreshControl={
              <RefreshControl
              refreshing={refresh}
              onRefresh={onRefresh}
              />
              }
              >
              <Card.Content style={styles.CardDesc}>
                <Paragraph style={styles.CardDesc}>{meal.strInstructions}</Paragraph>
              </Card.Content>
              </ScrollView>
            </Card>
          ))
        }
      </ScrollView>
      <StatusBar backgroundColor='black' style='light' translucent/>
    </View>
  );
}

const styles = StyleSheet.create({
  CardContainer: {
    maxWidth: 350,
    maxHeight: 600,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: '#ffebc6',
  },
  CardTitle: {
    fontWeight: '800',
    fontSize: 32
  },
  CardDesc: {
    fontWeight: '500',
    fontSize: 16
  }
});
