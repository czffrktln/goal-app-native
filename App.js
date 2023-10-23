import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import GoalItem from './components/GoalIem';
import GoalInput from './components/GoalInput';

export default function App() {

  const [ courseGoals, setCourseGoals ] = useState([])
  const [ modalIsVisible, setModalIsVisible ] = useState(false)

  function startAddGoalHandler() {
    setModalIsVisible(true)
  }
  
  function endAddGoalHandler() {
    setModalIsVisible(false)
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals(currentCourseGoals => [
      ...currentCourseGoals, 
      // {text: enteredGoalText, key: Math.random().toString()}])
      { text: enteredGoalText, id: Math.random().toString() }
    ]);
    setModalIsVisible(false)
    // setCourseGoals([...courseGoals, enteredGoalText])
  }

  function deleteGoalHandler(id) {
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.id !== id)
    })
  }

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button 
          title='Add New Goal' 
          color="#a065ec" 
          onPress={startAddGoalHandler} 
        />
        <GoalInput visible={modalIsVisible} onAddGoal={addGoalHandler} onCancel={endAddGoalHandler} />
        {/* {modalIsVisible && <GoalInput onAddGoal={addGoalHandler} />} */}
        <View style={styles.goalsContainer}>
          <FlatList 
            data={courseGoals} 
            renderItem={(itemData) => {
              return (
                <GoalItem 
                  text={itemData.item.text} 
                  id={itemData.item.id}
                  onDeleteItem={deleteGoalHandler} 
                />
              )
            }}
            keyExtractor={(item, index) => {
              return item.id
            }}
            alwaysBounceVertical={false}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,  
    backgroundColor: '#1e085a'
  },
  goalsContainer: {
    flex: 5
  },
});
