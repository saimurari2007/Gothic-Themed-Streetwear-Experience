import { EffectComposer, Bloom, Noise, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import React from 'react';

const Effects = () => {
  return (
    <EffectComposer disableNormalPass>
      <Bloom luminanceThreshold={0.1} mipmapBlur intensity={1.5} />
      <Noise opacity={0.05} blendFunction={BlendFunction.OVERLAY} />
      <Vignette eskil={false} offset={0.2} darkness={1.3} />
      <ChromaticAberration offset={[0.003, 0.003]} />
    </EffectComposer>
  );
};

export default Effects;
