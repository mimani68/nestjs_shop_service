export class SuccessResponse {
    
    private data: any;
    private success: any;

    constructor(response: any) {
        this.data = response
        this.success = true
    }
}