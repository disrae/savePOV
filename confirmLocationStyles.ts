import {Dimensions, StyleSheet} from 'react-native';

const {height} = Dimensions.get('screen');
const styles = StyleSheet.create({
  confirmLocationImage: {
    marginTop: height * 0.1,
    width: '100%',
    height: height * 0.82,
    flex: 0,
    position: 'absolute',
    zIndex: 1,
  },
  backArrow: {
    color: 'black',
    position: 'absolute',
    left: 5,
    top: 11,
    right: 10,
  },
});

export default styles;
