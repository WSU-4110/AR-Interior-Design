export const CustomColors = {
  light: '#FAFAFA',
  dark: '#1A1A1A',
  lightCardColor: '#FFFFFF',
  darkCardColor: '#31363F',
  darkAccentColor: '#686963',
  primaryColor: '#DB5461',
  secondaryColor: '#8AA29E',
  supportingColor: '#E3F2FD',
  hyperlinkColor: '#1E88E5',
  lightTextColor: '#686963',
  iconColor: '#686963',
  lightShadow: '#333',
  darkShadow: '#000'
}

export const LightTheme = {
  dark: false,
  colors: {
    primary: CustomColors.primaryColor,
    background: CustomColors.light,
    card: CustomColors.lightCardColor,
    text: CustomColors.dark,
    border: CustomColors.light,
    notification: CustomColors.iconColor,
    shadow: CustomColors.lightShadow
  },
};

export const DarkTheme = {
  dark: true,
  colors: {
    primary: CustomColors.primaryColor,
    background: CustomColors.dark,
    card: CustomColors.darkCardColor,
    text: CustomColors.light,
    border: CustomColors.dark,
    notification: CustomColors.iconColor,
    shadow: CustomColors.darkShadow
  },
};