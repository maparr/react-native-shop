import React, {useCallback, useState} from 'react';
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
import {add, selectProductsInCart, increase, decrease} from '../../store';
import {Actions} from 'react-native-router-flux';

export const ProductDetails: React.FC<{product: Product}> = ({product}) => {
  const dispatch = useDispatch();
  const productsInCart = useSelector(selectProductsInCart);
  const selectedProduct = productsInCart.find(selected => selected.product.id ===  product.id);
  const [amount, setAmount] = useState(selectedProduct ? selectedProduct.amount : 0);

  const handleMakeOrder = useCallback(() => {
    selectedProduct ? dispatch(increase(product)) : dispatch(add({product, amount: amount}));
    Actions.cart();
  }, [dispatch, product, amount, selectedProduct]);

  const {
    container,
    productInformationStyles,
    textStyle,
    productContainerStyles,
    imageStyle,
    button,
    buttonText,
    amountContainer,
    amountBtn,
    amountText,
    amountTextBtn,
    amountTextContainer,
    amountOfExistsItemsContainer,
    amountOfExistsItemsText
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

        {!selectedProduct && (
            <View style={amountContainer}>
              <TouchableOpacity onPress={() => setAmount(amount - 1)}>
                <View style={amountBtn}>
                  <Text style={amountTextBtn}>
                    -
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={amountTextContainer}>
                <Text style={amountText}>{amount}</Text>
              </View>
              <TouchableOpacity onPress={() => setAmount(amount + 1)}>
                <View style={amountBtn}>
                  <Text style={amountTextBtn}>
                    +
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
        )}
        {selectedProduct && (
            <View style={amountOfExistsItemsContainer}>
              <Text style={amountOfExistsItemsText}>{`You have ${selectedProduct.amount} items already`}</Text>
            </View>
        )}

        <TouchableOpacity onPress={handleMakeOrder}>
          <View style={button}>
            <Text style={buttonText}>
              {selectedProduct ? "Add one more" : `Add to cart + $${amount * 25}.00`}
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
    fontWeight: 'bold',
    fontSize: 18
  },
  amountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  amountBtn: {
    width: 50,
    height: 50,
    backgroundColor: '#c6c823',
    justifyContent: 'center',
    alignItems: 'center'
  },
  amountTextBtn: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24
  },
  amountTextContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  amountOfExistsItemsContainer: {
    width: 320,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  amountOfExistsItemsText: {
    fontSize: 18,
    fontWeight: '500'
  }
});
