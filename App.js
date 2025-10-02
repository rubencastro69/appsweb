import {StyleSheet, Text, View, Image, SectionList, SafeAreaView} from 'react-native';

const Cell = props => {
  const randomNumber = Math.floor(Math.random() * 100 + 50);
  return (
    <View style={styles.profContainer}>
      <Image
        style={styles.profImage}
        source={{uri: `https://picsum.photos/${randomNumber}`}}
      />
      <Text> Hello, I am {props.name}</Text>
    </View>
  );
};

const DATA = [
  {
    title: 'Profesores',
    data: [
      {id: 1, name: "Mario"},
      {id: 2, name: "Juan"},
      {id: 3, name: "Manuel"},
      {id: 4, name: "Jesús"},
      {id: 5, name: "Alberto"},
    ],
  },
  {
    title: "Alumnos",
    data: [
      {id: 6, name: "Rubén"},
      {id: 7, name: "Ernesto"},
      {id: 8, name: "Nick"},
      {id: 9, name: "Jorge"},
      {id: 10, name: "Antonio"},
    ],
  },
];

export default App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SectionList
        sections={DATA}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => <Cell name={item.name} />}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profContainer: {
    flexDirection: "row",
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000000",
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  profImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 10,
    backgroundColor: "#e0e0e0",
  },
});