export type Study = {
  housingid: string; // Unique identifier for housing
  studyNo: string; // Study number
  sponsorId: string; // Sponsor ID
  sd: string; // Study Director (SD) name
  studytitle: string; // Title of the study
  testTitle: string; // Title of the test
  sponsorName: string; // Name of the sponsor
  species: string; // Species involved in the study
  testRoomNo: number; // Room number where the test is conducted
  noOfAnimals: number; // Number of animals involved
  occupationType: "Full" | "Partial"; // Type of occupation (e.g., Full or Partial)
  startingDate: string; // Starting date of the study (ISO string)
  endDate: string; // End date of the study (ISO string)
  CreatedOn: string; // Timestamp when the study was created (ISO string)
  CreatedBy: string; // User who created the record
  LastUpdatedOn: string; // Timestamp when the study was last updated (ISO string)
  LastUpdatedBy: string; // User who last updated the record
};
