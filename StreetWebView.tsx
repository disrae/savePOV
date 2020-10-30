import {WebView, WebViewNavigation} from 'react-native-webview';
import React from 'react';
import {Platform, View, Text} from 'react-native';
import {Button} from 'react-native-elements';
import commonStyles from './commonStyles';
import constants from './constants';

type P = object;
type LatLon = {
  lat: number;
  lon: number;
};
type StreetViewInfo = {
  heading: number;
  fov?: number;
  pitch?: number;
};
type Props = {
  latLon: LatLon | undefined;
  streetView?: StreetViewInfo | undefined;
  streetViewMapContainer?: any;
  showWebView: boolean;
  savePov?: () => void;
};

type State = {
  heading: number;
  fov: number;
  pitch: number;
};

const defaultProps = {
  streetView: {
    heading: 0,
    fov: 90,
    pitch: 0,
  },
  streetViewMapContainer: commonStyles.streetViewMapContainer,
};

class StreetWebView extends React.Component<P & Props, State> {
  private webview: any;

  key = '';

  constructor(props: Props) {
    super(props);
    this.webview = React.createRef();
    this.state = {
      heading: 0,
      pitch: 0,
      fov: 0,
    };
  }

  onNavigationStateChange = (WebViewNativeEvent: WebViewNavigation) => {
    console.log(WebViewNativeEvent);
  };

  savePOV = () => {
    console.log('savePOV');
  };

  render() {
    return this.props.showWebView ? (
      <View>
        <Button title="save" onPress={this.savePOV} />
        <View>
          <Text>Heading: {this.state.heading}</Text>
          <Text>Pitch: {this.state.pitch}</Text>
          <Text>FOV: {this.state.fov}</Text>
        </View>
        <WebView
          ref={this.webview}
          onNavigationStateChange={(WebViewNativeEvent: WebViewNavigation) =>
            this.onNavigationStateChange(WebViewNativeEvent)
          }
          key="streetview_map_generic"
          originWhitelist={['*']}
          source={{
            html:
              '<iFrame frameborder="0" style="border:0" src = https://www.google.com/maps/embed/v1/streetview?key=' +
              `${this.key}` +
              `&location=${49.278496},${-123.137733}` +
              `&heading=${this.props.streetView?.heading}` +
              `&pitch=${this.props.streetView?.pitch}` +
              ' height="90%" width="100%" allowFullScreen />',
          }}
          containerStyle={this.props.streetViewMapContainer}
          onError={(syntheticEvent) => {
            const {nativeEvent} = syntheticEvent;
            console.warn('WebView error: ', nativeEvent); // produces a yellow warning screen on simulator
          }}
        />
      </View>
    ) : (
      <></>
    );
  }
}

export default StreetWebView;
