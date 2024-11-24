import { APIRequestContext } from "@playwright/test";
import { UsersClient } from "./usersClient";

/**
 * Class for managing and lazy loading the clients
 */
export class ClientManager {

    private readonly apiRequestContext: APIRequestContext;

    constructor(apiRequestContext: APIRequestContext) {
        this.apiRequestContext = apiRequestContext;
    }

    get usersClient(): UsersClient {
        return new UsersClient(this.apiRequestContext);
    }

}