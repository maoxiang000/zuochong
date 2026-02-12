
import { PetState, AnimationConfig } from './types';

export const PET_ANIMATIONS: Record<PetState, AnimationConfig> = {
  [PetState.IDLE]: {
    frames: [
      'https://api.dicebear.com/9.x/pixel-art/svg?seed=Lucky&size=256&backgroundColor=transparent',
      'https://api.dicebear.com/9.x/pixel-art/svg?seed=Lucky&size=256&flip=true&backgroundColor=transparent',
    ],
    fps: 1, 
    loop: true
  },
  [PetState.HAPPY]: {
    frames: [
      'https://api.dicebear.com/9.x/pixel-art/svg?seed=Mochi&eyes=variant04&size=256&backgroundColor=transparent',
      'https://api.dicebear.com/9.x/pixel-art/svg?seed=Mochi&eyes=variant04&size=256&flip=true&backgroundColor=transparent',
    ],
    fps: 4, 
    loop: true
  },
  [PetState.SURPRISE]: {
    frames: [
      'https://api.dicebear.com/9.x/pixel-art/svg?seed=Simba&eyes=variant01&size=256&backgroundColor=transparent',
      'https://api.dicebear.com/9.x/pixel-art/svg?seed=Simba&eyes=variant02&size=256&backgroundColor=transparent',
    ],
    fps: 3,
    loop: true
  },
  [PetState.ANGRY]: {
    frames: [
      'https://api.dicebear.com/9.x/pixel-art/svg?seed=Tiger&eyes=variant03&size=256&backgroundColor=transparent',
      'https://api.dicebear.com/9.x/pixel-art/svg?seed=Tiger&eyes=variant03&size=256&flip=true&backgroundColor=transparent',
    ],
    fps: 5,
    loop: true
  }
};
