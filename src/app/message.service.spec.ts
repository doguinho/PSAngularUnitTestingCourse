import { MessageService } from "./message.service";

describe('MessageService',() => {

    let service:MessageService = new MessageService();

    it ('should start with zero messages', () => {
        const count = service.messages.length;
        expect(count).toEqual(0);
    });

    it ('should return one message', () => {
        service.add('teste');
        const count = service.messages.length;
        expect(count).toEqual(1);
    });

    it ('should delete all message'), () => {
        service.clear();
        const count = service.messages.length;
        expect(count).toEqual(0);
    }

})