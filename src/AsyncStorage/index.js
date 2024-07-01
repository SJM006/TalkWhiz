import AsyncStorage from "@react-native-async-storage/async-storage";


const setItem = async (key, item) => {
    try {
        await AsyncStorage.setItem(key, item);
    } catch (error) {
        console.log(error);
    }
};
const getItem = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

const clearItem = async () => {
    try {
        AsyncStorage.clear();
    } catch (error) {
        console.log(error);
        return null;
    }
};
export { setItem, getItem, clearItem };