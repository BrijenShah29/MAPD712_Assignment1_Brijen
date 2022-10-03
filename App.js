import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  ImageBackground,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Constants from 'expo-constants';
import { Card } from 'react-native-paper';
const image = { uri: 'https://i.redd.it/ihfnlpbze7o01.jpg' };

export default function App() {
  const [height, set_height] = useState(0);
  const [weight, set_weight] = useState(0);
  const [bmi, set_bmi] = useState(' ');
  const [heightMeasure, setTheHeight] = useState('CM');
  const [weightMeasure, setTheWeight] = useState('KG');

  function bmiCalculation(lbs, inch) {
    let m2 = inch * inch;
    let bmi = (lbs / m2) * 703;
    let bmiResult = bmi.toFixed(1);
    if (bmiResult <= 18.5) {
      return bmiResult + ' You have lower body mass !!';
    } else if (bmiResult >= 18.5 && bmiResult < 25) {
      return bmiResult + ' you have normal body mass !!';
    } else {
      return bmiResult + ' you have higher body mass !!';
    }
  }

  function exchange(weigh, weighType, heigh, heighType) {
    var weChange = weigh;
    var heChange = heigh;

    if (isNaN(weChange) || weChange <= 0) {
      alert(' Please enter a valid Input for Weight ::: ');
      return 'Not a valid input Please try again:::';
    } else if (isNaN(heChange) || heChange <= 0) {
      alert('Please enter a valid Input for Weight :::');
      return 'Not a valid input Please try again:::';
    } else {
      if (weighType == 'KG') {
        weChange = weigh * 2.204;
      }
      if (heighType == 'Feet') {
        heChange = (heigh - parseInt(heigh)) * 10 + parseInt(heigh) * 12;
      }
      if (heighType == 'CM') {
        heChange = heigh / 2.54;
      }
      return bmiCalculation(weChange, heChange);
    }
  }

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>BMI Calculator</Text>
        <View style={[{ maxHeight: 500, width: "100%" }]}>
          <Text style={styles.text}> :::Height::: </Text>
          <View style={[styles.valInp, { flexDirection: 'row' }]}>
            <TextInput
              style={[styles.inpout, { flex: 1 }]}
              placeholder={heightMeasure}
              keyboardType="numeric"
              onChangeText={(text) => {
                set_height(parseFloat(text));
              }}></TextInput>
            <Picker
              style={[styles.selector, { width:100}]}
              selectedValue={heightMeasure}
              onValueChange={(itemValue, itemIndex) => setTheHeight(itemValue)}>
              <Picker.Item label="CM" value="CM" />
              <Picker.Item label="Feet" value="Feet" />
            </Picker>
          </View>

          <Text style={styles.text}> ::: Weight ::: </Text>
          <View style={[styles.valInp,{ flexDirection: 'row' }]}>
            <TextInput
              style={[styles.inpout, { flex: 1 }]}
              keyboardType="numeric"
              placeholder={weightMeasure}
              onChangeText={(text) => {
                set_weight(parseFloat(text));
              }}></TextInput>
            <Picker
              selectedValue={weightMeasure}
              style={[styles.selector, { width:100}]}
              onValueChange={(itemValue, itemIndex) => setTheWeight(itemValue)}>
              <Picker.Item label="KG" value="KG" />
              <Picker.Item label="lbs" value="lbs" />
            </Picker>
          </View>
        </View>

        <View
          style={[
            {
              width:"100%",
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'center',
            },
          ]}>
          <TouchableOpacity
            style={[styles.submission]}
            onPress={() => {
              set_bmi(
                'BMI=' + exchange(weight, weightMeasure, height, heightMeasure)
              );
            }}
            title="SUBMIT">
            <Text style={styles.textmain}> SUBMIT </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.text}> {bmi} </Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'left',
    justifyContent: 'left',
    padding: 10,
   // width:"100%",
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight,
    backgroundColor: 'white',
  },
  submission: {
    width: "100%",
    textAlign: 'center',
    borderWidth: 5,
    borderRadius: 20,
    justifyContent: 'center',
    shadowRadius: 20,
    shadowOpacity: 2,
    shadowColor: '#fff',
    borderColor: 'orange',
    backgroundColor: 'white',
  },
  valInp: {
    borderRadius: 20,
    width: "100%",
    borderWidth: 2,
    borderColor: 'orange',
    borderBottomWidth: 3,
    borderTopWidth: 3,
    shadowOpacity: 2,
    shadowRadius: 10,
    //marginHorizontal: 10,
    padding: 10,
    paddingTop: 16,
    backgroundColor: 'seashell',
    shadowColor: '#fff',
    paddingBottom: 5,
  },
  inpout: {},
  title: {
    textShadowRadius: 10,
    padding: 2,
    shadowOpacity: 1,
    shadowRadius: 5,
    borderWidth: 4,
    borderRadius: 20,
    textAlign: 'center',
    borderColor: 'orange',
    fontSize: 22,
    //width:'100%',
    color: 'navy',
    backgroundColor: 'snow',
    shadowColor: '#fff',
    fontWeight: 'bold',
    marginTop: 25,
  },
  image: {
    flex: 1,
    justifyContent: 'left',
  },
  textmain: {
    textShadowRadius: 5,
    borderRadius: 10,
    fontSize: 20,
    shadowColor: '#fff',
    fontWeight: 'Bold',
    color: 'red',
  },
  text: {
    textShadowRadius: 5,
    borderRadius: 5,
    fontSize: 18,
    //width: '80%',
    shadowColor: '#fff',
    fontWeight: 'Bold',
    color: 'beige',
  },
});
