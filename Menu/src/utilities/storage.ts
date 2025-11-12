import AsyncStorage from '@react-native-async-storage/async-storage';
import { MenuItem } from '../types/types';

// global variable for key
export const STORAGE_KEY = 'CHEF_MENU';

// save menu array
export async function saveMenu(menu: MenuItem[]) {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(menu));
}

// get menu array
export async function loadMenu(): Promise<MenuItem[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}
