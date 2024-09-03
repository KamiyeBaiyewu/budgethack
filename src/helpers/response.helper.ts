export interface ResponseDto {
    success: boolean;
    message: string;
    data?: any;
    paginate?: Object;
    meta?: any;
}



export class ResponseHelper {
    static successResponse = (
        message: string,
        data?: any,
        meta?: any,
    ): ResponseDto => {
        return {
            success: true,
            message,
            data,
            meta,
        };
    };

    static genericResponse = (message: string): ResponseDto => {
        return {
            success: true,
            message,
        };
    };

    static DynamicResponse = (
        data?: any,
        paginate?: Object,
        status = true,
        message = 'Success',
        meta?: any,
    ): ResponseDto => {
        return {
            success: status,
            message,
            paginate,
            meta,
            data,
        };
    };

    static PaginateRes(val: {
        page: number;
        take: number;
        totalDBData: number;
    }): Object {
        const currentPage: number = val.page;
        const lastPage: number = Math.ceil(val.totalDBData / val.take);
        const nextPage: number | null =
            currentPage >= lastPage ? null : currentPage + 1;
        const prevPage: number = val.page - 1 < 1 ? null : val.page - 1;
        return {
            currentPage: currentPage,
            lastPage: lastPage,
            nextPage: nextPage,
            prevPage: prevPage,
        };
    }
}