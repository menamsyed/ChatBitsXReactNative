import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  StatusBar,
  Pressable,
  Dimensions,
  Button,
} from 'react-native';
import {scale, verticalScale} from 'react-native-size-matters';
import SecondaryText from '../../components/Text/SecondaryText';
import theme from '../../themes/theme';
import appFonts from '../../utils/fontLibrary';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PrimaryText from '../../components/Text/PrimaryText';
import CustomTextInput from '../../components/CustomTextInput';
import ArrowBackButton from '../../components/ArrowBackButton';
import {useNavigationHandler} from '../../routes/NavigationHandler';
import {
  BottomModal,
  ModalContent,
  ModalTitle,
  SlideAnimation,
} from 'react-native-modals';

const NameScreen = () => {
  const navigation = useNavigationHandler();
  const [prompts, setPrompts] = useState([]);
  const [options, setOptions] = useState('about me');
  const [answer, setAnswer] = useState('');
  const [questions, setQuestions] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const promptsArray = [
    {
      id: '0',
      name: 'About me',
      questions: [
        {
          id: '10',
          question: 'A random fact I love is',
        },
        {
          id: '11',
          question: 'Typical Sunday',
        },
        {
          id: '12',
          question: 'I go crazy for',
        },
        {
          id: '13',
          question: 'Unusual Skills',
        },
        {
          id: '14',
          question: 'My greatest strenght',
        },
        {
          id: '15',
          question: 'My simple pleasures',
        },
        {
          id: '16',
          question: 'A life goal of mine',
        },
      ],
    },
    {
      id: '2',
      name: 'Self Care',
      questions: [
        {
          id: '10',
          question: 'I unwind by',
        },
        {
          id: '11',
          question: 'A boundary of mine is',
        },
        {
          id: '12',
          question: 'I feel most supported when',
        },
        {
          id: '13',
          question: 'I hype myself up by',
        },
        {
          id: '14',
          question: 'To me, relaxation is',
        },
        {
          id: '15',
          question: 'I beat my blues by',
        },
        {
          id: '16',
          question: 'My skin care routine',
        },
      ],
    },
  ];

  const _handleNext = () => {
    navigation.navigateTo('PreFinal');
  };
  const _openModal = item => {
    console.log(item,'itemInOpenMODAL')
    setModalVisible(!isModalVisible);
    setQuestions(item?.question);
     
  };
  const _addPrompt = () => {
    console.log('_addPrompt')
    const newPrompt = {questions, answer};
    setPrompts([...prompts, newPrompt]);
    setQuestions('');
    setAnswer('');
    setModalVisible(false);
    if (prompts.length == 3) {
      console.log('_addPrompt',prompts.length)
      setModalVisible(false);
      navigation.navigateTo('Prompts', {
        prompts: prompts,
        question:questions
      });
    }
  };

  return (
    <>
      <StatusBar backgroundColor={theme.white} barStyle={'dark-content'} />
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.headerView}>
          <SecondaryText
            title={'View All'}
            fontSize={scale(12)}
            fontFamily={appFonts.quickSand_bold}
            color={theme.primaryText}
          />
          <SecondaryText
            title={'Prompts'}
            fontSize={scale(12)}
            fontFamily={appFonts.quickSand_bold}
            color={theme.primaryText}
          />
        </View>
        <View style={styles.bodyContainer}>
          {promptsArray.map((item, index) => (
            <>
              <View style={styles.bodyInnerContainer} key={index}>
                <Pressable
                  style={[
                    styles.pressableView,
                    {
                      backgroundColor:
                        options === item?.name ? theme.secondary : theme.white,
                    },
                  ]}
                  onPress={() => setOptions(item?.name)}>
                  <SecondaryText
                    title={item?.name}
                    fontSize={scale(10)}
                    fontFamily={appFonts.quickSand_bold}
                    color={options === item?.name ? theme.white : theme.black}
                    textAlign={'center'}
                  />
                </Pressable>
              </View>
            </>
          ))}
        </View>

        <View style={styles.questionContainer}>
          {promptsArray.map((item, index) => (
            <View key={index}>
              {options === item?.name && (
                <View>
                  {item?.questions.map((item, index) => (
                    <Pressable
                      key={index}
                      style={styles.question}
                      onPress={() => _openModal(item)}>
                      <AntDesign
                        name="staro"
                        size={scale(10)}
                        color={theme.black}
                      />
                      <SecondaryText
                        title={item?.question}
                        fontSize={scale(14)}
                        fontFamily={appFonts.quickSand_bold}
                        color={theme.black}
                        customStyle={{paddingLeft: scale(10)}}
                      />
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>

        {/*<ArrowBackButton onPress={_handleNext} />*/}
      </SafeAreaView>
      <BottomModal
        visible={isModalVisible}
        onHardwareBackPress={() => setModalVisible(!isModalVisible)}
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        onTouchOutside={() => setModalVisible(!isModalVisible)}
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Answer the question?" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        height={Dimensions.get('window').height / 2}>
        <ModalContent style={{width: '100%', height: 'auto'}}>
          <View>
            <SecondaryText
              title={questions}
              fontSize={scale(16)}
              fontFamily={appFonts.quickSand_bold}
              color={theme.black}
              textAlign={'center'}
            />
            <CustomTextInput
              placeholder={'Write your answer here.'}
              autoFocus={true}
              value={answer}
              customStyle={{
                borderBottomWidth: null,
                borderWidth: scale(1),
                marginTop: verticalScale(40),
                borderRadius: scale(10),
                height: verticalScale(100),
              }}
              onChangeText={text => setAnswer(text)}
            />
          </View>
          <Button title="Add" onPress={_addPrompt} color={theme.secondary} />
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default NameScreen;

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: theme.white,
    padding: scale(10),
    flex: 1,
  },
  headerView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(5),
  },
  bodyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(10),
    marginVertical: verticalScale(20),
    marginHorizontal: scale(20),
  },

  pressableView: {
    padding: scale(8),
    borderRadius: scale(20),
    alignItems: 'center',
    justifyContent: 'center',
  },
  questionContainer: {
    flex: 1,
  },
  question: {
    backgroundColor: 'white',
    padding: scale(5),
    marginTop: verticalScale(4),
    flexDirection: 'row',
    alignItems: 'center',
  },
});
