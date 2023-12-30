export class SkuGenerator {

    private code: string
    private type: string;
    private size: string;
    private color: string;

    constructor(code: string, type: string, size: string, color: string) {
        this.code = code
        this.type = type
        this.size = size
        this.color = color
    }

    public generateCode () {
        let template = ''
        if (this.type.toLowerCase() === 'physical') {
            template = 'phy'
            template += this.size ? '-' + this.size.replace(/\s\\n\t\:\.\_\-/ig, '') : ''
            template += this.color ? '-' + this.color.replace(/\s\\n\t\:\.\_\-/ig, '') : ''
        } else if (this.type.toLowerCase() === 'pod') {
            template = 'pod'
        } else {
            template = 'digital'
        }
        return template + '-' + this.code 
    }
}