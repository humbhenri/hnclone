import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, FlatList, Image, ActivityIndicator, TouchableHighlight, Linking } from 'react-native';
import { getTopStories, getStoryDetails } from './HNService';

function openUrl(url) {
  console.log(`Openning ${url}`);
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      Linking.openURL(url);
    } else {
      console.log("Don't know how to open URI: " + url);
    }
  });
}

const HNThing = function (props) {
  const { id, rank } = props.item;
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    getStoryDetails(id)
      .then(({ data }) => setData(data))
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View>
      {isLoading ? <ActivityIndicator /> : (
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => openUrl(data.url)}>
          <View  style={styles.hnThing}>
            <Text style={styles.hnThingRank}>
              {rank}
            </Text>
            <Text style={styles.hnThingTitle}>
              {data.title}
            </Text>
          </View>
        </TouchableHighlight>
      )}
    </View>
  )
}

const Logo = function () {
  return (
    <View style={styles.logo}>
      <Image source={require('./assets/y18.gif')} />
      <Text style={styles.brand}>
        Hacker News
      </Text>
    </View>
  )
}

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    getTopStories()
      .then(({ data }) => {
        setData(data.map((id, i) => ({ rank: i, id: id + '' })));
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <Logo></Logo>
      {isLoading ? <ActivityIndicator /> : (
        <FlatList
          data={data}
          renderItem={({ item }) => <HNThing item={item}></HNThing>}
        />)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 40,
    backgroundColor: '#f6f6ef',
    padding: 10,
  },

  hnThing: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },

  hnThingTitle: {
    fontWeight: 'bold',
    fontSize: 14,
  },

  hnThingRank: {
    opacity: 0.5,
    marginRight: 5,
  },

  logo: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ff6600',
    padding: 5,
  },

  brand: {
    fontWeight: 'bold',
    marginLeft: 5,
  }
});

