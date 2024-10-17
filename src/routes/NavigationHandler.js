import {useNavigation} from '@react-navigation/native';

export const useNavigationHandler = () => {
  const Navigation = useNavigation();

  const navigateTo = ( screenName, params) => {
    Navigation.navigate(screenName, params);
  };
  const pushTo = (screenName, params) => {
    Navigation.push(screenName, params);
  };
  const goBack = () => {
    Navigation.goBack();
  };
  const popToTop = () => {
    Navigation.popToTop();
  };

  return {
    navigateTo,
    pushTo,
    goBack,
    popToTop,
  };
};
