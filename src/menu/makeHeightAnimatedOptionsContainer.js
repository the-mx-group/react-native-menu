module.exports = (React, ReactNative) => {
  const { Animated } = ReactNative;
  const TimerMixin = require('react-timer-mixin');

  // A component that scales in when mounted.
  const HeightAnimatedOptionsContainer = React.createClass({
    mixins: [TimerMixin],
    getInitialState() {
      return {
        animatedHeight: new Animated.Value(0),
      };
    },
    render() {
      return (
        <Animated.View
          style={[
            this.props.style,
            { height: this.state.animatedHeight },
          ]}
          onLayout={event => {
            const { height } = event.nativeEvent.layout.height;
            Animated.timing(this.state.animatedHeight, {
              duration: 60,
              toValue: height,
            }).start();
          }}
        >
          { this.props.children }
        </Animated.View>
      );
    }
  });

  return HeightAnimatedOptionsContainer;
};
