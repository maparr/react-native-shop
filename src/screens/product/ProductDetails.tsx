import React, {useCallback} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Product} from '../../common';
import {useDispatch, useSelector} from 'react-redux';
import {add, selectProductsInCart} from '../../store';
import {Actions} from 'react-native-router-flux';

export const ProductDetails: React.FC<{product: Product}> = ({product}) => {
  const dispatch = useDispatch();
  const productsInCart = useSelector(selectProductsInCart);
  const inCart = productsInCart.findIndex(({id}) => id === product.id) !== -1;

  const handleMakeOrder = useCallback(() => {
    if (inCart) {
      Actions.cart();
      return;
    }

    dispatch(add(product.id));
    Actions.cart();
  }, [dispatch, product.id, inCart]);

  const {
    container,
    productInformationStyles,
    textStyle,
    productContainerStyles,
    imageStyle,
    button,
    buttonText,
  } = styles;

  return (
    <SafeAreaView style={container}>
      <View style={productContainerStyles}>
        <View style={productInformationStyles}>
          <Image source={{uri: product.image}} style={imageStyle} />
          <View>
            <Text style={textStyle}>{product.title}</Text>
          </View>

          <View>
            <Text style={textStyle}>Price - $25.00</Text>
          </View>
        </View>

        <TouchableOpacity onPress={handleMakeOrder}>
          <View style={button}>
            <Text style={buttonText}>
              {inCart ? 'Already in cart, go to cart!' : 'Add + $25.00'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  productContainerStyles: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  productInformationStyles: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 18,
    color: 'black',
  },
  imageStyle: {
    width: 200,
    height: 200,
    marginVertical: 20,
  },
  button: {
    width: 320,
    alignItems: 'center',
    backgroundColor: '#f39c12',
    marginTop: 30,
  },
  buttonText: {
    textAlign: 'center',
    padding: 20,
    color: 'white',
  },
});
