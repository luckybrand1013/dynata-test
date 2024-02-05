import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AirportInterface } from "./global";

export type MainStackParamList = {
  HomeScreen: undefined;
  DetailScreen: Pick<AirportInterface, "icao"> | undefined;
};

export type MainStackScreenProps<Screen extends keyof MainStackParamList> =
  NativeStackScreenProps<MainStackParamList, Screen>;
