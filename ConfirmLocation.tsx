import {View, Button, TouchableOpacity} from 'react-native';
import React from 'react';
import {Icon} from 'react-native-elements';
import styles from './confirmLocationStyles';
import StreetWebView from './StreetWebView';

interface LatLon {
  lat: number;
  lon: number;
}

interface StreetView {
  fov: number;
  heading: number;
  pitch: number;
}

interface State {
  location: LatLon;
  streetView: StreetView;
}

type Props = any;

const defaultStreetView = {
  fov: 100,
  heading: 0,
  pitch: 0,
};

class ConfirmLocation extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      location: {
        lat: 49.2827,
        lon: 123.1207,
      },
      streetView: defaultStreetView,
    };
  }

  renderBackButton = () => (
    <TouchableOpacity
      onPress={() => {
        console.log('back');
      }}>
      <Icon
        type="material"
        name="keyboard-backspace"
        iconStyle={styles.backArrow}
        size={24}
      />
    </TouchableOpacity>
  );

  savePov = () => {
    this.props.navigation.navigate('Preview', {isLocated: true});
  };

  render() {
    return (
      <View>
        {this.renderBackButton()}
        <Button title="Save" onPress={this.savePov} />
        <StreetWebView
          savePov={this.savePov}
          showWebView={true}
          streetView={this.state.streetView}
          streetViewMapContainer={styles.confirmLocationImage}
          latLon={this.state.location}
        />
      </View>
    );
  }
}

export default ConfirmLocation;
