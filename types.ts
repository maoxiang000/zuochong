
export enum PetState {
  IDLE = 'IDLE',
  HAPPY = 'HAPPY',
  SURPRISE = 'SURPRISE',
  ANGRY = 'ANGRY'
}

export interface PetStats {
  hunger: number;
  happiness: number;
  energy: number;
}

export interface AnimationConfig {
  frames: string[];
  fps: number;
  loop: boolean;
}

export interface PetConfig {
  size: number;
  initialPosition: { x: number; y: number };
}
