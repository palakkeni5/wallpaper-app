import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  NativeModules,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import RNFS from 'react-native-fs';
import Snackbar from 'react-native-snackbar';
import ManageWallpaper, {TYPE} from 'react-native-manage-wallpaper';
import {PEXELS_API_KEY} from '@env';

import {createClient} from 'pexels';

const Dev_Height = Dimensions.get('screen').height;
const Dev_Width = Dimensions.get('screen').width;

const getExtention = filename => {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
};

export const FullImage = ({navigation, route}) => {
  const id = route.params.id;
  const [imageUri, setImageUri] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [downloadActivityIndicator, setDownloadActivityIndicator] =
    useState(false);
  const client = createClient(PEXELS_API_KEY);
  const setWallpaper = () => {
    ManageWallpaper.setWallpaper(
      {
        uri: imageUri,
      },
      res => {
        // console.log('Wallpaper is Set: ', res);
      },
      TYPE.HOME,
    );
  };

  const downloadImage = () => {
    var ext = getExtention(imageUri);
    ext = '.' + ext[0];
    setDownloadActivityIndicator(true);
    const filePath =
      RNFS.PicturesDirectoryPath + '/image_' + Date.parse(new Date()) + ext;

    RNFS.downloadFile({
      fromUrl: imageUri,
      toFile: filePath,
      background: true,
      discretionary: true,
      progress: res => {
        // const progress = (res.bytesWritten / res.contentLength) * 100;
        // console.log(`Progress: ${progress.toFixed(2)}%`);
      },
    })
      .promise.then(response => {
        setDownloadActivityIndicator(false);
      })
      .catch(err => {
        setDownloadActivityIndicator(false);
        Snackbar.show({
          text: 'Download Failed..',
          duration: Snackbar.LENGTH_SHORT,
          action: {
            text: 'CANCEL',
            textColor: 'green',
            onPress: () => {
              Snackbar.dismiss();
            },
          },
        });
      });
  };

  const findImage = () => {
    setIsLoading(true);
    client.photos.show({id: id}).then(photo => {
      setImageUri(photo['src']['original']);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    findImage();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        {!isLoading && imageUri !== '' ? (
          <ImageBackground
            source={{uri: imageUri}}
            style={{height: '100%', width: '100%'}}>
            <View style={styles.close_button_style}>
              <TouchableOpacity
                style={styles.Close_Button_Touchable}
                onPress={() => navigation.goBack()}>
                <Icon name="left" size={18} color="#FFF" />
              </TouchableOpacity>
            </View>

            <View
              style={{
                height: '70%',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                backgroundColor: 'transparent',
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => setWallpaper()}
                style={{
                  height: '8%',
                  width: '40%',
                  borderRadius: 15,
                  backgroundColor: 'rgba(225,225,225,0.9)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{color: '#121212', fontSize: 16}}>
                  Set As Wallpaper
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => downloadImage()}
                style={{
                  height: '8%',
                  width: '40%',
                  borderRadius: 15,
                  backgroundColor: 'rgba(225,225,225,0.9)',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {downloadActivityIndicator ? (
                  <>
                    <Text style={{color: '#121212', fontSize: 16}}>
                      Downloading...
                      <ActivityIndicator color="#2abb9b" size="small" />
                    </Text>
                  </>
                ) : (
                  <Text style={{color: '#121212', fontSize: 16}}>Download</Text>
                )}
              </TouchableOpacity>
            </View>
          </ImageBackground>
        ) : (
          <View style={{height: '100%', width: '100%'}}>
            <View style={styles.close_button_style}>
              <TouchableOpacity
                style={styles.Close_Button_Touchable}
                onPress={() => navigation.goBack()}>
                <Icon name="left" size={18} color="#2abb9b" />
              </TouchableOpacity>
            </View>
            <View
              style={{
                height: '50%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator color="#2abb9b" size="large" />
            </View>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dev_Height,
    width: Dev_Width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222222',
  },
  close_button_style: {
    height: '20%',
    width: '90%',
    justifyContent: 'center',
    // paddingTop: StatusBar.currentHeight,
  },
  Close_Button_Touchable: {
    height: 50,
    width: 50,
    backgroundColor: 'rgba(225,225,225,0.1)',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '5%',
  },
});
