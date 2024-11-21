import { APIRequestContext } from "@playwright/test";


export class UsersClient {
    
    private request: APIRequestContext;
    private baseUrl: string;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.baseUrl = 'https://thinking-tester-contact-list.herokuapp.com/users';
    }

    /**
     * POST request to add user
     * @param user : representation of the user we want to add (create)
     * @returns : the response
     */
    async postAddUser(user: {firstName: string, lastName: string, email: string, password: string }) {
        const response = await this.request.post(this.baseUrl, {
            data: user
        });
        return response;
    }

    /**
     * DELETE request to delete a user
     * @param authToken : the authentication token
     * @returns : response
     */
    async deleteUser(authToken: string) {
        const response = await this.request.delete(`${this.baseUrl}/me`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        return response;
      }

}