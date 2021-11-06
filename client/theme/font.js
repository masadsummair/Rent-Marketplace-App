import { useFonts } from 'expo-font';

export default function Customfonts() {
    const [loaded] = useFonts({
        Roboto: require('../assets/fonts/Roboto-Black.ttf'),
});
}
    