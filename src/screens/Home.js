import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {t} from 'react-native-tailwindcss';

function HomeScreen({}) {
  const [curr, setCurr] = useState(1);
  const [check, setCheck] = useState('');
  const [data, setData] = useState(null);
  const [ans, setAns] = useState('');
  const [err, setErr] = useState('');
  const [incorrect, setIncorrect] = useState(null);
  const handleChange = () => {
    if (ans == '') {
      setErr('Enter your answer!');
    } else {
      ans.toLocaleLowerCase().replace(/ /g, '') ==
      `${data.correct_answer}`.toLocaleLowerCase()
        ? check == ''
          ? setCheck('submitted')
          : check == 'submitted'
          ? (setCheck('next'), setCurr(curr + 1))
          : setCheck('')
        : (setErr('incorrect Ans!'), setIncorrect(data.incorrect_answers));
    }
  };
  useEffect(() => {
    if (check == 'next' || check == '') {
      axios.get(`https://opentdb.com/api.php?amount=${curr}`).then(res => {
        //   console.log(res.data);
        setData(res.data.results[0]);
        setErr('');
        setIncorrect('');
        setAns('');
      });
    }
    setErr('');
    console.log(check);
  }, [curr, check]);
  //   {
  //     incorrect && console.log(incorrect[0]);
  //   }
  console.log(data ? `${data.correct_answer}`.toLocaleLowerCase() : '');
  return (
    <View
      style={[
        t.p3,
        t.w,
        t.border,
        t.mT5,
        t.h4_5,
        {backgroundColor: '#27292D', borderColor: '#35373B', borderRadius: 8},
      ]}>
      <View style={[]}>
        <Text
          style={[
            t.text2xl,
            t.textCenter,
            t.fontBold,
            t.mB5,
            {color: 'white'},
          ]}>
          Trivia Game
        </Text>
        <Text
          style={[
            t.textXl,
            t.textLeft,
            t.fontBold,
            t.underline,
            {color: 'white'},
          ]}>
          {data ? data.category : ''}
        </Text>
        <Text
          style={[t.textXl, t.fontSemibold, t.mB2, t.mT5, {color: 'white'}]}>
          {data ? data.question : ''}
        </Text>
        <Text style={[t.textBase, t.mB2, {color: 'white', opacity: 0.7}]}>
          Options:
        </Text>
        <Text style={[t.textXl, {color: 'white'}]}>
          {data ? '1. ' + data.correct_answer : ''}
        </Text>
        {data &&
          data.incorrect_answers.map((e, i) => {
            console.log('incoans' + e);
            return (
              <Text key={i} style={[t.textXl, t.mT2, {color: 'white'}]}>
                {i + 2 + '. ' + e}
              </Text>
            );
          })}
        <View
          style={[
            t.flexRow,
            t.justifyStart,
            t.alignCenter,
            t.rounded,
            t.pL1,
            t.mT5,
            t.mB3,
            {backgroundColor: '#131319'},
          ]}>
          <TextInput
            style={[t.w9_12, t.textLg, {color: '#7F8084'}]}
            value={ans}
            autoCapitalize="none"
            autoComplete="off"
            onChangeText={e => setAns(e)}
            placeholder="Write your answer here"
            placeholderTextColor={'#7F8084'}
            keyboardType="name-phone-pad"
          />
        </View>
      </View>
      {err != '' && (
        <Text style={[t.textBase, t.mB3, {color: 'red'}]}>{err}</Text>
      )}
      <View style={[t.pT3, t.wFull]}>
        <TouchableOpacity
          style={[
            t.rounded,
            t.p3,
            t.mB2,
            // width != '' ? width : t.wFull,
            {backgroundColor: '#4A96FF'},
          ]}
          onPress={handleChange}>
          <Text style={[t.textCenter, t.fontBold, t.textLg]}>
            {check == '' ? 'SUBMIT' : check == 'submitted' ? 'Next' : 'SUBMIT'}{' '}
          </Text>
        </TouchableOpacity>
      </View>
      {data && check == 'submitted' && (
        <View>
          {check == 'submitted' && (
            <Text
              style={[
                t.textBase,
                t.fontBold,
                t.mB3,
                {
                  color:
                    ans.toLocaleLowerCase().replace(/ /g, '') ==
                    `${data.correct_answer}`.toLocaleLowerCase()
                      ? 'green'
                      : 'red',
                },
              ]}>
              {ans.toLocaleLowerCase().replace(/ /g, '') ==
              `${data.correct_answer}`.toLocaleLowerCase()
                ? 'Correct! Answer is '
                : 'Wrong!! Correct Answer is:'}
              {`${data.correct_answer}`}
            </Text>
          )}
        </View>
      )}
    </View>
  );
}

export default HomeScreen;
