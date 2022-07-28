export class ConfigService {
  private _api: string = "https://angular2-in-action-api.herokuapp.com/stocks/snapshot?symbols=AFG,AAPL,AMZN";

  static map = new Map(); 
  constructor() { }

  public static set(property: string, value: any) {
    ConfigService.map.set('_' + property, value);
  }

  public static get(property: string) {
    return ConfigService.map.get('_' + property);
  }
}