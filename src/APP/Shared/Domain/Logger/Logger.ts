export interface Logger {
    print(data: String | object);
    warning(message: String);
    error(error: Error);
}