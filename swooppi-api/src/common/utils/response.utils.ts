export type ResponseObjectType = {
    data?: any
    success: boolean
    statusCode: number
    message: string | string[]
    total?: number
    page?: number
    limit?: number
    offset?: number
}

export class ResponseUtils {
    static serverResponse(
        success: boolean,
        statusCode: number,
        message: string | string[],
        data?: any,
        total?: number,
        page?: number,
        limit?: number,
        offset?: number) {
        const response: ResponseObjectType = {
            success,
            statusCode,
            message,
        };

        if (data !== null) {
            response.data = data
        }
        if (typeof total !== 'undefined') {
            response.total = total;
        }

        if (typeof page !== 'undefined') {
            response.page = page;
        }

        if (typeof limit !== 'undefined') {
            response.limit = limit;
        }

        if (typeof offset !== 'undefined') {
            response.offset = offset;
        }

        return response;
    }
}
