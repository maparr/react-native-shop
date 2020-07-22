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
import {Product} from '../../common';
import {Actions} from 'react-native-router-flux';
import {Loading} from '../../components';

export const ProductItem: React.FC<Product> = (product) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => Actions.product({product, title: product.title})}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{product.title}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const renderProduct: React.FC<{item: Product}> = ({item}) => {
  return <ProductItem {...item} />;
};

export const Products: React.FC<{products: Product[]; title: string}> = ({
  products,
}) => {
  if (!Array.isArray(products)) {
    return <Loading />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => `${item.id}`}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
