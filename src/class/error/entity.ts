export class EntityError {

    private entity_name: string;
    private level: string;
    private message: string;

    constructor(message: string, entity: string) {
        this.level = 'ERROR'
        this.message = message
        this.entity_name = entity
    }
}