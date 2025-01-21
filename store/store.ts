import { Study } from "@/components/types/Study";
import { atom } from "recoil";
import mockData from "../housingData.json";

const studies = JSON.parse(JSON.stringify(mockData)) as Study[];

export const allStudiesState = atom({
  key: "studiesState",
  default: studies,
});

export const selectedStudiesState = atom({
  key: "selectedStudiesState",
  default: [] as Study[],
});
