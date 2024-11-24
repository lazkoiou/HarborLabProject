import { APIRequestContext } from "@playwright/test";
import { UserDTO } from "../dtos/userDTO";

/**
 * Contains the requests for the users endpoint
 */
export class UsersClient {
    
    private request: APIRequestContext;
    private baseUrl: string;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.baseUrl = 'https://thinking-tester-contact-list.herokuapp.com';
    }

    /**
     * POST request to add user
     * @param user : representation of the user we want to add (create)
     * @returns : the response
     */
    async postAddUser(user: UserDTO) {
        const response = await this.request.post(`${this.baseUrl}/users`, {
            data: user
        });
        return response;
    }

    /**
     * GET request to get a user by using an authentication bearer token
     * @param bearerToken : the authentication token
     * @returns : response
     * 
     */
    async getUserProfile(bearerToken: string) {
        const response = await this.request.get(`${this.baseUrl}/users/me`, {
            headers: { Authorization: `Bearer ${bearerToken}` },
        });
        return response;
    }

    /**
     * PATCH request to update a field from a user's profile
     * @param bearerToken : the authentication token
     * @param user : the user with an updated field
     * @returns : response
     * 
     * Not available through UI
     */
    async patchUser(bearerToken: string, user: UserDTO) {
        const response = await this.request.patch(`${this.baseUrl}/users/me`, {
            headers: { Authorization: `Bearer ${bearerToken}` },
            data: {
                user
            },
        });
        return response;
    }

    /**
     * POST request to logout a user
     * @param authToken : the authentication token
     * @returns : response
     */
    async postLogoutUser(bearerToken: string) {
        const response = await this.request.post(`${this.baseUrl}/users/logout`, {
          headers: { Authorization: `Bearer ${bearerToken}` },
        });
        return response;
    }

    /**
     * POST request to login a user
     * @param authToken : the authentication token
     * @returns : response
     */
    async postLoginUser(email: string, password: string) {
        const credentials = {email, password};
        const response = await this.request.post(`${this.baseUrl}/users/login`, {
          data: credentials
        });
        return response;
    }

    /**
     * DELETE request to delete a user by using an authentication bearer token
     * @param authToken : the authentication token
     * @returns : response
     * 
     * Not available through the UI
     */
    async deleteUser(bearerToken: string) {
        const response = await this.request.delete(`${this.baseUrl}/users/me`, {
          headers: { Authorization: `Bearer ${bearerToken}` },
        });
        return response;
    }

}