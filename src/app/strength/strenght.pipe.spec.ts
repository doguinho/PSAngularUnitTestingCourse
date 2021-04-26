import { StrengthPipe } from "./strength.pipe"

describe('StrenghtPipe', () => {

    let pipe = new StrengthPipe();

    it ('it should return weak if strength is 5', () => {
        const result  = pipe.transform(5);
        expect(result).toEqual('5 (weak)');
    });

    it ('should return strong if strength is more than 10 and less than 20', () => {
        const result = pipe.transform(11);
        expect(result).toEqual('11 (strong)');
    });

    it ('should return unbelievable if strength is more than 20', () => {
        const result = pipe.transform(21);
        expect(result).toEqual('21 (unbelievable)');
    });

})





