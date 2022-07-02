import React from "react";
import {
  View,
  Text,
  Button,
  Pressable,
  TextInput,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import BackgroundImage from  "../assets/background-image.png";

// <Start /> component functions as the welcome screen for the App.
// The user can input their name (which changes the state of 'name' 
//  and continue on to the <Chat /> screen
// When the 'enter the chat' button is pressed, it navigates to to <Chat /> Screen
//  and passes the state of 'name' to <Chat /> component as a prop
//  (this allows <Chat /> to render the state of 'name' as the title of the screen).
// The user can also select the background color of the <Chat /> screen.
export default class Start extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      bgColor: this.colors.purple,
    }
  }

  changeBgColor = (newColor) => {
    this.setState({ bgColor: newColor });
  };

  colors = {
    black: "#090C08",
    purple: "#474056",
    grey: "#8A95A5",
    green: "#B9C6AE",
  };


  render() {
    return (
      <View style={styles.startContainer}>
        <ImageBackground
          source={BackgroundImage}
          resizeMode="cover"
          style={styles.image}
        >
          <Text style={styles.startTitle} >Welcome!</Text>
          {/* TextInput needs to be wrapper in a View element. 
              Otherwise, the border styling won't render.
              This is a known bug with React Native */}
          <View style={styles.box}>
            <TextInput
              style={styles.input}
              onChangeText={(name) => this.setState({ name })}
              value={this.state.name}
              placeholder="What's your name?"
            />

            <Text style={styles.chooseColorText}>Choose Background Color:</Text>

            <View style={styles.colorBox}>
              <TouchableOpacity
                style={styles.color1}
                onPress={() => this.changeBgColor(this.colors.black)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.color2}
                onPress={() => this.changeBgColor(this.colors.purple)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.color3}
                onPress={() => this.changeBgColor(this.colors.grey)}
              ></TouchableOpacity>
              <TouchableOpacity
                style={styles.color4}
                onPress={() => this.changeBgColor(this.colors.green)}
              ></TouchableOpacity>
            </View>

            <Pressable 
              style={styles.enterBtn} 
              onPress={() => {
                this.props.navigation.navigate('Chat', { name: this.state.name })
              }}
            >
              <Text style={styles.enterBtnText}>Start Chatting</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  startContainer: {
    flex: 1,
  },

  image: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  startTitle: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF'
  },

  box: {
    height: '44%',
    width: '88%',
    backgroundColor: '#FFFFFF',
    borderColor: 'gray',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  input: {
    height: 50,
    width: '88%',
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    borderColor: 'gray',
    borderWidth: 1,
    justifyContent: 'center',
    paddingLeft: 5,
    opacity: 0.5,
  },

  chooseColorText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 1,
  },

  colorBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },

  color1: {
    backgroundColor: '#090C08',
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  color2: {
    backgroundColor: '#474056',
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  color3: {
    backgroundColor: '#8A95A5',
    width: 40,
    height: 40,
    borderRadius: 20,
  },

  color4: {
    backgroundColor: '#B9C6AE',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  
  enterBtn: {
    height: 50,
    width: '88%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#757083',
    borderColor: 'gray',
    borderWidth: 1,
  },

  enterBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  }
})