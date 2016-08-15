module.exports = (React, ReactNative, { model, styles }) => {
  const { TouchableHighlight, View } = ReactNative;

  const MenuTrigger = React.createClass({
    displayName: 'MenuTrigger',
    propTypes: {
      disabled: React.PropTypes.bool,
      renderTouchable: React.PropTypes.func
    },
    getDefaultProps() {
      return {disabled: false}
    },
    contextTypes: {
      menuController: model.IMenuController,
      getClosestMenuName: React.PropTypes.func.isRequired
    },
    onPress() {
      if (!this.props.disabled) {
        const { menuController, getClosestMenuName } = this.context;
        menuController.toggle(getClosestMenuName());
      }
    },
    render() {
      if(this.props.renderTouchable) {
        return React.cloneElement(this.props.renderTouchable(), {onPress: this.onPress}, (
          <View style={this.props.style}>
            { this.props.children }
          </View>
        ));
      }
      return (
        <TouchableHighlight
          {...this.props}
          onPress={() => {
            requestAnimationFrame(this.onPress);
            if (this.props.onPress)
              this.props.onPress();
          }}
        >
          <View style={[styles.triggerContainer, this.props.containerStyle]}>
            { this.props.children }
          </View>
        </TouchableHighlight>
      );
    }
  });

  return MenuTrigger;
};
