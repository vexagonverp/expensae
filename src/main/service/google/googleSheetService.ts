import { sheets, sheets_v4 } from '@googleapis/sheets';
import { inject, injectable } from 'inversify';
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
}
