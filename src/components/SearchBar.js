import React, {useState, useRef} from 'react';
import {
  TouchableOpacity,
  View,
  TextInput,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import _ from 'lodash';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const screenWidth = Math.round(Dimensions.get('window').width);

const SearchBar = (props) => {
  const [inputValue, setInputValue] = useState('');
  const delayedQuery = useRef(
    _.debounce((q) => props.getSearchResultonSearchInput(q), 400),
  ).current;

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Try searching Fat, sauces, names..."
        value={inputValue}
        style={styles.formField}
        onChangeText={(value) => {
          setInputValue(value);
          props.getSearchResult(value);
          delayedQuery(value);
        }}
      />
      <EvilIcons name="search" style={styles.searchIcon} size={20} />
      {inputValue.length ? (
        <TouchableOpacity
          style={styles.clearContainer}
          onPress={() => {
            setInputValue('');
            props.getSearchResult('');
            delayedQuery('');
          }}>
          <Entypo name="cross" style={styles.heartIcon} size={25} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    // top: 30,
    width: screenWidth - 40,
    marginBottom: 10,
    // left: 20,
    zIndex: 99,
  },
  formField: {
    borderWidth: 1,
    padding: 12,
    paddingLeft: 30,
    paddingRight: 20,
    borderRadius: 10,
    borderColor: '#888888',
    fontSize: 15,
    height: 45,
  },
  heartIcon: {
    color: '#888888',
  },
  searchIcon: {
    left: 5,
    top: 15,
    position: 'absolute',
  },
  clearContainer: {
    right: 8,
    top: 10,
    position: 'absolute',
  },
});

export default SearchBar;
