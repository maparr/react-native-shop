/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Router,
  Scene,
  Lightbox,
  Stack,
  Actions,
} from 'react-native-router-flux';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { useDispatch, Provider } from 'react-redux'
import { getProducts } from './src/services';
import { Product } from './src/common';
import { fetchProducts } from './src/store';
import { store, persistor } from './src/store';
import { Loading } from './src/components';
import { Checkout, CartDetails, Categories, Products, ProductDetails } from './src/screens';

declare const global: {HermesInternal: null | {}};

const Cart = () => {
  return (
    <Text>Cart</Text>
  )
}


const styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#ff8c00',
    height: 70
    },
    navBarTitle: {
      color: '#FFFFFF',
      fontSize: 20
    },
    barButtonTextStyle: {
      color: 'red'
    },
    barButtonIconStyle: {
      tintColor: 'white'
    },
    routerScene: {
      paddingTop: 80,
    },
    rightButton: {
      marginRight: 10,
      paddingLeft: 5,
      paddingRight: 7,
      paddingVertical: 10,
      backgroundColor: 'white',
      borderRadius: 5,
    },
    rightButtonText: {
      color: '#00b8ff'
    }
});

const CommonHeaderStyles = {
  navigationBarStyle: styles.navBar,
  titleStyle: styles.navBarTitle,
  barButtonTextStyle:styles.barButtonTextStyle,
  barButtonIconStyle:styles.barButtonIconStyle,
  sceneStyle:styles.routerScene,
  rightButtonStyle:styles.rightButton,
  rightButtonTextStyle:styles.rightButtonText,
  tintColor:'white',
  headerBackTitle:'Tilbage'
}

const Routes = () => {
  const dispatch = useDispatch()
 
  useEffect(() => {
    dispatch(fetchProducts())
  }, []);

  return (
    <Router>
      <Stack 
        key="root"
        navigationBarStyle={styles.navBar}
      >
        <Scene 
          key="categories"
          component={Categories} 
          title="Categories"
          rightTitle={"Cart"}
          onRight={() => Actions.cart() }
          {...CommonHeaderStyles}
        />
        <Scene 
          key="cart" component={CartDetails}
          title="Cart"
          {...CommonHeaderStyles}
         />
         <Scene 
          key="checkout" component={Checkout}
          title="Checkout"
          onLeft={() => Actions.categories() }
          {...CommonHeaderStyles}
         />
         <Scene 
          key="products" component={Products}
          title="Products"
          rightTitle={"Cart"}
          onRight={() => Actions.cart() }
          {...CommonHeaderStyles}
         />
         <Scene 
          key="product" component={ProductDetails}
          title="Product"
          rightTitle={"Cart"}
          onRight={() => Actions.cart() }
          {...CommonHeaderStyles}
         />
      </Stack>
    </Router>
  );
};


export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  )
};
