import AsyncStorage from "@react-native-community/async-storage";

export const getToken = () => AsyncStorage.getItem("userToken");
export const setToken = async (token) => AsyncStorage.setItem("userToken", token);
