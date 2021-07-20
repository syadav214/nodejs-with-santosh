import mysqlConn from './mysqlConn';
import report from './cases/report';
import resolve from './cases/resolve';

interface IResponse {
  success: boolean;
  result: any;
}

const response: IResponse = { success: true, result: {} };

const internalServerError = (err: any, res: any) => {
  response.result = err;
  response.success = false;
  res.status(500);
  return res;
};

const routes = (app: any) => {
  app.get('/', (req: any, res: any) => {
    response.result = {
      reportCase: 'POST-> /case/report',
      resolveCase: 'POST-> /case/resolve'
    };
    res.json(response);
  });

  app.post('/case/report', async (req: any, res: any) => {
    try {
      response.result = await report(req, mysqlConn);
    } catch (err) {
      res = internalServerError(err, res);
    }
    res.json(response);
  });

  app.put('/case/resolve/:caseId', async (req: any, res: any) => {
    try {
      response.result = await resolve(req, mysqlConn);
    } catch (err) {
      res = internalServerError(err, res);
    }
    res.json(response);
  });
};

export default routes;
