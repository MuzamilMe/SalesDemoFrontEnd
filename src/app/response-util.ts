export class ResponseUtil {
  static returnResponse(status: string, message: string, data: any): any {
    return {
      status: status,
      message: message,
      data: data
    };
  }
}
