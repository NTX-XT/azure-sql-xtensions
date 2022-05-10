const connStringTemplate = "Server=tcp:{{SERVER}},{{PORT}};Initial Catalog={{DBNAME}};Persist Security Info=False;User ID={{USERNAME}};Password={{PASSWORD}};MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;"
const defaultPort = "1433"

export interface ConnectionStringDetails {
    server: string,
    port?: string,
    dbName: string,
    userName: string,
    password: string
}

export class ConnectionStringBuilder {
    static build = (details: ConnectionStringDetails): string => {
        return connStringTemplate
            .replace("{{SERVER}}", details.server)
            .replace("{{PORT}}", details.port ?? defaultPort)
            .replace("{{DBNAME}}", details.dbName)
            .replace("{{USERNAME}}", details.userName)
            .replace("{{PASSWORD}}", details.password)
    }
} 
