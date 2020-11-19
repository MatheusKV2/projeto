// import React from 'react';
// import { Modal, TouchableOpacity, Text, View } from 'react-native';
// import Video from 'react-native-video';

// export default function VideoView({ visible, toggle, video }){
//   return <Modal visible={visible} onDismiss={toggle} onRequestClose={toggle}>   
//     <View style={{ backgroundColor: 'black', flex: 1 }}>
//       <Video source={{uri: video}}
//         // ref={(ref) => {
//         //   this.player = ref
//         // }}
//         onBuffer={console.log}
//         onError={console.log}
//         style={{
//           flex: 1,
//           alignItems: 'center',
//           justifyContent: 'center'
//       }}>
        
//       </Video>
//     </View>
//   </Modal>
// }

import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Modal,
  TouchableOpacity
} from "react-native";

import Video from "react-native-video";
import ProgressBar from "react-native-progress/Bar";

import Icon from "react-native-vector-icons/FontAwesome";

function secondsToTime(time) {
  return ~~(time / 60) + ":" + (time % 60 < 10 ? "0" : "") + time % 60;
}

export default class rnvideo extends Component {
  state = {
    paused: false,
    progress: 0,
    duration: 0,
  };

  handleMainButtonTouch = () => {
    if (this.state.progress >= 1) {
      this.player.seek(0);
    }

    this.setState(state => {
      return {
        paused: !state.paused,
      };
    });
  };

  handleProgressPress = e => {
    const position = e.nativeEvent.locationX;
    const progress = (position / 250) * this.state.duration;
    const isPlaying = !this.state.paused;
    
    this.player.seek(progress);
  };

  handleProgress = progress => {
    this.setState({
      progress: progress.currentTime / this.state.duration,
    });
  };

  handleEnd = () => {
    this.setState({ paused: true });
  };

  handleLoad = meta => {
    this.setState({
      duration: meta.duration,
    });
  };

  render() {
    const { width } = Dimensions.get("window");
    const height = width * 0.5625;

    return (
      <Modal visible={this.props.visible} onDismiss={this.props.toggle} onRequestClose={this.props.toggle}>
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
          <Video
            paused={this.state.paused}
            source={{ uri: this.props.video }}
            style={{ flex: 1 }}
            resizeMode="contain"
            onLoad={this.handleLoad}
            onProgress={this.handleProgress}
            onEnd={this.handleEnd}
            ref={ref => {
              this.player = ref;
            }}
          />
            <View style={styles.controls}>
              <TouchableWithoutFeedback onPress={this.handleMainButtonTouch}>
                <Icon name={!this.state.paused ? "pause" : "play"} size={10} color="#FFF" />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={this.handleProgressPress}>
                <View>
                  <ProgressBar
                    progress={this.state.progress}
                    color="#FFF"
                    unfilledColor="rgba(255,255,255,.5)"
                    borderColor="#FFF"
                    width={250}
                    height={10}
                  />
                </View>
              </TouchableWithoutFeedback>

              <Text style={styles.duration}>
                {secondsToTime(Math.floor(this.state.progress * this.state.duration))}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',    
  },
  controls: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: 25,
    left: 0,
    bottom: 40,
    right: 0,
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 10,
  },
  mainButton: {
    marginRight: 15,
  },
  duration: {
    color: "#FFF",
    marginLeft: 15,
  },
});