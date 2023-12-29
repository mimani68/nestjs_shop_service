export class ErrorResponse {

    private entity_name: string;
    private level: string;
    private message: string;
    private success: boolean;

    constructor(message: string, entity?: string) {
        this.level = 'ERROR'
        this.message = message
        this.entity_name = entity
        this.success = false
    }
}