module.exports = (React, ReactNative, { styles }) => {
  const { TouchableWithoutFeedback, View } = ReactNative;

  const MenuOptions = React.createClass({
    displayName: 'MenuOptions',
    onSelect(value) {
      this.props.onSelect(value);
    },
    render() {
      return (
        <View style={[styles.options, this.props.style]}>
          { React.Children.map(this.props.children, (x) => (
            React.cloneElement(x, {onPress: this.onSelect})
          )) }
        </View>
      );
    }
  });

  return MenuOptions;
};
