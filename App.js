/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  TouchableOpacity,
  Modal,
  Image,
  Alert,
  SectionList,
  ScrollView,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import SearchBar from './src/components/SearchBar';
import Accordion from './src/components/Card';

import {COLOR_CODES} from './src/utility/Theme';
import Categories from './src/models/Categories';

const HELP_ICON = require('./src/assets/help.png');

const App = (props) => {
  const [isModalOpen, updateModalState] = useState(false);
  const [categoriesToShowData, updateCategoriesToShow] = useState([]);
  const [categoriesList, updateCategoriesList] = useState([]);
  const [searchInputValue, updateSearchInputValue] = useState('');
  // const [itemState, updateItemState] = useState({});

  useEffect(() => {
    (async function getData() {
      try {
        const url = 'https://api.jsonbin.io/b/5f2c36626f8e4e3faf2cb42e';
        const result = await fetch(url);
        const stringJson = await result.text();
        const json = JSON.parse(stringJson);
        const modelledData = json.categories.map(
          (item, index) => new Categories(item.category, index),
        );
        console.log(modelledData);
        updateCategoriesList(modelledData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const renderApprovedFoodListButton = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => updateModalState(!isModalOpen)}
        style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Approved Foods List</Text>
      </TouchableOpacity>
    );
  };

  const updateSectionItemState = (index) => {
    if (searchInputValue.trim().length) {
      const data = [...categoriesToShowData];
      data[index].isCollapsed = !data[index].isCollapsed;
      updateCategoriesToShow(data);
    } else {
      const data = [...categoriesList];
      data[index].isCollapsed = !data[index].isCollapsed;
      updateCategoriesList(data);
    }
  };

  const searchCategories = (searchInput) => {
    const categoriesToShow = [];
    // make copy of original state
    let newCategories = JSON.parse(JSON.stringify(categoriesList));
    console.log('new categories are', newCategories);
    for (let i = 0; i < newCategories.length; i++) {
      newCategories[i].isCollapsed = true;
      newCategories[i].data = [];
      const subCategories = categoriesList[i].data;
      for (let j = 0; j < subCategories.length; j++) {
        const subCatagory = subCategories[j];
        const items = subCatagory.items;
        const mappedItems = [];
        console.log('Subcategory is', subCatagory);
        for (let k = 0; k < items.length; k++) {
          const item = items[k];
          if (item.toLowerCase().indexOf(searchInput.toLowerCase()) > -1) {
            mappedItems.push(item);
          }
        }
        if (mappedItems && mappedItems.length > 0) {
          newCategories[i].data.push({
            items: mappedItems,
            subCategoryname: subCatagory.subCategoryname,
          });
        }
      }
      if (newCategories[i].data && newCategories[i].data.length > 0) {
        categoriesToShow.push(newCategories[i]);
      }
    }
    updateCategoriesToShow(categoriesToShow);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOR_CODES.PRIMARY} />
      {renderApprovedFoodListButton()}
      <Modal
        animationType="slide"
        visible={isModalOpen}
        transparent
        onRequestClose={() => updateModalState(!isModalOpen)}>
        <View style={styles.mainContainerInfo}>
          <View style={styles.containerInfo}>
            <TouchableOpacity onPress={() => updateModalState(!isModalOpen)}>
              <Icon name="cross" size={45} color="#888888" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Message',
                  'Feature under development',
                  [
                    {
                      text: 'Cancel',
                      onPress: () => console.log('Cancel Pressed'),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                  ],
                  {cancelable: true},
                )
              }>
              <Image source={HELP_ICON} />
            </TouchableOpacity>
          </View>
          <Text style={styles.screenTitle}>Approved Food List</Text>
          <SearchBar
            getSearchResultonSearchInput={searchCategories}
            getSearchResult={(val) => {
              updateSearchInputValue(val);
            }}
          />
          <ScrollView
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <FlatList
              data={
                searchInputValue.length ? categoriesToShowData : categoriesList
              }
              extraData={categoriesList}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => item + index}
              renderItem={({item, index}) => (
                <Accordion
                  onClickFunction={() => updateSectionItemState(index)}
                  item={item}
                  inputValue={searchInputValue}
                />
              )}
            />
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: COLOR_CODES.DARK_PRIMARY,
  },
  buttonText: {
    color: COLOR_CODES.WHITE,
    fontSize: 16,
  },
  mainContainerInfo: {
    flex: 1,
    backgroundColor: COLOR_CODES.PRIMARY,
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  containerInfo: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  screenTitle: {
    marginTop: 10,
    marginBottom: 18,
    color: COLOR_CODES.TEXT_COLOR,
    fontSize: 28,
    paddingLeft: 5,
  },
  subCategory: {
    fontSize: 14,
    color: COLOR_CODES.DARK_PRIMARY,
  },
  subCategoryItems: {
    fontSize: 12,
    color: COLOR_CODES.PRIMARY,
  },
});

export default App;
