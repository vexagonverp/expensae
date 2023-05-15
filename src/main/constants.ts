export const MAIN_PROCESS_EVENT = {
  LOGIN_SUCCESS: 'LOGIN_SUCCESS'
};

export const ELECTRON_STORE_KEY = {
  OAUTH_TOKEN: 'OAUTH_TOKEN'
};

export const GOOGLE_SHEET_CELL_LIMIT = {
  ROW_LIMIT: 3800,
  COLUMN_LIMIT: 15
};

export enum GoogleSheetHeader {
  DATE = 'date',
  FOOD = 'food',
  HOUSING = 'housing',
  TRANSPORT = 'transport',
  CLOTHING = 'clothing',
  MEDICAL = 'medical',
  UTILITY = 'utility',
  PERSONAL = 'personal',
  EDUCATION = 'education',
  RECREATION = 'recreation',
  DEBT = 'debt',
  SAVING = 'saving',
  INSURANCE = 'insurance'
}

export const GOOGLE_SHEET_CONSTANTS = {
  HEADER: [
    GoogleSheetHeader.DATE,
    GoogleSheetHeader.FOOD,
    GoogleSheetHeader.HOUSING,
    GoogleSheetHeader.TRANSPORT,
    GoogleSheetHeader.CLOTHING,
    GoogleSheetHeader.MEDICAL,
    GoogleSheetHeader.UTILITY,
    GoogleSheetHeader.PERSONAL,
    GoogleSheetHeader.EDUCATION,
    GoogleSheetHeader.RECREATION,
    GoogleSheetHeader.DEBT,
    GoogleSheetHeader.SAVING,
    GoogleSheetHeader.INSURANCE
  ],
  DELIMITER: ','
};
