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
  RefreshControl,
} from 'react-native';

const Dev_Height = Dimensions.get('screen').height;
const Dev_Width = Dimensions.get('screen').width;

import {createClient} from 'pexels';

import {PEXELS_API_KEY} from '@env';
const client = createClient(PEXELS_API_KEY);

export const ImageLists = ({navigation, route}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [carouselItems, setCarouselItems] = useState([]);
  const query = route.params.query;
  const [pageNo, setPageNo] = useState(1);

  FindImages = (query, page_no) => {
    setRefreshing(true);
    client.photos.search({query, per_page: 20, page: page_no}).then(photos => {
      setCarouselItems(photos['photos']);
      setRefreshing(false);
    });
  };

  useEffect(() => {
    FindImages(query, pageNo);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.FlatList_Container}>
        <FlatList
          columnWrapperStyle={{justifyContent: 'space-between'}}
          data={carouselItems}
          numColumns={2}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setPageNo(pageNo + 1);
                FindImages(query, pageNo);
              }}
              title="Refreshing"
              titleColor="#FFF"
              colors={['gray', 'orange']}
            />
          }
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={{
                  height: Dev_Height - 0.7 * Dev_Height,
                  width: '48%',
                  borderRadius: 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() =>
                  navigation.navigate('FullImage', {
                    id: item['id'],
                  })
                }>
                <Image
                  source={{uri: item['src']['medium']}}
                  style={{height: '95%', width: '95%', borderRadius: 15}}
                />
              </TouchableOpacity>
            );
          }}
          ItemSeparatorComponent={() => {
            return <View style={{height: 10}} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dev_Height,
    width: Dev_Width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222222',
    paddingTop: StatusBar.currentHeight,
  },
  FlatList_Container: {
    height: '100%',
    width: '95%',
  },
});
