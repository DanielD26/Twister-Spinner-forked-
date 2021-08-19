import { BodyParts } from './bodyParts.enum';
import { Colours } from './colours.enum';

export interface ISpin {
  colour: Colours;
  bodyPart: BodyParts;
}

// TODO: create a SpinRecord class which implements ISpin and adds a new attribute num:number
export class SpinRecord implements ISpin {
  colour: Colours;
  bodyPart: BodyParts;
  num: Number;

  constructor(_colour: Colours, _bodyPart: BodyParts, _num: number) {
    this.colour = _colour;
    this.bodyPart = _bodyPart;
    this.num = _num;
  }
}
