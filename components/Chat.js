import React from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
} from 'react-native';



// <Chat /> is, obviously, the chat screen.
// The name the user chose to input in the <Start /> screen has been accessed via 'this.props.route.params.name'.
// It then uses 'setOptions' to set the title of the screen to that name.
// The user can also navigate back to the <Start /> screen.
export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    }
  }


  
  render() {
    // Takes the state of 'name' that was passed as a prop to <Chat /> and uses the prop sets it to the title of the screen
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
  
    let { bgColor } = this.props.route.params;
    return (
      <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: bgColor
        }} 
      >
        <Text>Welcome to the Chat!</Text>
      </View>
    )
  }
}

// const styles = StyleSheet.create({
//   chatContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// })