import React, {useCallback} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';
import {Product} from '../../common';
import {useSelector, useDispatch} from 'react-redux';
import {selectProductsInCart, remove, clean} from '../../store';
import {Loading} from '../../components';
import {Actions} from 'react-native-router-flux';

export const OrderItem: React.FC<Product> = ({id, title, image}) => {
  const dispatch = useDispatch();
  const handleRemoveItem = useCallback(
    (productId) => {
      dispatch(remove(productId));
    },
    [dispatch],
  );

  const {
    containerStyle,
    imageStyle,
    textStyle,
    priceStyle,
    removeConatinerStyle,
    textDescriptionStyle,
  } = styles;

  return (
    <View style={containerStyle}>
      <Image source={{uri: image}} style={imageStyle} />

      <View style={textStyle}>
        <Text style={textDescriptionStyle}>{title}</Text>
        <View style={priceStyle}>
          <Text style={textDescriptionStyle}>$25.00</Text>
        </View>
      </View>
      <View style={removeConatinerStyle}>
        <Button
          color="black"
          onPress={() => handleRemoveItem(id)}
          title="Clear"
        />
      </View>
    </View>
  );
};

const renderOrderItem: React.FC<{item: Product}> = ({item}) => {
  return <OrderItem {...item} />;
};

export const CartDetails = () => {
  const products = useSelector(selectProductsInCart);
  const dispatch = useDispatch();

  const handleMakeOrder = useCallback(() => {
    dispatch(clean());
    Actions.checkout();
  }, [dispatch]);

  const handleClearCart = useCallback(() => {
    dispatch(clean());
  }, [dispatch]);

  const {
    totalContainerStyle,
    bottomStyles,
    goodsStyle,
    totalStyle,
    cartContainerStyle,
    buttonContainerStyle,
    buttonLeft,
    buttonRight,
    buttonTextLeft,
    buttonTextRight,
    centerTextConatiner,
  } = styles;

  if (!Array.isArray(products)) {
    return (
      <SafeAreaView style={centerTextConatiner}>
        <Loading />
      </SafeAreaView>
    );
  }

  if (!products.length) {
    return (
      <SafeAreaView style={centerTextConatiner}>
        <Text style={styles.title}>Cart is empty</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={cartContainerStyle}>
      <FlatList
        data={products}
        renderItem={renderOrderItem}
        keyExtractor={(item) => `${item.id}`}
      />

      <View style={bottomStyles}>
        <View style={totalContainerStyle}>
          <View style={goodsStyle}>
            <Text>{products.length} items</Text>
          </View>

          <View style={totalStyle}>
            <Text>Total - </Text>
            <Text>${products.length * 25}.00</Text>
          </View>
        </View>
        <View style={buttonContainerStyle}>
          <TouchableOpacity onPress={handleClearCart}>
            <View style={buttonLeft}>
              <Text style={buttonTextLeft}>Clear</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleMakeOrder}>
            <View style={buttonRight}>
              <Text style={buttonTextRight}>Make order</Text>
            </View>
          </TouchableOpacity>
          {/*
          <View style={closeButtonStyle}>
            <Button color="white" onPress={handleClearCart} title="Clear" />
          </View>

          <View style={checkoutButtonStyle}>
            <Button
              color="white"
              onPress={handleMakeOrder}
              title="Make order"
            />
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  cartContainerStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerStyle: {
    flexDirection: 'row',
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2',
    padding: 10,
    paddingLeft: 15,
    backgroundColor: '#fff',
  },
  imageStyle: {
    width: 50,
    height: 50,
    marginRight: 20,
  },
  textStyle: {
    flex: 2,
    justifyContent: 'center',
  },
  priceStyle: {
    backgroundColor: '#ddd',
    width: 60,
    alignItems: 'center',
    marginTop: 3,
    borderRadius: 3,
  },
  counterStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  totalContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  goodsStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  bottomStyles: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
    borderTopWidth: 1,
    borderColor: '#e2e2e2',
  },
  buttonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
  },
  closeButtonStyle: {
    backgroundColor: '#7f8c8d',
    padding: 10,
    paddingRight: 30,
    paddingLeft: 30,
    borderRadius: 3,
  },
  checkoutButtonStyle: {
    backgroundColor: '#f39c12',
    padding: 10,
    paddingRight: 60,
    paddingLeft: 60,
    borderRadius: 3,
  },
  removeTextStyle: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 12,
  },
  removeConatinerStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  centerTextConatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textDescriptionStyle: {
    color: '#2e2f30',
    fontSize: 12,
  },
  buttonLeft: {
    alignItems: 'center',
    backgroundColor: '#7f8c8d',
    marginTop: 30,
  },
  buttonTextLeft: {
    textAlign: 'center',
    padding: 20,
    color: 'white',
  },
  buttonRight: {
    alignItems: 'center',
    backgroundColor: '#f39c12',
    marginTop: 30,
    width: 150,
  },
  buttonTextRight: {
    textAlign: 'center',
    padding: 20,
    color: 'white',
  },
});
