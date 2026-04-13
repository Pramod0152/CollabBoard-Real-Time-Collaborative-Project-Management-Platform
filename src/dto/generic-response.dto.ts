export class GenericResponseDto<T = any> {
  message: string;
  data: T;
}
