export interface IAuthService {
    authenticate:() => any;
    checkAuthentication : () => any;
    disconnect : () => any;
}