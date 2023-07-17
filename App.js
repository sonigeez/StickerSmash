import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Image } from "react-native";
import ImageViewer from "./components/ImageViewer";
import Button from "./components/Button";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import CircleButton from './components/CircleButton';
import IconButton from './components/IconButton';

import EmojiPicker from "./components/EmojiPicker";
import EmojiList from './components/EmojiList';
import EmojiSticker from './components/EmojiSticker';
import { GestureHandlerRootView } from "react-native-gesture-handler";



export default function App() {
  const [pickedEmoji, setPickedEmoji] = useState(null);
  const [pickedEmojis, setPickedEmojis] = useState([]);


  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const onReset = () => {
    setShowAppOptions(false);
    setPickedEmojis([]);
    setSelectedImage(null);
  };
  
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };


  const onSaveImageAsync = async () => {
    // we will implement this later
  };


  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result);
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);

    } else {
      alert("You did not select any image.");
    }
  };
  return (
    <GestureHandlerRootView style={styles.container}>

    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          selectedImage={selectedImage}
          placeholderImageSource={{
            uri: "https://docs.expo.dev/static/images/tutorial/background-image.png",
          }}

        />
  {pickedEmojis.map((emoji, index) => (
        <EmojiSticker key={index} imageSize={40} stickerSource={emoji} />
      ))}
        
      </View>
      <View style={styles.footerContainer}>
   
      </View>
      {showAppOptions ? (
          <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button theme="primary" label="Choose a photo" onPress={pickImageAsync} />
          <Button label="Use this photo" onPress={() => setShowAppOptions(true)} />
        </View>
      )}
      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
      <EmojiList
          onSelect={(emoji) => setPickedEmojis([...pickedEmojis, emoji])}
          onCloseModal={onModalClose}
        />

      </EmojiPicker>
      <StatusBar style="auto" />
    </View>
    </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: 'absolute',
    bottom: 80,
  },
  optionsRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
