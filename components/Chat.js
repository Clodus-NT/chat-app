import React from "react";
import {
  View,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat'


// <Chat /> is, obviously, the chat screen.
// The name the user chose to input in the <Start /> screen has been accessed via 'this.props.route.params.name'.
// It then uses 'setOptions' to set the title of the screen to that name.
// The user can also navigate back to the <Start /> screen.
export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      messages: [
        {
          _id: 1,
          text: "Hello developer",
          createdAt: new Date(),
          user: {
            _id: 2,
            name: "React Native",
            avatar: "https://placeimg.com/140/140/any",
          },
        },
        {
          _id: 2,
          text: 'Welcome to the Chat!',
          createdAt: new Date(),
          system: true,
         },
      ],
    }
  }

  // componentDidMount() {
  //   this.setState({
  //     message: [
  //       {
  //         _id: 1,
  //         text: 'Hello Developer',
  //         createdAt: new Date(),
  //         user: {
  //           _id: 2,
  //           name: 'React Native',
  //           avatar: 'https://placeimg.com/140/140/any',
  //         },
  //       },
  //     ],
  //   })
  // }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000'
          }
        }}
      />
    )
  }
  
  render() {
    // Takes the state of 'name' that was passed as a prop to <Chat /> and uses the prop sets it to the title of the screen
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });
    
    //Similar to 'name' above, the state of the chosen bgColor 
    //was passed as a prop from <Start /> to <Chat />
    let { bgColor } = this.props.route.params;

    return (
      <View style={[{ backgroundColor: bgColor }, styles.chatContainer]} 
      >
        <GiftedChat
          renderBubble={this.renderBubble.bind(this)}
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  chatContainer: {
    flex: 1,
  },
})