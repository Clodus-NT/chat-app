import React from "react";
import {
  View,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
// import AsyncStorage from '@react-native-async-storage/async-storage';
    
//Firebase Import
const firebase = require('firebase');
require('firebase/firestore');

// The name the user chose to input in the <Start /> screen has been accessed via 'this.props.route.params.name'.
// It then uses 'setOptions' to set the title of the screen to that name.
export default class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      messages: [],
      uid: 0,
      user: {
        _id: '',
        name: '',
        avatar: '',
      },
    };

    //Firestore SDK
    const firebaseConfig = {
      apiKey: "AIzaSyB7eiejZrfX8mniSS0y5RZ_qvZDDI8Q02Y",
      authDomain: "chatapp-883ac.firebaseapp.com",
      projectId: "chatapp-883ac",
      storageBucket: "chatapp-883ac.appspot.com",
      messagingSenderId: "67149843118",
      appId: "1:67149843118:web:80fab2230cf4ce87d5bb3f"
    };

    //Initializes Firestore
    if (!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
    }

    //Stores and retrieves chat messages
    this.referenceChatMessages = firebase.firestore().collection("messages");
  }

  componentDidMount() {
    // Takes the state of 'name' that was passed as a prop to <Chat /> and uses the prop sets it to the title of the screen
    let name = this.props.route.params.name;
    this.props.navigation.setOptions({ title: name });

    this.referenceChatMessages = firebase
      .firestore()
      .collection("messages");

    this.authUnsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        firebase.auth().signInAnonymously();
      }
      this.setState({
        uid: user.uid,
         messages: [],
      });
      this.unsubscribe = this.referenceChatMessages
        .orderBy("createdAt", "desc")
        .onSnapshot(this.onCollectionUpdate);
    });
  }

  componentWillUnmount() {
    this.authUnsubcribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const messages = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      let data = doc.data();
      messages.push({
        _id: data._id,
        text: data.text,
        createdAt: data.createdAt.toDate(),
        user: data.user,
      });
    });
    this.setState({
      messages: messages
    });
  }

  getMessages = async () => {
    let messages = '';
    try {
      messages = (await AsyncStorage.getItem('messages')) || [];
      this.setState({
        messages: JSON.parse(messages),
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  addMessage() {
    const message = this.state.messages[0];
    this.referenceChatMessages.add({
      uid: this.state.uid,
      _id: message._id,
      text: message.text,
      createdAt: message.createdAt,
      user: this.state.user,
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }), () => {
      this.addMessage();
    })
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
    // // Takes the state of 'name' that was passed as a prop to <Chat /> and uses the prop sets it to the title of the screen
    // let name = this.props.route.params.name;
    // this.props.navigation.setOptions({ title: name });
    
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
            _id: this.state.user._id,
            name: this.state.name,
            avatar: this.state.user.avatar,
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