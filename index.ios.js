/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  ListView,
  Component,
  StyleSheet,
  Text,
  Image,
  TouchableHighlight,
  View,
  TabBarIOS,
  NavigatorIOS
} from 'react-native';

import './UserAgent';
import io from 'socket.io-client/socket.io';

import { CHANNELS_DATA } from './data/channels';

let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class smartHome extends Component {
  constructor(props) {
    super(props);
    this.socket = io('http://192.168.0.16:8090', {
      transports: ['websocket'],
      jsonp: false
    });
    this.socket.on('connect_error', (err) => {
      console.error('connection failed');
      console.error(err);
      console.error(`${err}`);
    })
    this.state = {
      dataSource: ds.cloneWithRows(CHANNELS_DATA)
    };
  }
  selectStation(stationId) {
    console.log(`selecting ${stationId}`);
    this.socket.emit('select', { stationId });
  }
  renderChannel(channel) {
    return <View style={styles.container}>
      <TouchableHighlight onPress={() => this.selectStation(channel.id)}>
        <Image
          source={{uri: channel.posters.thumbnail}}
          style={styles.thumbnail}
        />
      </TouchableHighlight>
      <View style={styles.rightContainer}>
        <Text style={styles.title}>{channel.title}</Text>
        <Text style={styles.fm}>{channel.fm}</Text>
      </View>
    </View>;
  }
  render() {
    return (
      <TabBarIOS>
        <TabBarIOS.Item title="React Native" selected={true}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(channel) => this.renderChannel(channel)}
            style={styles.listView}
          />
        </TabBarIOS.Item>
        <TabBarIOS.Item title="Filip" >
        </TabBarIOS.Item>
        <TabBarIOS.Item title="Kamila" >
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

var styles = StyleSheet.create({
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  thumbnail: {
    width: 153,
    height: 81,
  },
  fm: {
    textAlign: 'center',
  }
});

AppRegistry.registerComponent('smartHome', () => smartHome);
