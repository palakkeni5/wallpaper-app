import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  ImageBackground,
  Image,
  FlatList,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Animated,
} from 'react-native';

import {createClient} from 'pexels';
import Icon from 'react-native-vector-icons/AntDesign';
import Carousel from 'react-native-reanimated-carousel';
import {PEXELS_API_KEY} from '@env';
import {categories} from '../assets/categories-data';
const backgroundImage = require('../assets/homeScreenImage-1.png');
const client = createClient(PEXELS_API_KEY);

const Dev_Height = Dimensions.get('screen').height;
const Dev_Width = Dimensions.get('screen').width;
const Item_Width = Dev_Width - 0.6 * Dev_Width;

const renderSeparator = () => (
  <View
    style={{
      width: 10,
    }}
  />
);

export const HomeScreen = ({navigation}) => {
  const [topPicks, setTopPicks] = useState([]);
  const isCarousel = React.useRef(null);
  const [searchValue, setSearchValue] = useState('');

  const findImagesForTopPicks = () => {
    const query = 'Wallpapers for android';
    client.photos.search({query, per_page: 10}).then(data => {
      const photosData = data['photos'];
      setTopPicks(photosData);
    });
  };

  useEffect(() => {
    findImagesForTopPicks();
  }, []);

  const _renderTopPicks = ({item, index}) => (
    <TouchableOpacity
      style={{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      onPress={() => navigation.navigate('FullImage', {id: item['id']})}>
      <Image
        source={{uri: item['src']['large']}}
        style={{height: '100%', width: '100%'}}
      />
    </TouchableOpacity>
  );

  const _renderItemCatogories = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{
          height: '90%',
          width: Dev_Width - 0.6 * Dev_Width,
          backgroundColor: 'transparent',
          borderRadius: 15,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('ImageLists', {query: item.title})}>
        <ImageBackground
          source={{uri: item.img_url}}
          style={{
            height: '100%',
            width: '100%',
            borderRadius: 15,
            justifyContent: 'flex-end',
          }}
          imageStyle={{borderRadius: 15}}>
          <Text
            style={{
              marginBottom: '10%',
              marginLeft: '10%',
              color: '#FFF',
              fontWeight: 'bold',
              fontSize: 18,
            }}>
            {item.title}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <View style={styles.container}>
        <StatusBar translucent backgroundColor="transparent" />
        <View style={{height: '100%', width: '100%'}}>
          <ImageBackground
            source={backgroundImage}
            style={styles.MainBackground_View}
            imageStyle={{
              height: '100%',
              width: '100%',
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}>
            <Animated.View
              style={{
                height: '45%',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '5%',
              }}>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FFF'}}>
                {' '}
                Discover High{' '}
              </Text>
              <Text style={{fontSize: 18, fontWeight: 'bold', color: '#FFF'}}>
                {' '}
                Quality Wallpaper's{' '}
              </Text>
            </Animated.View>

            <Animated.View style={styles.SearchBox_Main_Style}>
              <TextInput
                style={{
                  height: '80%',
                  width: '75%',
                  marginLeft: '5%',
                  color: '#FFF',
                }}
                placeholder="Search For Free Wallpaper"
                placeholderTextColor="gray"
                value={searchValue}
                onChangeText={value => setSearchValue(value)}
                onSubmitEditing={() =>
                  navigation.navigate('ImageLists', {query: searchValue})
                }
              />
              <TouchableOpacity
                style={{
                  height: '80%',
                  width: '15%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() =>
                  navigation.navigate('ImageLists', {query: searchValue})
                }>
                <Icon name="search1" color="#FFF" size={15} />
              </TouchableOpacity>
            </Animated.View>
          </ImageBackground>

          <View
            style={{height: '10%', justifyContent: 'center', width: '100%'}}>
            <Text
              style={{
                fontSize: 18,
                color: '#FFF',
                fontWeight: 'bold',
                marginLeft: '5%',
              }}>
              Top Pick's For You !
            </Text>
          </View>

          <View
            style={{
              height: '20%',
              alignItems: 'center',
              width: '100%',
              justifyContent: 'center',
            }}>
            <Carousel
              loop={true}
              autoPlay={true}
              width={Dev_Width}
              data={topPicks}
              renderItem={_renderTopPicks}
              scrollAnimationDuration={2000}
            />
          </View>

          <View
            style={{height: '10%', justifyContent: 'center', width: '100%'}}>
            <Text
              style={{
                fontSize: 18,
                color: '#FFF',
                fontWeight: 'bold',
                marginLeft: '5%',
              }}>
              Categories
            </Text>
          </View>

          <View
            style={{
              height: '25%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <FlatList
              style={{
                height: '100%',
                width: '93%',
              }}
              data={categories}
              renderItem={_renderItemCatogories}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={renderSeparator}
              alwaysBounceHorizontal={true}
              bounces={true}
            />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dev_Height,
    width: Dev_Width,
    backgroundColor: '#222222',
  },
  MainBackground_View: {
    height: '30%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  SearchBox_Main_Style: {
    marginTop: '5%',
    height: '20%',
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222222',
    borderRadius: 10,
    flexDirection: 'row',
  },
});
