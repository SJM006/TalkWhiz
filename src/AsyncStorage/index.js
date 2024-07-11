import AsyncStorage from "@react-native-async-storage/async-storage";


const setItem = async (key, item) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(item));
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

const removeItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.log(error);
        return null;
    }
};
export { setItem, getItem, removeItem };