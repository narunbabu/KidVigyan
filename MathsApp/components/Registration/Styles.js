import {StyleSheet, StatusBar, Dimensions} from 'react-native';
// import {grey100} from 'react-native-paper/lib/typescript/styles/colors';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const styles = StyleSheet.create({
  container: {
    // height: 200,
    // flexDirection: "row",
    // justifyContent:,
    marginTop: StatusBar.currentHeight || 0,
    textAlign: 'center',
    alignSelf: 'center',
    width: '100%',

    margin: 15,
    padding: 10,
    marginTop: 50,
    borderColor: '#8d3ec2',
    borderWidth: 1,
    borderRadius: 20,
  },
  btn: {
    margin: 16,
    borderRadius: 20,
    width: 200,
  },
  intro: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  background: {
    width: '100%',
    height: '100%',
  },
  logo: {
    width: 120,
    height: 120,
    //   marginLeft: '15%',
    marginTop: '10%',
    marginBottom: '10%',
    borderRadius: 60,

    alignSelf: 'center',
  },
  name: {
    height: 50,
    textAlign: 'center',
    alignSelf: 'center',
    width: 200,
    fontSize: 30,
    color: '#FFCB1F',
    margin: 0,
    borderColor: '#8d3ec2',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#111',
  },
  input: {
    height: 50,
    textAlign: 'center',
    alignSelf: 'center',
    width: 200,
    fontSize: 20,
    color: '#FFCB1F',
    margin: 0,
    borderColor: '#8d3ec2',
    borderWidth: 0.4,
    borderRadius: 10,
    backgroundColor: 'grey',
  },
  date: {
    height: 50,
    alignSelf: 'center',
    width: 220,
    // margin:0,
    // borderColor: "#8d3ec2",
    // borderWidth: 1,
    // borderRadius: 20,
  },
  dropdown: {
    height: 50,
    // alignSelf: 'flex-end',
    width: 250,
    alignSelf: 'center',
    marginLeft: 20,
    // marginLeft: 100,
    // paddingLeft: 60,
    // borderColor: '#8d3ec2',
    // borderWidth: 1,
    borderRadius: 20,
  },
  dropdown_2: {
    alignSelf: 'center',
    width: 200,
    height: 30,
    // marginTop: 20,
    paddingTop: 5,
    right: 8,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 6,
    // backgroundColor: 'cornflowerblue',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  label: {
    textAlign: 'center',
    alignSelf: 'center',
    // width: 200,
    fontSize: 20,
    color: '#000',
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    marginTop: -50,

    alignSelf: 'center',
  },

  item: {
    backgroundColor: '#f9c2ff',
    paddingTop: Math.round(windowWidth / 6),
    marginVertical: 8,
    // marginHorizontal: 8,
    borderRadius: Math.round(windowWidth / 4),
    width: Math.round(windowWidth / 1.8),
    height: Math.round(windowWidth / 1.8),
    // margin: Math.round(windowWidth / 4),
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: Math.round(windowWidth / 2),
  },
  title: {
    fontSize: 32,
  },
  fab: {
    position: 'absolute',
    width: Math.round(windowWidth / 5),
    height: Math.round(windowWidth / 5),
    margin: Math.round(windowWidth / 20),
    right: 0,
    top: 0,
    borderRadius: Math.round(windowWidth / 5),
    backgroundColor: '#333',
    paddingTop: Math.round(windowWidth / 30),
    alignContent: 'center',
  },
});
// export default UserScreen
