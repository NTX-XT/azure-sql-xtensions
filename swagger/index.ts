import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import path from 'path'
import { readFile } from 'fs/promises'

const swagger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const swaggerDocumentPath = path.join(context.executionContext.functionDirectory, 'swagger.json')
    const swaggerDocument = await readFile(swaggerDocumentPath, { encoding: 'utf8' }).then(data => JSON.parse(data))
    context.res = {
        status: 200,
        body: swaggerDocument,
    }
};

export default swagger;