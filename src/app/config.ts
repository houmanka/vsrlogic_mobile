    // dev: '172.21.0.8:4000'A shows you active users(1 in this case) and pages they visit(home, checkout, complete),
    // dry-run: '172.21.0.10',
    // prod: 'vsrlogic.com',

    let ENV;

    function makeAppConfig() {
      const date = new Date();
      const year = date.getFullYear();
      let apiUrl = '';

      ENV = 'dev'; 

      if (ENV === 'dev') {
        apiUrl = 'http://172.21.0.8:4000';
      } else if (ENV === 'dry-run') {
        apiUrl = 'http://172.21.0.10';
      } else if (ENV === 'prod') {
        apiUrl = 'https://vsrlogic.com';
      }
 
      const AppConfig = {
        brand: 'VSRLogic',
        title: 'VSRLogic - V8 System in Virtual Space',
        apiUrl: `${apiUrl}/api/v1`,
        imageUrl: apiUrl,
        productLink: 'https://vsrlogic.com'
      };

      return AppConfig;
    }

    export const APPCONFIG = makeAppConfig();
