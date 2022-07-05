import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView from 'react-native-maps';
import * as firebase from "firebase";
import "firebase/firestore";

export default class CustomActions extends React.Component {

  pickImage = async () => {
    //Ask for permission to access media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    try {
      //If permission is granted, pull up the users library
      if (status === 'granted') {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images, //only allow images
        }).catch((error) => console.log(error));
        //If user selects an image, send it
        if (!result.cancelled) {
          const imageUrl = await this.uploadImage(result.uri);
          this.props.onSend({ image: imageUrl });
        }
      } 
    } catch (error) {
      console.error(error)
    }
  }

  takePhoto = async () => {
    //Ask for permission to camera
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    try {
      // If permission is granted, launch camera
      if (status === 'granted') {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
        }).catch((error) => console.log(error));
        //If user selects an image, send it
        if (!result.cancelled) {
          const imageUrl = await this.uploadImage(result.uri);
          this.props.onSend({ image: imageUrl });
        }
      }
    } catch (error) {
      console.error(error);
    }
  }

  // getLocation = async () => {
  //   //Ask for permission to access current location
  //   const { status } = await Location.requestForegroundPermissionsAsync();
  //   try {
  //     //If permission is granted, get their location
  //     if (status === 'granted') {
  //       const result = await Location.getCurrentPositionAsync({})
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //       //If location is found/selected, send it
  //       if (result) {
  //         this.props.onSend({
  //           location: {
  //             longitude: result.coords.longitude,
  //             latitude: result.coords.latitude,
  //           },
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // }

  onActionPress = () => {
    const options = [
      "Choose From Library",
      "Take Picture",
      // "Send Location",
      "Cancel",
    ];
    const cancelButtonIndex = options.length - 1;
    this.context.actionSheet().showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            console.log("user wants to pick an image");
            return this.pickImage();
          case 1:
            console.log("user wants to take a photo");
            return this.takePhoto();
          // case 2:
          //   console.log("user wants to get their location");
          //   return this.getLocation();
        }
      }
    );
  };

  render() {
    return (
      <TouchableOpacity
        style={[styles.container]}
        onPress={this.onActionPress}
        accessible={true}
        accessibilityLabel="More media options"
        accessibilityHint="Choose an image from your camera roll, take a picture to send, or your share your location."
      >
        <View style={[styles.wrapper, this.props.wrapperStyle]}>
            <Text style={[styles.iconText, this.props.iconTextStyle]}>+</Text>
        </View>
      </TouchableOpacity>
    )
  }
}

CustomActions.contextTypes = {
  actionSheet: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
      width: 26,
      height: 26,
      marginLeft: 10,
      marginBottom: 10,
  },
  wrapper: {
      borderRadius: 13,
      borderColor: "#b2b2b2",
      borderWidth: 2,
      flex: 1,
  },
  iconText: {
      color: "#b2b2b2",
      fontWeight: "bold",
      fontSize: 16,
      backgroundColor: "transparent",
      textAlign: "center",
  },
});