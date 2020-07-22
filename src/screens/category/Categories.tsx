import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';
import {CategoryList} from '../../common';
import {useSelector} from 'react-redux';
import {selectCategories} from '../../store';
import {Loading} from '../../components';
import {Actions} from 'react-native-router-flux';

export const CategoryItem: React.FC<CategoryList> = ({title, products}) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => Actions.products({products, title})}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const renderCategoryItem: React.FC<{item: CategoryList}> = ({item}) => {
  return <CategoryItem {...item} />;
};

export const Categories = () => {
  const categories = useSelector(selectCategories);

  if (!Array.isArray(categories)) {
    return <Loading />;
  }

  if (Array.isArray(categories) && !categories.length) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => `${item.id}`}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    padding: 20,
  },
  title: {
    fontSize: 32,
  },
  button: {
    flex: 1,
    width: 320,
    alignItems: 'center',
    backgroundColor: '#2196F3',
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white',
  },
});
