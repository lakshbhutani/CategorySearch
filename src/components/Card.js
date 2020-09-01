import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList} from 'react-native';
import {COLOR_CODES} from '../utility/Theme';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Highlighter from 'react-native-highlight-words';

export default class Accordion extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {title, isCollapsed, data, itemColor, servingSize} = this.props.item;
    return (
      <View style={styles.accordionHolder}>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={this.props.onClickFunction}
          style={styles.button}>
          <View>
            <Text style={[styles.accordionButtonText, {color: itemColor}]}>
              {title}{' '}
              <Text style={{color: COLOR_CODES.BLACK, fontSize: 18}}>{` ${
                servingSize ? '(' + servingSize + ')' : ''
              }`}</Text>
            </Text>
          </View>
          <View>
            <SimpleLineIcons
              name={isCollapsed ? 'arrow-up' : 'arrow-down'}
              size={15}
              color={COLOR_CODES.DARK_PRIMARY}
            />
          </View>
        </TouchableOpacity>
        {isCollapsed
          ? data.map((val, index) => (
              <View>
                {val.subCategoryname ? (
                  <Text
                    key={val + index + Math.floor(Math.random() * 10)}
                    style={[styles.accordionText, {color: itemColor}]}>
                    {val.subCategoryname}
                  </Text>
                ) : null}
                {val.items.map((item, inde) => (
                  <Highlighter
                    highlightStyle={{backgroundColor: 'yellow'}}
                    searchWords={[this.props.inputValue]}
                    // textToHighlight='The dog is chasing the cat. Or perhaps they're just playing?'
                    textToHighlight={item}
                  />
                  // <Text key={item + inde} style={styles.categoryItem}>
                  //   {item}
                  // </Text>
                ))}
              </View>
            ))
          : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  accordionText: {
    fontSize: 15,
    paddingVertical: 10,
  },
  categoryItem: {
    fontSize: 13,
    paddingVertical: 8,
    borderBottomWidth: 0.2,
    color: COLOR_CODES.WHITE.BLACK,
    opacity: 0.8,
    borderBottomColor: COLOR_CODES.WHITE.PRIMARY,
  },
  accordionButtonText: {
    fontSize: 21,
  },
  accordionHolder: {
    borderColor: COLOR_CODES.WHITE.PRIMARY,
    borderRadius: 8,
    marginVertical: 5,
    padding: 12,
    backgroundColor: COLOR_CODES.WHITE,
  },
  button: {
    // backgroundColor: COLOR_CODES.WHITE,
    borderColor: COLOR_CODES.WHITE.PRIMARY,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
