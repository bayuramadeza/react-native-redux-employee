// import library  for making a components
import React from 'react';
import { Text, View } from 'react-native';

//Make a Component
const Header = (props) => {
  const {textStyle, viewStyles} = styles;
  return (
    <View style = {viewStyles}>
      <Text style ={textStyle}> {props.headerText}</Text>
    </View>
  );
};

const styles = {
  viewStyles:{
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 15,
    shadowOffset:{  width: 0,  height: 2,  },
    shadowColor: '#000',
    shadowOpacity: 0.2,
    elevation:2
  },
  textStyle: {
    fontSize: 20

  }
}

//make the components available to other part of app
export { Header };
