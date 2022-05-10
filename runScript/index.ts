import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as sql from 'mssql'
import { ConnectionStringBuilder, ConnectionStringDetails } from "../shared/connectionStringBuilder";

const runScript: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    // const templates : {[key: string]: string} = {
    //     createUser: "CREATE LOGIN [{{USERNAME}}] WITH PASSWORD = N'{{PASSWORD}}'; ALTER LOGIN [{{USERNAME}}] ENABLE",
    //     createLogin: "CREATE USER {{USERNAME}} FOR LOGIN {{USERNAME}} WITH DEFAULT_SCHEMA = dbo; EXEC sp_addrolemember N'db_owner', N'{{USERNAME}}'",
    //     connString: "Server=tcp:nintexsolutions.database.windows.net,1433;Initial Catalog={{DBNAME}};Persist Security Info=False;User ID={{USERNAME}};Password={{PASSWORD}};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;",        
    // }

    const connectionScript = ConnectionStringBuilder.build(req.body.connection as ConnectionStringDetails)
    sql.connect(connectionScript)
        .then((pool: sql.ConnectionPool) => {
            pool.request().query(req.body.script).then((result: sql.IResult<any>) => {
                context.res = {
                    status: 200, /* Defaults to 200 */
                };
            })
        })
        .catch((err: Error) => {
            context.res = {
                status: 500, /* Defaults to 200 */
                body: err.message
            };
        })
};

export default runScript;