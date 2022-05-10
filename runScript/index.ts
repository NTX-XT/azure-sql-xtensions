import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as sql from 'mssql'
import { ConnectionStringBuilder, ConnectionStringDetails } from "../shared/connectionStringBuilder";

const runScript: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        const connDetails = req.body.connection as ConnectionStringDetails
        const config: sql.config = {
            user: connDetails.userName,
            password: connDetails.password,
            database: connDetails.dbName,
            server: connDetails.server,
            options: {
                encrypt: true,
                trustServerCertificate: false,
            }
        }
        context.log.info(`connecting to: ${config.database}@${config.server} as ${config.user}`);
        const pool = await sql.connect(config);
        context.log.info(`executing script ${req.body.script}`);
        const result = await pool.query(req.body.script);
        pool.close();
        context.log.info(result.output)
        context.res = {
            status: 200, /* Defaults to 200 */
            body: result.output
        };
    }
    catch (err: any) {
        const error = (err.originalError.errors)
            ? (err.originalError).errors.join(' // ')
            : err.message
        context.log.error(error)
        context.res = {
            status: 500, /* Defaults to 200 */
            body: error
        };
    }
};

export default runScript;