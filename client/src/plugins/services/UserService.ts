import gql from "../gql"
import { BaseService } from "./BaseService";
import {BaseUser, NewUser, LoginUser} from "./types/user"
import {AuthPayload} from "./types/auth"

class UserService extends BaseService {
    private _user: BaseUser;
    private _loggedIn: boolean;
    private _authToken: string;

    constructor() {
        super();
        this._loggedIn = false;
        this._user = {} as BaseUser;
        this._authToken = '';
    }

    async signup(user: NewUser): Promise<AuthPayload> {
        const result = await this.POST<AuthPayload>(gql`
            mutation SignupUser {
                singup(data: {
                    firstname: "${user.firstname}", lastname: "${user.lastname}",
                    email: "${user.email}", password: "${user.password}"
                })
            }
        `)
        this._authToken = result.token
        this._user = result.user;
        this._loggedIn = true;
        return result
    }

    async login(user: LoginUser): Promise<AuthPayload>
    async login(email: string, password: string): Promise<AuthPayload>

    async login(userOrEmail: string | LoginUser, password?: string): Promise<AuthPayload> {
        const manual = typeof userOrEmail === 'string';
        const _email = manual ? (userOrEmail as string) : (userOrEmail as LoginUser).email
        const _password = manual ? (password as string) : (userOrEmail as LoginUser).password
        if (_password === undefined) throw new Error("Password must be set")

        const result = await this.POST<AuthPayload>(gql`
                mutation LoginUser {
                    login(data: {email: "${_email}", password: "${_password}"}) {
                        token
                        user {
                            firstname
                            lastname
                            email
                        }
                    }
                }
            `)
        this._authToken = result.token
        this._user = result.user;
        this._loggedIn = true;
        return result
    }

    async logout() {}

}

const userService = new UserService();
export default userService;