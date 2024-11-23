import { UsersClient } from "../clients/usersClient";
import { UserDTO } from "../dtos/userDTO";

/**
 * Service for a higher level perspective of the business logic for the UsersClient
 */
export class UsersService {

    private usersClient: UsersClient;

    constructor(usersClient: UsersClient) {
        this.usersClient = usersClient;
    }

    /**
     * Creates a new user
     * @param userDTO : dto containing the user's data
     * @returns : the token of the created user
     */
    async createUser(userDTO: UserDTO): Promise<string> {
        const response = await this.usersClient.postAddUser(userDTO);
        if (!response.ok) {
            throw new Error(`Failed to create user with status: ${response.status}`);
        }
        console.log('User created: ' + userDTO.email);
        const responseData = await response.json();
        return responseData.token;
    }

    /**
     * Deletes a user
     * @param bearerToken : the bearer token of the user we want to delete
     * @param userDTO : dto with the information of the user
     */
    async deleteUser(bearerToken: string, userDTO: UserDTO) {
        const response = await this.usersClient.deleteUser(bearerToken);
        if (!response.ok) {
            throw new Error(`Failed to create user with status: ${response.status}`);
        }
        console.log('User deleted: ' + userDTO.email);
    }

    /**
     * Logins with a user
     * @param email : the email of the user we want to login
     * @param password : the password of the user we want to login
     * @returns : the bearer token of the user
     */
    async loginUser(email: string, password: string): Promise<any> {
        const response = await this.usersClient.postLoginUser(email, password);
        if (!response.ok) {
            throw new Error(`Failed to create user with status: ${response.status}`);
        }
        console.log('Login user: ' + email);
        const responseData = await response.json();
        return responseData.token;
    }

}