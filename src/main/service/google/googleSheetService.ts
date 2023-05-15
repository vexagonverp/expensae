import { sheets, sheets_v4 } from '@googleapis/sheets';
import { inject, injectable } from 'inversify';
import { GOOGLE_SHEET_CELL_LIMIT, GOOGLE_SHEET_CONSTANTS } from '../../constants';
import TYPES from '../../inversify/types';
import type { IGoogleOAuthService, IGoogleSheetService } from '../../inversify/interfaces';

@injectable()
export default class GoogleSheetService implements IGoogleSheetService {
  private sheetClient: sheets_v4.Sheets;

  constructor(@inject(TYPES.OAuthService) private oAuthService: IGoogleOAuthService) {
    this.sheetClient = sheets('v4');
  }

  async getWorkSheet(sheetId: string): Promise<sheets_v4.Schema$Spreadsheet> {
    try {
      const result = await this.sheetClient.spreadsheets.get({
        auth: this.oAuthService.getAuthClient(),
        spreadsheetId: sheetId
      });
      return result.data;
    } catch (_err) {
      throw new Error();
    }
  }

  async getTabSheetValue(sheetTitle: string, sheetId: string) {
    try {
      const result = await this.sheetClient.spreadsheets.values.get({
        auth: this.oAuthService.getAuthClient(),
        spreadsheetId: sheetId,
        range: `${sheetTitle}!${GOOGLE_SHEET_CONSTANTS.COLUMN[0]}1:${
          GOOGLE_SHEET_CONSTANTS.COLUMN[GOOGLE_SHEET_CELL_LIMIT.COLUMN_LIMIT - 1]
        }${GOOGLE_SHEET_CELL_LIMIT.ROW_LIMIT}`
      });
      return result;
    } catch (_err) {
      throw new Error();
    }
  }

  async createTabSheet(sheetTitle: string, sheetIndex: number, sheetId: string) {
    try {
      await this.sheetClient.spreadsheets.batchUpdate({
        auth: this.oAuthService.getAuthClient(),
        spreadsheetId: sheetId,
        requestBody: {
          requests: [
            {
              addSheet: {
                properties: {
                  title: sheetTitle,
                  sheetId: sheetIndex,
                  gridProperties: {
                    columnCount: GOOGLE_SHEET_CELL_LIMIT.COLUMN_LIMIT,
                    rowCount: GOOGLE_SHEET_CELL_LIMIT.ROW_LIMIT
                  }
                }
              }
            },
            {
              pasteData: {
                coordinate: {
                  columnIndex: 0,
                  rowIndex: 0,
                  sheetId: sheetIndex
                },
                data: GOOGLE_SHEET_CONSTANTS.HEADER.join(GOOGLE_SHEET_CONSTANTS.DELIMITER),
                delimiter: GOOGLE_SHEET_CONSTANTS.DELIMITER
              }
            }
          ]
        }
      });
    } catch (_err) {
      throw new Error();
    }
  }
}
