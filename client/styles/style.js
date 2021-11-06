import { Platform } from "react-native";

import colors from '../theme/color';
import AppFont from '../theme/font';

export default{
    colors,
    text:
    {
        color:colors.black,
        fontSize:18,
        fontfamily:Platform.OS === "android" ? "Roboto" : "Avenir"
    },
}